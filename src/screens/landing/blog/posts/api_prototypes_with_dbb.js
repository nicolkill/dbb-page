const content = `
# API Prototypes with dbb and my first attemp to join to OpenSource World

## The history

As Developers our main purpuse it's... solve problems, and a few times (sarcastic!) we have limited time to solve this problems and another few times (more sarcastic!!) we need build some kind of CRUD or something to store data

It's our basic day by day, create a new schema and the CRUD, some frameworks includes some tools to generate an schema and CRUD files, but another more hasn't this kind of tools and you need to create all by hand

With this escuses \`xD\` i decided to build... something... so i had this idea to build an universal API just for experimenting and then the ideas appear, the idea of an universal API it's something that sounds not much optimized so why not use as a quick api, something to test or an early stage product

## The tool, dbb

With this purposes i created [dbb](https://github.com/nicolkill/dbb), the name hadn't explanation, it's just an inspiration from bb8, sounds nice and sticky

All the core it's on the config file, that it's a simple json file

\`\`\`json
// example config.json
{
  "schemas": [
    {
      "name": "users",
      "fields": {
        "name": "string",
        "age": "number",
        "male": "boolean"
      }
    },
    {
      "name": "products",
      "fields": {
        "name": "string",
        "expiration": "datetime"
      }
    }
  ]
}
\`\`\`

This tool it's a easy to configure API that works instantly, with defined schemas in the config file, all dynamic, no migrations, just a server restart and changes are ready to use

And the deployments it's even more easy, it's a public docker image, easy config with env vars

\`\`\`yml
# example docker-compose.yml
version: '3.4'
services:
  prod:
    image: nicolkill/dbb:latest
    depends_on:
      - postgres
    ports:
      - 4001:443
    volumes:
      - ./config.json:/app/config.json    # important add the volume
    environment:
      PORT: 443
      ALLOWED_SITES: "*"
      CONFIG_SCHEMA: config.json             # must match with volume
      PHX_SERVER: true
      SECRET_KEY_BASE: example_SECRET_KEY_BASE

      # db config
      POSTGRES_USERNAME: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DATABASE: dbb_test_prod
      POSTGRES_HOSTNAME: postgres

  postgres:
    image: postgres:13.3-alpine
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_HOST_AUTH_METHOD: trust
    ports:
      - 5432:5432
\`\`\`

## Usage

Like all API's, exist a basic usage on how to use it, the basic routes and operations are

- \`GET /:schema\` - get the list of records
- \`GET /:schema/:id\` - get an individual record by id
- \`POST /:schema\` - save the record to database, using the body
- \`PUT /:schema/:id\` - updates the record data using the body (overrides the whole data)
- \`DELETE /:schema/:id\` - deletes the record data

> If you are interested on the project you can [go to the github page](https://github.com/nicolkill/dbb) and check the full docs

## Limits

As a creator, i never tested this API on stress or performance, so i don't know how much will support, i know the basic Elixir API performance, maybe on a simple VPS will run with 1k/2k calls per hour, enough to a early stage product, on a Cluster will run even better so... 

I think that serves it's purpose, save time

## The future

At the moment it's an basic API CRUD, but in next movements i'll add an events configuration to call to a webhook when some record it's added/modified/deleted, this it's like a essential part to consider this project as "more" than a simple dynamic CRUD

Also i have more stuff that i want to add to the project and all it's added to the [Roadmap](https://github.com/nicolkill/dbb#roadmap)

#### Other sites
- [dev.to](https://dev.to/nicolkill/api-prototypes-with-dbb-and-my-first-attemp-to-join-to-opensource-world-1icm)
`;

export default content;
