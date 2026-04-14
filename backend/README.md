# PawnHero Task Manager - Backend

Real-time task management API with WebSocket support using Express, MySQL, and Socket.io.

## Features

- 📝 CRUD operations for tasks
- 🔌 Real-time updates via WebSocket
- 🗄️ MySQL database
- 🔄 RESTful API endpoints

## Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **MySQL2** - Database client
- **Socket.io** - Real-time communication
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## Prerequisites

- Node.js 18+
- MySQL 8.0+
- Database `pawnhero_tasks` created

## Environment Variables

Create `.env` file:

```env
PORT=5000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pawnhero_tasks
DB_USERNAME=root
DB_PASSWORD=
```

## Installation

```bash
cd backend
npm install
```

## Database Setup

```sql
CREATE DATABASE pawnhero_tasks;

USE pawnhero_tasks;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_name VARCHAR(255) NOT NULL,
  status ENUM('pending', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

Server runs on http://localhost:5000

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task status |

### Statuses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/statuses` | Get all statuses |

## WebSocket Events

### Client → Server
- `connection` - Client connects
- `disconnect` - Client disconnects

### Server → Client
- `task:created` - New task added
- `task:updated` - Task status updated

## Project Structure

```
src/
├── config/
│   └── initDB.js        # Database initialization
├── controller/
│   ├── taskController.js # Task CRUD logic
│   └── statusController.js # Status logic
├── database/
│   └── db.js            # MySQL connection pool
├── routes/
│   ├── tasks.js         # Task routes
│   └── statuses.js      # Status routes
├── sockets/
│   └── socket.js        # Socket.io setup
└── server.js            # App entry point
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start with nodemon (development)
