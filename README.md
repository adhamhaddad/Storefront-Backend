# Storefront Backend Project

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Description
This is a backend API for a frontend store that makes all CRUD operations in the URL endpoints: `users`, `orders`, and `products`.
__Example:__ `http://localhost:3000/users`
##### Available ports: `3000` or `3001`
## Installations

##### open Terminal in Storefront-Backend Directory and run the following commands:
#
`yarn` or `npm install`
#
#### Create Role:
```
CREATE ROLE adham WITH PASSWORD 'password123';
```
#### Or you can use the default user of postgres called `postgres`
```
ALTER ROLE postgres WITH PASSWORD 'password123';
```
#### Create Database:
```
CREATE DATABASE store;
CREATE DATABASE store_dev;
```
#### Connect and give access to user:
```
\c store
GRANT ALL PRIVILEGES ON DATABASE store TO adham;
\c store_test
GRANT ALL PRIVILEGES ON DATABASE store_test TO adham;
```
#### Create file in root folder of Storefront-Backend with name .env and enter the following text on it:
```
ENV=dev
PORT=3000
# Database Configurations
DB_HOST=localhost
DB_PORT=5432
DB_DEV=store
DB_TEST=store_test
DB_USER=adham
DB_PASSWORD=password123
# Authentication Configurations
SALT=10
PEPPER=love-and-thunder
TOKEN=adham123!
```
##### To run server:
`npm run start`
#### or
`yarn start`


### Functionality
- user can query endpoint using various params and queries to create and retrieve orders with a token validation.

### Code Styles
This project uses `eslint` and `prettier`. all configurations for this project inside `package.json` file.

## Available Scripts

In the project directory, you can run:

##### `npm run dev` or `yarn dev`
Runs the app in the development mode.
The page will reload automatically if you make edits.

##### `npm run format` or `yarn format`
Will format by prettier and will also see if any lint errors in the console.

##### `npm run test` or `yarn test`
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

##### `npm run build` or `yarn build`
Builds the app for production to the dist folder.
It's format TypeScript to JavaScript

##### `npm run start` or `yarn start`
Build and runs the app in the clients mode.
Open http://localhost:3000/ to view it in the browser.


### Built With
- **Node.js**
- **Express.js**
- **TypeScript**
- **Jasmine**
- **PostgreSQL**
- **JWT**
