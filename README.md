# File Server (Java Spring Boot, PostgreSQL and REACT)

## Tech Stack

* Server - Java Spring Boot /w Maven
* Web Client - React
* Database - Postgresql
* CLI - NodeJS

## Installation

### Server and Database

1. `cd FileServer`
2. `docker-compose up -d`
   * This will build and deploy the server on port 8080 and the postgresql database on port 5432. It also deploys pgAdmin to inspect the database which can be reached at <http://localhost:81>.
   * You can browse to localhost:81 to use pgAdmin with credentials:
     * User: `admin@test.com`
     * Pass: `admin`

### Web Client

1. `cd file-client`
2. `npm install`
3. `npm start`
4. Once the react client is running you can go to <http://localhost:8081> and upload/view/delete files.

### CLI

1. `cd file-client`
   1. `node cli/fileclient.js get` Get a list of all files
   2. `node cli/fileclient.js put [file]` Upload a file
   3. `node cli/fileclient.js del [file UUID]` Delete a file with UUID

## API Specification

The api can also be called with curl commands or postman requests to the following paths:

* **POST** `/upload`
  * Upload a file to the server must have form-data with key 'file' and type file and value of file.


* **GET** `/files` 
  * Get a list of all files on the server


* **DELETE** `/files/[fileUUID]`
  * Delete a file using the files' UUID
