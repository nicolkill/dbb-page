const content = `
# Event Based System with Localstack (Elixir Edition): Notifing to SQS when a file its uploaded

## Configure SQS

Easy! if you read the past post "[Uploading files to S3 with PresignedURL's](https://dev.to/nicolkill/event-based-system-with-localstack-elixir-edition-uploading-files-to-s3-with-presignedurls-5ha4)" you know how to configure in the \`docker-compose.yml\` file, so add SQS to the localstack init its simple

The git diff its this

\`\`\`diff
  localstack:
    image: localstack/localstack:latest
    ports:
      - 4566:4566
    environment:
      # own env vars
      BUCKET_NAME: files
+     BUCKET_QUEUE: new_files_queue
+     QUEUES: general_events_queue,example_queue
      # service env vars
      DEFAULT_REGION: us-west-2
      AWS_ACCESS_KEY_ID: test
      AWS_SECRET_ACCESS_KEY: test
-     SERVICES: s3
+     SERVICES: s3,sqs
      DISABLE_CORS_CHECKS: 1
      PROVIDER_OVERRIDE_S3: asf
      S3_SKIP_SIGNATURE_VALIDATION: 1
    volumes:
      - ./.localstack:/var/lib/localstack
      - ./init_localstack.sh:/etc/localstack/init/ready.d/init_localstack.sh
\`\`\`

> [Full code here](https://github.com/nicolkill/events_arq/blob/96e56357885c97279e6dcc407600d84195fc5612/docker-compose.yml)

And add this diff of the \`localstack_init.sh\` file

\`\`\`diff
...
echo "########### Setting resource names as env variables ###########"
LOCALSTACK_DUMMY_ID=000000000000

+ guess_arn_for_sqs() {
+     local QUEUE_NAME=$1
+     echo "arn:aws:sqs:\${DEFAULT_REGION}:\${LOCALSTACK_DUMMY_ID}:$QUEUE_+ NAME"
+ }
+ 
+ create_queue() {
+     local QUEUE_NAME_TO_CREATE=$1
+     awslocal sqs create-queue\\
+         --region $DEFAULT_REGION\\
+         --queue-name $QUEUE_NAME_TO_CREATE
+ }
+ 
+ echo "########### Creating upload file event SQS ###########"
+ create_queue $BUCKET_QUEUE
+ BUCKET_QUEUE_ARN=$(guess_arn_for_sqs $BUCKET_QUEUE)
+ 
+ echo "########### Creating queues in SQS ###########"
+ IFS=','
+ read -ra Queues <<< "$QUEUES"
+ for q in "\${Queues[@]}";
+ do
+   create_queue $q
+ done
+ 
echo "########### Create S3 bucket ###########"
awslocal s3api create-bucket\\
    --region $DEFAULT_REGION\\
...
      ]
    }'

+ 
+ echo "########### Set S3 bucket notification configurations ###########"
+ aws --endpoint-url=http://localhost:4566 s3api put-bucket-notification-configuration\\
+     --bucket $BUCKET_NAME\\
+     --notification-configuration  '{
+                                       "QueueConfigurations": + [
+                                          {
+                                            "QueueArn": "'"$BUCKET_QUEUE_ARN"'",
+                                            "Events": ["s3:ObjectCreated:Put"]
+                                          }
+                                        ]
+                                      }'
+ 
echo "########### List S3 bucket ###########"
awslocal s3api list-buckets
+ 
+ echo "########### Get S3 bucket notification configurations ###########"
+ aws --endpoint-url=http://localhost:4566 s3api get-bucket-+ + notification-configuration\\
+     --bucket $BUCKET_NAME
\`\`\`

> [Full code here](https://github.com/nicolkill/events_arq/blob/96e56357885c97279e6dcc407600d84195fc5612/init_localstack.sh)

And add this config to the \`config.exs\` 

\`\`\`exs
aws_host = System.get_env("AWS_HOST")
aws_region = System.get_env("AWS_REGION")
aws_port = System.get_env("AWS_PORT")

config :ex_aws, :sqs,
  scheme: "http://",
  region: aws_region,
  host: aws_host,
  port: aws_port,
  base_queue_url: "http://#{aws_host}:#{aws_port}/000000000000/",
  new_files_queue: System.get_env("AWS_SQS_NEW_FILES_QUEUE"),
  general_events_queue: System.get_env("AWS_SQS_GENERAL_EVENTS_QUEUE")
\`\`\`

In this config we are configuring the whole AWS part and also a personal config that we will use in next steps

## Listening the Queues

Now we have SQS Configured, but, who is listening?

To listen a message broker the most used library is [broadway](https://github.com/dashbitco/broadway), this library helps to create GenServer's that listens a specific queue and process message by message (or by chunks).

The fisrt queue that needs to be listened it's the new files queues.

Basically get's the file data and adds a message to the next queue, see the function \`BroadwayGeneralEvents.insert_message(data)\`

\`\`\`elixir
defmodule EventsArqBackend.QueueWorkers.BroadwayNewFileEvents do
  @moduledoc false
  use Broadway

  alias Broadway.Message
  alias EventsArqBackend.QueueWorkers.BroadwayGeneralEvents

  def start_link(_opts) do
    {module, opts} = producer_module()
    options = opts ++ [queue_url: queue_url()]

    Broadway.start_link(__MODULE__,
      name: __MODULE__,
      producer: [
        module: {module, options}
      ],
      processors: [
        default: []
      ]
    )
  end

  @impl true
  def handle_message(_processor, %Message{data: data} = message, _context) do
    decoded_data =
      case Jason.decode!(data) do
        %{"Message" => message} -> Jason.decode!(message)
        message -> message
      end

    %{"Records" => records} = decoded_data

    Enum.each(records, fn
      %{
        "eventName" => event_name,
        "eventSource" => "aws:s3",
        "eventTime" => event_time,
        "s3" => %{
          "bucket" => %{
            "name" => bucket_name
          },
          "object" => %{
            "eTag" => entity_id,
            "key" => object_key,
            "size" => object_size
          }
        }
      }
      when event_name in ["ObjectCreated:Put", "ObjectCreated:Post"] ->
        data = %{
          bucket_name: bucket_name,
          entity_id: entity_id,
          object_key: object_key,
          object_size: object_size,
          inserted_at: event_time
        }

        BroadwayGeneralEvents.insert_message(data)

      _ ->
        :ok
    end)

    Message.update_data(message, fn _data -> decoded_data end)
  end

  defp queue_url,
    do:
      "#{Application.get_env(:ex_aws, :sqs)[:base_queue_url]}#{Application.get_env(:ex_aws, :sqs)[:new_files_queue]}"

  defp producer_module, do: Application.get_env(:events_arq_backend, :broadway)[:producer_module]
end
\`\`\`

And the other queue listener

\`\`\`elixir
defmodule EventsArqBackend.QueueWorkers.BroadwayGeneralEvents do
  @moduledoc false
  use Broadway

  alias Broadway.Message

  def start_link(_opts) do
    {module, opts} = producer_module()
    options = opts ++ [queue_url: queue_url()]

    Broadway.start_link(__MODULE__,
      name: __MODULE__,
      producer: [
        module: {module, options}
      ],
      processors: [
        default: []
      ]
    )
  end

  @impl true
  def handle_message(_processor, %Message{data: data} = message, _context) do
    decoded_data =
      case Jason.decode!(data) do
        %{"Message" => message} -> Jason.decode!(message)
        message -> message
      end

    IO.inspect(decoded_data, label: "*****************")

    # do something with the data
    # send notification

    Message.update_data(message, fn _data -> decoded_data end)
  end

  def insert_message(data), do: SqsClient.add_message_to_queue(queue_name(), data)

  defp queue_name, do: Application.get_env(:ex_aws, :sqs)[:general_events_queue]
  defp queue_url, do: "#{Application.get_env(:ex_aws, :sqs)[:base_queue_url]}#{queue_name()}"
  defp producer_module, do: Application.get_env(:events_arq_backend, :broadway)[:producer_module]
end
\`\`\`

So... 2 queues for the same event? why?

Exist a reason, normally all the queues that you use in sqs are the \`.fifo\` queues, and the queue for the s3 must be a default queue (no-\`.fifo\`-queue) and that's the reason that i created 2 queues, a regular queue for s3 events and a \`.fifo\` queue for the other ones

The full code of this changes it's [here](https://github.com/nicolkill/events_arq/commit/96e56357885c97279e6dcc407600d84195fc5612)

In the next post we will:

- Create a Channel on Phoenix
- Integrate Phoenix Channels to a React project
- Broadcast to all connected clients for some update

See you in the next posts

#### Other sites
- [dev.to](https://dev.to/nicolkill/event-based-system-with-localstack-elixir-edition-notifing-to-sqs-when-a-file-its-uploaded-3i8j)
`;

export default content;
