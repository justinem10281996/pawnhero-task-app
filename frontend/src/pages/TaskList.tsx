import React from 'react';
import TaskItem from './TaskItem';
import { Separator } from '../components/ui/separator';

import { Loader2 } from 'lucide-react';

interface Task {
  id: number;
  task_name: string;
  status: 'pending' | 'completed';
  created_at: string;
}

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
}

function TaskList({ tasks, loading }: TaskListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin" />
        Loading tasks...
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No tasks yet
      </div>
    );
  }

  const pending = tasks.filter((t: Task) => t.status === 'pending');
  const completed = tasks.filter((t: Task) => t.status === 'completed');

  return (
    <div className="flex flex-col gap-6">

      {/* PENDING */}
      {pending.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase text-muted-foreground">
              Pending
            </span>
            <Separator className="flex-1" />
          </div>

          <div className="flex flex-col gap-2">
            {pending.map((task: Task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {/* COMPLETED */}
      {completed.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase text-green-500">
              Completed
            </span>
            <Separator className="flex-1" />
          </div>

          <div className="flex flex-col gap-2">
            {completed.map((task: Task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default TaskList;