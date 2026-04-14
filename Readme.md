# PawnHero Task Manager

A real-time task management application with a React frontend and Node.js/Express backend.

---

## Frontend

Built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

### Features

-  Modern UI with shadcn/ui components
-  Dark theme with Tailwind CSS
-  Real-time updates via WebSocket
-  Responsive design
-  Live connection status indicator

### Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Socket.io Client** - Real-time communication
- **Lucide React** - Icons
- **Craco** - Path aliases (@/)

### Prerequisites

- Node.js 18+
- Backend server running on http://localhost:5000

### Installation

```bash
cd frontend
npm install
npm install radix-ui
npm install --save-dev @types/react @types/react-dom
```

### Development

```bash
npm start
```

The app will run on http://localhost:3000

### Build

```bash
npm run build
```

### Project Structure

```
src/
├── components/
│   ├── css/          # Global styles
│   └── ui/           # shadcn/ui components
├── pages/
│   ├── TaskForm.tsx  # Create task form
│   ├── TaskList.tsx  # Task list view
│   └── TaskItem.tsx  # Individual task item
├── lib/
│   └── utils.ts      # Utility functions (cn)
├── api/              # API client
├── socket.js         # Socket.io client
└── index.js          # App entry
```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production

---

## Backend

Real-time task management API with WebSocket support using Express, MySQL, and Socket.io.

### Features

-  CRUD operations for tasks
-  Real-time updates via WebSocket
-  MySQL database
-  RESTful API endpoints

### Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **MySQL2** - Database client
- **Socket.io** - Real-time communication
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- Database `pawnhero_tasks` created

### Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pawnhero_tasks
DB_USERNAME=root
DB_PASSWORD=
```

### Installation

```bash
cd backend
npm install
```

### Database Setup

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

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

Server runs on http://localhost:5000

### API Endpoints

#### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task status |

#### Statuses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/statuses` | Get all statuses |

### WebSocket Events

#### Client → Server
- `connection` - Client connects
- `disconnect` - Client disconnects

#### Server → Client
- `task:created` - New task added
- `task:updated` - Task status changed

### Project Structure

```
src/
├── config/
│   └── initDB.js         # Database initialization
├── controller/
│   ├── taskController.js  # Task CRUD logic
│   └── statusController.js# Status logic
├── database/
│   └── db.js             # MySQL connection pool
├── routes/
│   ├── tasks.js          # Task routes
│   └── statuses.js       # Status routes
├── sockets/
│   └── socket.js         # Socket.io setup
└── server.js             # App entry point
```

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start with nodemon (development)
