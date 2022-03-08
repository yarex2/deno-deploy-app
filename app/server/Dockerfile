FROM denoland/deno:ubuntu

EXPOSE 3000

WORKDIR /app
COPY . .
USER deno

ENV DATABASE=$DATABASE

ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION=$AWS_REGION

ENV FAUNA_SECRET=$FAUNA_SECRET
ENV MONGODB_URL=$MONGODB_URL

RUN deno cache --unstable --no-check ./src/index.ts
CMD deno run --unstable --allow-env --allow-net --allow-read --config tsconfig.json --import-map=import_map.json --no-check ./src/index.ts
# CMD ["run", "--unstable", "--allow-env", "--allow-net", "--allow-read", "--no-check", "--config", "tsconfig.json", "--import-map", "import_map.json", "./src/index.ts"]
