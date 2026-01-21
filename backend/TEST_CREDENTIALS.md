# Test Credentials

## Database
- **Host:** localhost
- **Port:** 5432
- **Database:** task_management
- **User:** postgres
- **Password:** Savatar@2486

## Test Users

### Regular User 1
- **Email:** test@example.com
- **Password:** password123
- **Role:** user
- **ID:** 1

### Regular User 2
- **Email:** testnew@example.com
- **Password:** password123
- **Role:** user
- **ID:** 2

### Admin User
- **Email:** admin@example.com
- **Password:** admin123
- **Role:** admin
- **ID:** 3

## Sample JWT Tokens (Valid for 7 days from generation)

### Regular User Token (User ID: 2):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0bmV3QGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjkwMzczMDYsImV4cCI6MTc2OTY0MjEwNn0.b3gGeKRDrjqjJ3yz16tQeeKS5IEgxv7i15T95U9IRXI
```

### Admin User Token (User ID: 3):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2OTAzNzQ2NiwiZXhwIjoxNzY5NjQyMjY2fQ.IsvjYqZMrcH_oNM1Jz16XRNQdY6t1ChDZVtrRzFbqDU
```

## Quick API Test Commands

### 1. Register New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New User",
    "email": "newuser@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Create Task (replace TOKEN with your JWT)
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "My Task",
    "description": "Task description",
    "status": "pending",
    "due_date": "2024-12-31"
  }'
```

### 4. Get All Tasks
```bash
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:3000/api/tasks
```

### 5. Get Tasks with Filters
```bash
curl -H "Authorization: Bearer TOKEN" \
  "http://localhost:3000/api/tasks?status=pending&limit=10&search=task"
```

### 6. Update Task
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "status": "in_progress"
  }'
```

### 7. Delete Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/1 \
  -H "Authorization: Bearer TOKEN"
```

### 8. Get Profile
```bash
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:3000/api/auth/profile
```

### 9. Get All Users (Admin Only)
```bash
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:3000/api/auth/users
```

## Notes

- JWT tokens are valid for 7 days from generation
- If tokens expire, login again to get a new token
- All task endpoints require authentication
- Admin endpoints require admin role
- Use Postman collection for easier testing: `postman_collection.json`
