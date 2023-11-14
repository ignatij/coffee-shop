# Coffee Shop application

Simple coffee-ordering application designed to showcase the usages of:

- Node.js
- Express
- CommonJS
- ESM
- TypeScript
- React
- GraphQL
- Docker
- PostgreSQL

Designed as a monorepo with the help of Yarn workspaces.
Consists of the following workspaces:

- `app`: The GraphQL server application, ESM developed in Express with TypeScript and GraphQL support.
- `ui`: The frontend application, built with TypeScript and React, using Apollo for communication with the GraphQL server.
- `external-api-service`: An Express CommonJS microservice, designed to act as an "external" API to the main server application. The data used is from the following open source API: <https://api.sampleapis.com/coffee/hot>

## Prerequisites

- Yarn Berry (v4)
- Node v18
- Docker

## Development environment setup

If you use VSCode, jump to the next section where with the help of tasks you can achieve the same.

All commands are executed from the parent (root) directory:

- Run `yarn` to install packages
- Run `yarn start-local-db` to start the local PostgreSQL database
- Create `.env` files in `app`, `external-api-service` and `ui` workspaces (you can copy/paste from the `.env.sample` to use the default values)
- Run `yarn app:init-db` to create the database
- Run `yarn external-api-service:up` to start the external API
- Open a new terminal in the root directory and run `yarn app:start` to start the main server application. Running this command will:
  - Generate the types from the GraphQL schema and output them in the `src/__generated__` folder
  - Start the Apollo server
  - Insert the first 5 coffees from the external API into the local PostgreSQL database (if the env variable is set which is by default)
- Open a new terminal in the root and directory and run `yarn ui:start` to start the frontend application in preview mode (or `yarn ui:dev` for `dev` mode)
- Open [preview](http://localhost:4173/), or [dev](http://localhost:5174/)

## VSCode tasks for development setup

Run the following tasks in the following order:

- `Init DB Container`
- `Init Database`
- `External API Service`
- `App`
- `UI`

Open [dev](http://localhost:5174/)

## Creating Docker images

To create the Docker images of the three applications, run the following commands:

- `docker build -t external-api-service -f dockerfiles/ExternalServiceApi.Dockerfile .`
- `docker build -t app -f dockerfiles/App.Dockerfile .`
- `docker build -t ui -f dockerfiles/UI.Dockerfile .`

To start the three application run the following commands:

- Create a dedicated Docker network: `docker network create coffee-shop`
- Add the DB container to the network: `docker network connect coffee-shop app-postgres-1`
- Start the containers on the same network:
  - `docker run -d -p 8081:8081 --network coffee-shop external-api-service`
  - `docker run -d -p 8000:8000 -e DB_HOST=host.docker.internal -e EXTERNAL_API_URL=http://host.docker.internal:8081 --network coffee-shop app`
  - `docker run -d -p 8080:8080 --network coffee-shop ui`
