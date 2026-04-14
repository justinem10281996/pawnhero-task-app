import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/api`
  : '/api';

export const getTasks    = ()             => axios.get(`${API_BASE}/tasks`);
export const createTask  = (task_name)    => axios.post(`${API_BASE}/tasks`, { task_name });
export const updateTaskStatus = (id, status) => axios.put(`${API_BASE}/tasks/${id}`, { status });

export const getStatuses = ()             => axios.get(`${API_BASE}/statuses`);