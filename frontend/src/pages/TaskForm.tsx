import React, { useState } from 'react';
import { createTask } from '../api';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '../components/ui/card';

import { Plus, Loader2, AlertCircle } from 'lucide-react';

function TaskForm() {
  const [taskName, setTaskName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = taskName.trim();
    if (!trimmed) {
      setError('Please enter a task name.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createTask(trimmed);
      setTaskName('');
    } catch (err) {
      setError('Failed to add task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>New Task</CardTitle>
        <CardDescription>
          Press Enter or click Add to create a task
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
              if (error) setError('');
            }}
            placeholder="What needs to be done?"
            disabled={loading}
          />

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add
              </>
            )}
          </Button>
        </form>

        {error && (
          <div className="flex items-center gap-2 mt-3 text-sm text-red-500">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TaskForm;