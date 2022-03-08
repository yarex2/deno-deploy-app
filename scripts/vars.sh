export $(cat dd-client.env | xargs)
envsubst < ./app/client/config.ts.dist > ./app/client/config.ts
