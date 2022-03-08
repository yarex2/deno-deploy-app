FROM denoland/deno:ubuntu

WORKDIR /src
ADD index.ts /src

EXPOSE 3000

RUN deno cache index.ts

CMD ["run", "--allow-net", "index.ts"]
