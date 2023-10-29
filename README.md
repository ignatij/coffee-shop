# Coffee Shop application

The application is designed as a monorepo using Yarn workspaces. It consists of the following workspaces:

- `app`: The GraphQL server application, developed in Express with TypeScript and GraphQL support.
- `ui`: The frontend application, built with TypeScript and React, using the Apollo client package to communicate with the GraphQL server.
- `external-api-service`: An Express JavaScript application designed to act as an "external" API to the main server application.

## Prerequisites

- Yarn v4
- Node v18
- Docker

## Starting locally

All commands are executed from the parent(root) directory:

- Run `yarn` to install packages
- Run `yarn start-local-db` to start the local PostgreSQL database
- Create `.env` files in `app`, `external-api-service` and `ui` workspaces (you can copy/paste from the `.env.sample` to use the default values)
- Run `yarn app:init-db` to create the database
- Run `yarn external-api-service:up` to start the external API
- Run `yarn app:start` to start the main server application. Running this command will:
  - Generate the types from the GraphQL schema and output them in the `src/__generated__` folder
  - Start the Apollo server
  - Insert the first 5 coffees from the external API into the local PostgreSQL database (if the env variable is set which is by default)
- Run `yarn ui:start` to start the frontend application in preview mode (or `yarn ui:dev` for `dev` mode)
- Open [preview](http://localhost:4173/), or [dev](http://localhost:5174/)

## Creating Docker images and starting them locally

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

## Going on cloud

In the following section, I'd describe what I'd use on AWS as a cloud provider.

As the application is already dockerized, I'd use the AWS EKS (Elastic Kubernetes Service) which is a Kubernetes service on AWS.

I'd create the following k8s manifests:

- deployment for `external-api-service`
- deployment for `app`
- deployment for `ui`
- service for `app`
- service for `external-api-service`
- service for `ui`
- ingress for `ui`
  - maybe adding for `app` as well as sometimes this is very practical in order to test local frontend with production backend

The above-mentioned manifests would go in a `base` package, and I'd create dedicated `overlays` for the specific environment (`dev`, `test`, `stage`, `prod`...) where the specific environment-related properties will be set (server host, DB connection, external api URL...):

```
base/
    app/
    external-api-service/
    ui/
overlays/
    dev/
    test/
    stage/
    prod/
```

in the corresponding environment, the overrides will be done using `kustomize patches`.

I'd also include a `HorizontalPodAutoscaler` resource, especially for the `app` server, as this will instruct EKS to automatically scale up/down pods, depending on the observed CPU utilization or some other custom metric.
