FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY .yarn/ ./.yarn/
COPY .pnp.cjs .pnp.loader.mjs .yarnrc.yml package.json yarn.lock ./
COPY ./external-api-service/ ./external-api-service/
RUN yarn install

ENV NODE_ENV="production"

ENV PORT="8081"
EXPOSE 8081

CMD ["node", "-r", "./.pnp.cjs", "./external-api-service/src/index.js"]
