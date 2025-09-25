import { api } from "./auth.js";

export const getTasksRequest = () => api.get('/api/tasks');
export const getTaskRequest = (id) => api.get(`/api/tasks/${id}`);
export const createTaskRequest = (task) => api.post('/api/tasks', task);
export const updateTaskRequest = (id, task) => api.put(`/api/tasks/${id}`, task);
export const deleteTaskRequest = (id) => api.delete(`/api/tasks/${id}`);

