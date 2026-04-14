import React, { useState } from 'react';
import { updateTaskStatus } from '../api';

import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';

import { Check, Clock } from 'lucide-react';

interface Task {
  id: number;
  task_name: string;
  status: 'pending' | 'completed';
  created_at: string;
}

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    const newStatus =
      task.status === 'pending' ? 'completed' : 'pending';

    setLoading(true);
    try {
      await updateTaskStatus(task.id, newStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isDone = task.status === 'completed';

  const formattedDate = new Date(task.created_at).toLocaleString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-card">
      <Checkbox
        checked={isDone}
        onCheckedChange={handleToggle}
        disabled={loading}
      />

      <div className="flex-1">
        <p className={isDone ? 'line-through text-muted-foreground' : ''}>
          {task.task_name}
        </p>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
      </div>

      <Badge variant={isDone ? 'success' : 'warning'}>
        {isDone ? (
          <>
            <Check className="w-3 h-3" />
            Done
          </>
        ) : (
          <>
            <Clock className="w-3 h-3" />
            Pending
          </>
        )}
      </Badge>
    </div>
  );
}

export default TaskItem;