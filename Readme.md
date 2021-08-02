# WeMap

## Description

A weather update and address verification service

This project uses `yarn` as it's package manager

## Dependencies

```
Nodejs
Typescript
Redis
MongoDB
Docker
```

This project is dockerized and and can easily be started by running `docker-compose up -d ` from the project root.

Hold your :racehorse: :wink:

We have to make sure that all dependencies are installed

## Installation

Go to the root of the application and run

```bash
$ yarn
```

## Environment variables

Rename the `.env.docker.example` to `.env.docker` and modify the content with your credential, then :fire:

## Dockerize and start the app

RUN

```
docker-compose up -d
```

## Running the app without Docker

```bash
# development
$ yarn dev


# production mode
$ yarn start
```

## Test

```bash
# tests
$ yarn test
```

## API Swagger documentation can be found at

`http://localhost:8080/api-docs`

## Stay in touch

- Author - [Mbonu Basil](https://linkledin.com/in/mbonubasil)

## License

Nest is [MIT licensed](LICENSE).
