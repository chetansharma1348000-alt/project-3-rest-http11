# Project 3: REST (HTTP/1.1) API

## 1. Project Overview

This project implements a User Management REST API using Node.js and the built-in HTTP module.

The project provides CRUD operations using HTTP/1.1 REST methods and displays the response time for each request in milliseconds.

## 2. Objective

The main objectives of this project are:

* Build a REST API using HTTP/1.1.
* Implement CRUD operations for users.
* Understand HTTP methods and status codes.
* Return data in JSON format.
* Measure and display request/response time in milliseconds.
* Compare REST API communication with the previous gRPC project.

## 3. Technologies Used

* Node.js
* JavaScript
* HTTP/1.1
* REST API
* HTML
* CSS
* JavaScript
* JSON

## 4. Project Structure

```text
project-3-rest-http11/
│
├── server/
│   └── server.js
│
├── client/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── package.json
└── README.md
```

## 5. REST API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/users`     | Get all users     |
| GET    | `/users/:id` | Get user by ID    |
| POST   | `/users`     | Create a new user |
| PUT    | `/users/:id` | Update a user     |
| DELETE | `/users/:id` | Delete a user     |

## 6. HTTP Status Codes

The API uses standard HTTP status codes:

* `200 OK` — Request successful.
* `201 Created` — New user successfully created.
* `400 Bad Request` — Invalid request or JSON data.
* `404 Not Found` — User or route not found.
* `500 Internal Server Error` — Server-side error.

## 7. Response Time

The project measures the time required for each API request.

Example:

```text
Method: GET
Endpoint: /users
Status: 200 OK
Response Time: 4.21 ms
```

The browser interface displays:

* Request Method
* Endpoint
* Status Code
* Response Time
* JSON Response

## 8. CRUD Operations

### GET Users

```text
GET /users
```

Returns all users.

### GET User by ID

```text
GET /users/1
```

Returns a specific user.

### POST User

```text
POST /users
```

Creates a new user.

Example request:

```json
{
    "name": "New User",
    "email": "newuser@gmail.com"
}
```

### PUT User

```text
PUT /users/1
```

Updates an existing user.

Example request:

```json
{
    "name": "Updated User",
    "email": "updated@gmail.com"
}
```

### DELETE User

```text
DELETE /users/3
```

Deletes an existing user.

## 9. REST vs gRPC

| Feature           | gRPC                             | REST                             |
| ----------------- | -------------------------------- | -------------------------------- |
| Protocol          | HTTP/2                           | HTTP/1.1                         |
| Communication     | RPC                              | REST API                         |
| Data Format       | Protocol Buffers                 | JSON                             |
| Methods           | RPC methods                      | GET, POST, PUT, DELETE           |
| Common Usage      | Service-to-service communication | Web APIs and client applications |
| Human Readability | Lower                            | High                             |

## 10. How to Run the Project

Open the project folder in VS Code.

Run:

```bash
npm init -y
```

Then start the server:

```bash
node server/server.js
```

The server runs at:

```text
http://localhost:5000
```

Open the URL in a browser:

```text
http://localhost:5000
```

## 11. Final Output

The browser interface provides buttons for:

```text
GET Users
GET User by ID
POST User
PUT User
DELETE User
```

After each request, the interface displays:

```text
Method
Endpoint
Status
Response Time
JSON Response
```

## 12. Conclusion

This project demonstrates how to build a RESTful User Management API using Node.js and HTTP/1.1.

The project implements complete CRUD functionality, JSON responses, HTTP status codes, request timing, and a browser-based interface. It also provides a comparison between REST HTTP/1.1 and the previous gRPC implementation.
