import React, { useState, useEffect } from 'react';
import TaskForm from './pages/TaskForm';
import TaskList from './pages/TaskList';
import socket from './socket';
import { getTasks } from './api';
import { Badge } from './components/ui/badge';
import { Card, CardContent } from './components/ui/card';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('task:created', (newTask) => {
      setTasks((prev) =>
        prev.find((t) => t.id === newTask.id) ? prev : [newTask, ...prev]
      );
    });

    socket.on('task:updated', (updatedTask) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    });

    return () => {
      socket.off();
    };
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const pending = total - completed;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span className="font-semibold text-sm tracking-tight">
              PawnHero
            </span>
          </div>

          <span className="text-sm text-muted-foreground flex-1">
            Task Manager
          </span>

          <Badge
            variant="outline"
            className={
              connected
                ? 'border-green-500/30 bg-green-500/10 text-green-500'
                : ''
            }
          >
            <span className="w-2 h-2 rounded-full bg-current mr-1 animate-pulse" />
            {connected ? 'Live' : 'Offline'}
          </Badge>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-8">

        {/* STATS */}
        {total > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-6">

            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">{total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-green-500">{completed}</p>
                <p className="text-xs text-muted-foreground">Done</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-yellow-500">{pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {progress}% complete
                </p>
              </CardContent>
            </Card>

          </div>
        )}

        <TaskForm />
        <TaskList tasks={tasks} loading={loading} />
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-card py-4 text-center text-xs text-muted-foreground">
        PawnHero — Real-time Task Manager
      </footer>

    </div>
  );
}

export default App;