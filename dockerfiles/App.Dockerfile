FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY .yarn/ ./.yarn/
COPY .pnp.cjs .pnp.loader.mjs .yarnrc.yml package.json yarn.lock ./
COPY ./app/ ./app/
RUN yarn install

ENV NODE_ENV="production"

ENV PORT="8000"
EXPOSE 8000

CMD ["yarn", "app:start"]
