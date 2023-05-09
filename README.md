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

Go to `frontend/` dir:

```bash
cd frontend/
```

### Unit tests

Run unit tests:

```bash
npm run test
```

Get the test coverage:

```bash
npm run coverage
```

### End-to-end tests

```bash
npm run cypress:open
```

# Production

### Build

To build frontend app run from `frontend/` dir:

```bash
docker compose -f docker-compose.yml run --rm frontend npm run build
```

Build docker contaners:

```bash
docker compose -f docker-compose.prod.yml build
```

### Run the app

```bash
docker compose -f docker-compose.prod.yml up
```
