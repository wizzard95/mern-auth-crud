import { api } from "./auth.js";

export const getTasksRequest = () => api.get('/tasks');
export const getTaskRequest = (id) => api.get(`/tasks/${id}`);
export const createTaskRequest = (task) => api.post('/tasks', task);
export const updateTaskRequest = (id, task) => api.put(`/tasks/${id}`, task);
export const deleteTaskRequest = (id) => api.delete(`/tasks/${id}`);
