# Simple CRUD API

## Description, Installation and Usage Guide

- This is a simple CRUD API using in-memory database underneath.
- To run the application, clone the repo to your local machine and run `npm i` to install all necessary dependencies.
- The app uses the following dependencies:
  -   `@tsconfig/node16`,
  -   `@types/mocha`,
  -   `@types/node`,
  -   `@types/uuid`,
  -   `@typescript-eslint/eslint-plugin`,
  -   `@typescript-eslint/parser`,
  -   `dotenv`,
  -   `eslint`,
  -   `nodemon`,
  -   `ts-node`,
  -   `typescript`,
  -   `webpack`,
  -   `webpack-cli`,
  -   `ts-loader`,
  -   `uuid`,
  -   `mocha` - used for testing,
  -   `chai` - used for testing,
  -   `chai-http` - used for testing

- After the installation, run `npm run start:dev` to run the app in the development mode.
- After the installation, run `npm run start:prod` to generate the production bundle and run the app in the production mode.
- There is one test scenario. To run tests, use `npm run test` command.

## Technical requirements

- Task is implemented with Typescript
- Only `nodemon`, `dotenv`, `typescript`, `ts-node`, `eslint` and its plugins, `webpack` and its plugins, `uuid`, `@types/*` as well as libraries used for testing were used
- The libraries and modules used for testing are `mocha`, `chai` and `chai-http`
- 16 LTS version of Node.js was used
- Asynchronous API was preferred whenever possible

## Implementation details

1. Implemented endpoint `api/users`:
    - **GET** `api/users` is used to get all users
        - Server answers with `status code` **200** and all users records
    - **GET** `api/users/${userId}` 
        - Server answers with `status code` **200** and record with `id === userId` if it exists
        - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **POST** `api/users` is used to create record about a new user and store it in the database
        - Server answers with `status code` **201** and the newly created record
        - Server answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - **PUT** `api/users/{userId}` is used to update an existing user
        - Server answers with` status code` **200** and the updated record
        - Server answers with` status code` **400** and a corresponding message if `userId` is invalid (not `uuid`)
        - Server answers with` status code` **404** and a corresponding message if record with `id === userId` doesn't exist
    - **DELETE** `api/users/${userId}` is used to delete existing user from database
        - Server answers with `status code` **204** if the record is found and deleted
        - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
2. Users are stored as `objects` that have the following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on the server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
3. Requests to non-existing endpoints (e.g. `some-non/existing/resource`) are handled (server answers with `status code` **404** and a human-friendly message)
4. Errors on the server side that occur during the processing of a request are handled and processed correctly (server answers with `status code` **500** and corresponding human-friendly message)
5. Value of `port` on which application is running is stored in `.env` file
6. There are 2 modes of running application (**development** and **production**):
    - The application is run in development mode using `nodemon` (there is a `npm` script `start:dev`)
    - The application is run in production mode (there is a `npm` script `start:prod` that starts the build process and then runs the bundled file)
7. There is one test scenario for API:
    1. Get all records with a `GET` `api/users` request (an empty array is expected)
    2. A new object is created by a `POST` `api/users` request (a response containing newly created record is expected)
    3. With a `GET` `api/user/{userId}` request, we try to get the created  record by its `id` (the created record is expected)
    4. We try to update the created record with a `PUT` `api/users/{userId}`request (a response is expected containing an updated object with the same `id`)
    5. With a `DELETE` `api/users/{userId}` request, we delete the created object by `id` (confirmation of successful deletion is expected)
    6. With a `GET` `api/users/{userId}` request, we are trying to get a deleted object by `id` (expected answer is that there is no such user)
