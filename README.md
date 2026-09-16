# Team Project Management

A monorepo for team project management with backend API and frontend SPA.

## Structure

```
apps/
  backend/    - Express + TypeScript API server
  frontend/   - React + TypeScript SPA
packages/
  shared/     - Shared types and constants
```

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command              | Description                  |
|----------------------|------------------------------|
| `npm run dev`        | Start backend + frontend     |
| `npm run dev:backend`| Start backend only           |
| `npm run dev:frontend`| Start frontend only         |
| `npm run build`      | Build all packages           |

---

## API Documentation

Base URL: `http://localhost:3000/api`

### Auth

| Method | Endpoint             | Description              | Auth |
|--------|----------------------|--------------------------|------|
| POST   | `/api/auth/register` | Đăng ký tài khoản mới    | No   |
| POST   | `/api/auth/login`    | Đăng nhập, trả về JWT    | No   |
| POST   | `/api/auth/logout`   | Đăng xuất                | Yes  |
| GET    | `/api/auth/me`       | Lấy thông tin user hiện tại | Yes |

### Users

| Method | Endpoint          | Description               | Auth    |
|--------|-------------------|---------------------------|---------|
| GET    | `/api/users`      | Lấy danh sách users       | Admin   |
| GET    | `/api/users/:id`  | Lấy chi tiết user         | Yes     |
| PUT    | `/api/users/:id`  | Cập nhật thông tin user   | Yes     |
| DELETE | `/api/users/:id`  | Xóa user                  | Admin   |

### Teams

| Method | Endpoint            | Description            | Auth     |
|--------|---------------------|------------------------|----------|
| GET    | `/api/teams`        | Lấy danh sách teams    | Yes      |
| GET    | `/api/teams/:id`    | Lấy chi tiết team      | Yes      |
| POST   | `/api/teams`        | Tạo team mới           | Admin    |
| PUT    | `/api/teams/:id`    | Cập nhật team          | Manager  |
| DELETE | `/api/teams/:id`    | Xóa team               | Admin    |

### Projects

| Method | Endpoint               | Description                | Auth     |
|--------|------------------------|----------------------------|----------|
| GET    | `/api/projects`        | Lấy danh sách projects     | Yes      |
| GET    | `/api/projects/:id`    | Lấy chi tiết project       | Yes      |
| POST   | `/api/projects`        | Tạo project mới            | Manager  |
| PUT    | `/api/projects/:id`    | Cập nhật project           | Manager  |
| DELETE | `/api/projects/:id`    | Xóa project                | Admin    |

### Project Members

| Method | Endpoint                              | Description                       | Auth     |
|--------|---------------------------------------|-----------------------------------|----------|
| GET    | `/api/projects/:projectId/members`    | Lấy danh sách thành viên project  | Yes      |
| POST   | `/api/projects/:projectId/members`    | Thêm thành viên vào project       | Manager  |
| DELETE | `/api/projects/:projectId/members/:userId` | Xóa thành viên khỏi project | Manager  |

### Tasks

| Method | Endpoint                  | Description                | Auth     |
|--------|---------------------------|----------------------------|----------|
| GET    | `/api/projects/:projectId/tasks` | Lấy danh sách tasks theo project | Yes |
| GET    | `/api/tasks/:id`          | Lấy chi tiết task          | Yes      |
| POST   | `/api/projects/:projectId/tasks` | Tạo task mới           | Yes      |
| PUT    | `/api/tasks/:id`          | Cập nhật task              | Yes      |
| DELETE | `/api/tasks/:id`          | Xóa task                   | Manager  |

### Comments

| Method | Endpoint                          | Description                  | Auth |
|--------|-----------------------------------|------------------------------|------|
| GET    | `/api/tasks/:taskId/comments`     | Lấy danh comments theo task  | Yes  |
| POST   | `/api/tasks/:taskId/comments`     | Tạo comment mới              | Yes  |
| PUT    | `/api/comments/:id`               | Cập nhật comment             | Yes  |
| DELETE | `/api/comments/:id`               | Xóa comment                  | Yes  |

---

### Request/Response Examples

#### POST /api/auth/register

```json
// Request
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "Password123!"
}

// Response 201
{
  "id": 1,
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "role": "MEMBER"
}
```

#### POST /api/auth/login

```json
// Request
{
  "email": "user@example.com",
  "password": "Password123!"
}

// Response 200
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "role": "MEMBER"
  }
}
```

#### POST /api/projects/:projectId/tasks

```json
// Request
{
  "title": "Thiết kế trang chủ",
  "description": "Thiết kế giao diện trang chủ với banner",
  "priority": "HIGH",
  "assigneeId": 5,
  "dueDate": "2025-09-15"
}

// Response 201
{
  "id": 1,
  "title": "Thiết kế trang chủ",
  "description": "Thiết kế giao diện trang chủ với banner",
  "status": "TODO",
  "priority": "HIGH",
  "assigneeId": 5,
  "dueDate": "2025-09-15T00:00:00.000Z",
  "projectId": 1,
  "createdBy": 1,
  "createdAt": "2025-08-29T10:00:00.000Z"
}
```

#### Error Response

```json
// 400 - Bad Request
{
  "message": "Validation error",
  "errors": [
    { "field": "email", "message": "Email is required" }
  ]
}

// 401 - Unauthorized
{
  "message": "Unauthorized"
}

// 403 - Forbidden
{
  "message": "Forbidden: insufficient permissions"
}

// 404 - Not Found
{
  "message": "Resource not found"
}
```
