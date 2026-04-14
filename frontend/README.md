# PawnHero Task Manager - Frontend

A real-time task management application built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- ✨ Modern UI with shadcn/ui components
- 🎨 Dark theme with Tailwind CSS
- ⚡ Real-time updates via WebSocket
- 📱 Responsive design
- 🔄 Live connection status indicator

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Socket.io Client** - Real-time communication
- **Lucide React** - Icons
- **Craco** - Path aliases (@/)

## Prerequisites

- Node.js 18+
- Backend server running on http://localhost:5000

## Installation

```bash
cd frontend
npm install
npm install radix-ui
npm install --save-dev @types/react @types/react-dom
```

## Development

```bash
npm start
```

The app will run on http://localhost:3000

## Build

```bash
npm run build
```

## Project Structure

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

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production

## Proxy

API requests are proxied to `http://localhost:5000` (backend)
