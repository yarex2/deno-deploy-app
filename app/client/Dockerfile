FROM denoland/deno:ubuntu

EXPOSE 8080

WORKDIR /app

RUN apt-get update \
  && apt-get install curl -y \
  && apt-get install gettext-base \
  && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
  && apt-get install -y nodejs \
  && deno run -A https://deno.land/x/aleph/install.ts

COPY . .

ENV TODOS_URL=$TODOS_URL
# RUN envsubst < config.ts.dist > config.ts

CMD ["aleph", "start"]
