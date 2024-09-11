# Goldstore Full Stack TypeScript Assessment

This assessment will test your skills in Full Stack Development, particularly with TypeScript, NestJS, TypeORM, PostgreSQL and Docker.

## Prerequisites

1. Install [Docker](https://docs.docker.com/engine/install/)
2. Install [NestJS CLI](https://docs.nestjs.com/cli/overview) globally to your system or explore other ways to use NestJS.
3. Install [TypeORM](https://typeorm.io/) and configure it to connect with PostgreSQL.

## Technical requirements

- Node.js LTS version 20
- Latest version of NestJS
- Latest version of PostgreSQL
- Latest version of TypeORM

## Description

The task revolves around three critical areas:

1. Containerization with Docker
2. Database and ORM setup using PostgreSQL and TypeORM
3. Development of a CRUD RESTful API to facilitate tracking of live Gold prices against the USD.

## Implementation details

### I) Containerization with Docker

1. Create a `.dockerignore` file specifying all files that should be ignored by Docker.
2. Develop a `Dockerfile` to build the image for the application and PostgreSQL database.
3. Create a `docker-compose.yml` file to orchestrate the multi-container application (application and PostgreSQL database).
4. Specify a custom network for facilitating communication between application and database containers.
5. Build the docker images and perform a security vulnerability scan.
6. Remember to commit these changes to the repository.

### II) Database and ORM setup

1. Setup PostgreSQL as the database and configure TypeORM to manage database operations.
2. Create a `Purchases` table with the following schema:
 - UserID: string
 - ouncesPurchased: float
 - valueUSD: float
 - purchaseTime: datetime
 - `Bonus add additonal fields`

### III) Development of the API

Develop a RESTful API for purchasing gold.

#### API Endpoint:

Create a POST endpoint `/api/gold/purchase` that accepts a payload as shown below:
```typescript
    'userID'
    'currencyAvailable'
```

Upon triggering the endpoint:

1. Retrieve the live Gold price vs. USD from an external API (Gold Symbol: XAU).
2. If the `currencyAvailable` is less than the price for 10 ounces of XAU, return a message alerting the user and do not make any database changes.
3. If the `currencyAvailable` is more than the value of 10 ounces of XAU, record the purchase in the `Purchases` table.

You can use the `Metal Price API` to fetch the gold price. Furthermore, ensure that the endpoints can be tested using Postman.

## Project Setup & Running the Project

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Build Docker images for the application and database services using Docker Compose: `docker-compose build`.
4. Run the project locally with Docker Compose: `docker-compose up`.

 > Ensure that the project can be cloned and run on different environments using the above instructions.

## Bonus

If you have completed the main tasks and have some time to spare, consider accomplishing this bonus task of creating a User entity.

1. Develop a `User` entity with - at the very least - the following fields:
 - userID: string (Ensure to uuids)
 - username: string
 - password: string (Ensure to hash passwords before storing)

1. Link this `User` entity to the existing `purchases` table.
 - Set up a One-To-Many relationship with the `purchases` table (One User can have many purchases).

Remember, accomplishing this bonus task would highlight your skill in managing database relations, an important aspect when dealing with complex databases.

Happy coding!