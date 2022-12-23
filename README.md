# Dollar Cost Averaging App

## Requirements:

- [Docker Desktop](https://docs.docker.com/get-docker/)

## Build the app

```bash
docker compose build
```

## Run the app

```bash
docker compose up
```

## Run Frontend Tests

Firstly open interactive shell in the frontend container:

```bash
docker exec -it dca_frontend /bin/sh
```

### Unit tests

Run unit tests in the container shell:

```bash
npm run test
```

To get the test coverage:

```bash
npm run coverage
```
