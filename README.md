# deno-deploy-app
This is an example app for deploying on Deno Deploy

## Server: Instructions
To run the server application, run this command in the app/server directory: 
> deno run --allow-net=:3000,:27017 --config tsconfig.json --import-map=import_map.json --no-check ./src/index.ts

If using DynamoDB:
> DATABASE=DYNAMO_DB \
 AWS_ACCESS_KEY_ID=your_aws_key_id \
 AWS_SECRET_ACCESS_KEY=your_aws_secret \
 AWS_REGION=your_aws_region \
 deno run --unstable --allow-env --allow-read --allow-net=:3000,dynamodb.us-east-1.amazonaws.com --config tsconfig.json --import-map=import_map.json --no-check ./src/index.ts

If using FaunaDB:
> DATABASE=FAUNA_DB \
 FAUNA_SECRET=your_fauna_secret \
 deno run --allow-env=DATABASE,FAUNA_SECRET,FAUNA_URL --allow-net=:3000,graphql.eu.fauna.com --config tsconfig.json --import-map=import_map.json --no-check ./src/index.ts

If using MongoDB:
> DATABASE=MONGO_DB \
 MONGODB_URL=http://localhost:27017 \
 deno run --allow-env=DATABASE,MONGODB_URL --allow-net=:3000,:27017 --config tsconfig.json --import-map=import_map.json --no-check ./src/index.ts

## Client: Instructions
To run the client application, run one of the two commands in the app/client directory: 
> aleph dev

> aleph start

## Deployment: Instructions
To create the infrastructure and deploy:
> chmod +x ./scripts/deploy.sh && ./scripts/deploy.sh

To destroy the created infrastructure:
> chmod +x ./scripts/undeploy.sh && ./scripts/undeploy.sh

## Docker: Instructions
> chmod +x vars.sh &&./vars.sh
> docker-compose build
> docker-compose up -d
