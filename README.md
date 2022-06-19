# Nestjs TCP CURL

A simple command line utility to quickly interact with and test your Nestjs TCP transport based microservices.

## Install

using npm: `npm install -D nestjs-tcp-curl`

using yarn: `yarn add -D nestjs-tcp-curl`

## Usage

Use --help to list the valid flags

```
npx nestjs-tcp-curl --help
```

```
npx nestjs-tcp-curl <server URL> --pattern <handler pattern> --json --data <JSON payload>
```

Dont set `--json` if you are sending string data in the payload for example.

Complete Example

```
npx nestjs-tcp-curl 127.0.0.1:3000 --pattern sum --json --data '[1,2]'
```

## Arguments

| Argument | Description                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------- |
| url      | The URL for the request. Do not include the protocol. Pass the port number separated by a colon |

## Flags

| Flag                  | Description                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| -v, --version         | Output the version number                                                                                                                    |
| -p, --pattern <type>  | The pattern for the route. Required by Nestjs for route matching. Refer [nestjs docs](https://docs.nestjs.com/microservices/basics#patterns) |
| -d, --data <type>     | The payload of the request                                                                                                                   |
| -j, --json            | Set this flag to treat the data as JSON. (default: false)                                                                                    |
| -hr, --human-readable | Human readable output command.                                                                                                               |
| -h, --help            | Display help for command.                                                                                                                    |
