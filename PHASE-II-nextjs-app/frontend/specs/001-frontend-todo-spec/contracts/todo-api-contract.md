# API Contract: Todo Application

## Base URL
```
{{API_BASE_URL}}/todos
```

## Authentication
None required (as per frontend constitution)

## Endpoints

### GET /todos
Retrieve all todos

#### Request
```
GET {{API_BASE_URL}}/todos
Content-Type: application/json
```

#### Response
```
Status: 200 OK
Content-Type: application/json

{
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "completed": "boolean",
      "createdAt": "ISO 8601 datetime string",
      "updatedAt": "ISO 8601 datetime string"
    }
  ],
  "meta": {
    "totalCount": "number",
    "currentPage": "number",
    "totalPages": "number"
  }
}
```

### POST /todos
Create a new todo

#### Request
```
POST {{API_BASE_URL}}/todos
Content-Type: application/json

{
  "title": "string (required)",
  "description": "string (optional)"
}
```

#### Response
```
Status: 201 Created
Content-Type: application/json

{
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "createdAt": "ISO 8601 datetime string",
    "updatedAt": "ISO 8601 datetime string"
  }
}
```

### GET /todos/{id}
Retrieve a specific todo

#### Request
```
GET {{API_BASE_URL}}/todos/{id}
Content-Type: application/json
```

#### Response
```
Status: 200 OK
Content-Type: application/json

{
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "createdAt": "ISO 8601 datetime string",
    "updatedAt": "ISO 8601 datetime string"
  }
}
```

### PUT /todos/{id}
Update a specific todo

#### Request
```
PUT {{API_BASE_URL}}/todos/{id}
Content-Type: application/json

{
  "title": "string (optional)",
  "description": "string (optional)",
  "completed": "boolean (optional)"
}
```

#### Response
```
Status: 200 OK
Content-Type: application/json

{
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "createdAt": "ISO 8601 datetime string",
    "updatedAt": "ISO 8601 datetime string"
  }
}
```

### DELETE /todos/{id}
Delete a specific todo

#### Request
```
DELETE {{API_BASE_URL}}/todos/{id}
Content-Type: application/json
```

#### Response
```
Status: 200 OK
Content-Type: application/json

{
  "success": true
}
```

### PATCH /todos/{id}/toggle
Toggle the completion status of a specific todo

#### Request
```
PATCH {{API_BASE_URL}}/todos/{id}/toggle
Content-Type: application/json
```

#### Response
```
Status: 200 OK
Content-Type: application/json

{
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "createdAt": "ISO 8601 datetime string",
    "updatedAt": "ISO 8601 datetime string"
  }
}
```