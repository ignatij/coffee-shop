# coffee-shop


### running the containers locally

- running the app container:
docker run -p 8000:8000 -e DB_HOST=host.docker.internal --network coffeeNetwork -e EXTERNAL_API_URL=http://host.docker.internal:8081 coffee-app

- running the UI container:
docker run --network coffeeNetwork -p 8080:8080 coffee-app-ui
