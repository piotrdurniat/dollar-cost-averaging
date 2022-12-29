# API documentation

Hosted on:

- http://127.0.0.1:8000/docs

# Development

## Create a virtual environment

```bash
python3 -m venv .venv
```

## Activate the virtual environment

```bash
. .venv/bin/activate
```

## Install dependencies

```bash
python3 -m pip install -r requirements.txt
```

## Run app

```bash
python3 -m flask --app flask-app run
```

- `--debug` flag for debug mode

## List outdated pip packages

```bash
python3 -m pip list --outdated
```

## Write packages to requirements file

```bash
python3 -m pip freeze > requirements.txt
```
