const content = `
# Event Based System with Localstack (Elixir Edition): Uploading files to S3 with PresignedURL's

## Introduction

If you are reading this maybe you know what its Phoenix, but let me explain a few things first:

- **Localstack**: Its a local version of AWS, yes, S3, SQS, SNS, DynamoDB and more all available from in your local machine

We will create an a platform that uses a ReactJS Frontend that calls the api in Phoenix and Uploads files to S3 and then notifies the file upload to a SQS Queue and then we process the messages and notifies using PhoenixChannels to all the connected frontends

Complex? sounds like but its not a big deal, lets start it!

## The real work

### First steps

You need to create your base, an a Frontend and a Backend in Phoenix, maybe you have it so lets move to the important part

You need Docker and Compose to use this examples, strongly recommend because makes easy with almost 0 config on the Localstack side, so all the code must assume that you have your project dockerized and configured with compose

### Adding Localstack

This is the main config on the \`docker-compose.yml\` file

\`\`\`yml
  localstack:
    image: localstack/localstack:latest
    ports:
      - 4566:4566
    environment:
      # own env vars
      BUCKET_NAME: files
      DEFAULT_REGION: us-west-2
      AWS_ACCESS_KEY_ID: test
      AWS_SECRET_ACCESS_KEY: test
      # service env vars
      SERVICES: s3
      DISABLE_CORS_CHECKS: 1
      PROVIDER_OVERRIDE_S3: asf
      S3_SKIP_SIGNATURE_VALIDATION: 1
    volumes:
      - ./.localstack:/var/lib/localstack
      - ./init_localstack.sh:/etc/localstack/init/ready.d/init_localstack.sh
\`\`\`

And this is the \`init_localstack.sh\` file content, a unique thing about localstack its that you can move all strings like an [aws-cli](https://github.com/aws/aws-cli) tool, also the container deletes all the content and config once the container stops, so the script file must create all the resources that you need from Localstack

Basically the init file creates the bucket and add cors to ensure the calls must be allowed

\`\`\`sh
#!/bin/bash

echo "########### Create S3 bucket ###########"
awslocal s3api create-bucket\\
    --region $DEFAULT_REGION\\
    --bucket $BUCKET_NAME\\
    --create-bucket-configuration LocationConstraint=$DEFAULT_REGION

echo "########### Adding cors bucket ###########"
awslocal s3api put-bucket-cors\\
    --bucket $BUCKET_NAME\\
    --cors-configuration '{
      "CORSRules": [
        {
          "AllowedHeaders": ["*"],
          "AllowedMethods" : ["HEAD", "GET", "POST", "PUT", "DELETE"],
          "AllowedOrigins" : [
            "http://localhost:4000",
            "http://localhost:3000"
          ],
          "ExposeHeaders": []
        }
      ]
    }'

echo "########### List S3 bucket ###########"
awslocal s3api list-buckets
\`\`\`

In this examples we will use a feature of aws named \`presigned url's\` that its a url with signatures that will allow to the read/write from any caller, to ensure your browser can reach the Localstack container, must add this line to your \`/etc/hosts\` file

\`\`\`
127.0.0.1 localstack
\`\`\`

### Adding AWS to Phoenix

We will use [the library \`ex_aws\`](https://github.com/ex-aws/ex_aws) to manage all the AWS resources

Add this to your \`mix.exs\`

\`\`\`exs
{:ex_aws, "~> 2.1"},
{:ex_aws_s3, "~> 2.0"}
\`\`\`

And add this to your config files (adjust in \`dev.exs\` and \`runtime.exs\`)

\`\`\`exs
config :ex_aws, :s3,
  scheme: "http://",
  region: System.get_env("AWS_S3_REGION"),
  host: System.get_env("AWS_S3_URL"),
  port: System.get_env("AWS_S3_PORT"),
  bucket: System.get_env("AWS_S3_BUCKET")
\`\`\`

- Generating the Presigned URL

This function will generate the Presigned URL

\`\`\`exs
  def presigned_url_upload(object_key, opts \\\\ []) do
    get_presigned_url(:put, object_key, opts)
  end

  defp get_presigned_url(http_method, object_key, opts) do
    # this its for a configuration issue with localhost
    opts =
      if is_prod() do
        opts
      else
        opts
        |> Keyword.put(:virtual_host, is_prod())
        |> Keyword.put(:bucket_as_host, true)
      end

    ExAws.S3.presigned_url(
      config(),
      http_method,
      s3_bucket(),
      object_key,
      opts
    )
  end
\`\`\`

> [Full code here](https://github.com/nicolkill/events_arq/blob/84158840b913912d7d9c49c68dd759fd03bc448c/backend/lib/events_arq_backend/s3_client.ex)

and sharing the file

\`\`\`exs
  # on some controller

  # 30 mins
  @presigned_upload_url_max_age 60 * 30
  # 10 MB
  @presigned_upload_url_max_file_size 10 * 1_000_000

  @presigned_url_opts [
    ["starts-with", "$Content-Type", ""],
    {:expires_in, @presigned_upload_url_max_age},
    {:content_length_range, [1, @presigned_upload_url_max_file_size]}
  ]

  def get_presigned_url(conn, _) do
    {:ok, url} = S3Client.presigned_url_upload("some_file_name", @presigned_url_opts)

    conn
    |> put_status(200)
    |> json(%{url: url})
  end
\`\`\`

### Uploading files from Frontend

First lets add the form component, something simple

\`\`\`jsx
        <input
          type="file"
          onChange={handleFileChange}
        />
        {uploaded &&
        <span className="uploaded">
          Uploaded
        </span>
        }
\`\`\` 

And upload it when a file its selected, this function example must check the if its a valid file, then get the presigned url and upload to this presigned url using fetch on a put method

\`\`\`js
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = async (e) => {
    if (!e.target.files) {
      return;
    }

    // get the presigned url
    let response = await api.getPresignedUrl();

    if (response.status < 200 && response.status > 300) {
      // show error getting presigned url
      return;
    }

    const file = e.target.files[0];
    const {url} = response.body;

    // uploading the file with put request to the presigned url
    response = await fetch(url, {
      body: file,
      method: "PUT"
    });

    if (response.ok && response.status >= 200 && response.status < 300) {
      setUploaded(true);
      setTimeout(setUploaded.bind(this, false), 5000); // will remove the 
    }
  };
\`\`\`

And its all, you are pushing files to s3, the config its more extense than the real code but, a lot of times integrate some library or platforms to our code its more config than realworld code

The full code of this project [its here](https://github.com/nicolkill/events_arq/commit/84158840b913912d7d9c49c68dd759fd03bc448c) and also includes a project structure front/back in same repo with docker compose config, just check the \`Makefile\` to see the available commands

In the next post we will:

- Add SQS Queues and add a Worker per Queue using Broadway
- Configure S3 Notification to SQS Queue When a file its uploaded
- Post Messages to a Queue using Elixir 

[Part 2 here!](https://dev.to/nicolkill/event-based-system-with-localstack-elixir-edition-notifing-to-sqs-when-a-file-its-uploaded-3i8j)

See you in the next posts

#### Other sites
- [dev.to](https://dev.to/nicolkill/event-based-system-with-localstack-elixir-edition-uploading-files-to-s3-with-presignedurls-5ha4)
`;

export default content;
