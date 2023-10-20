import { apiRequest } from ".";

// This function 'CreateTask' sends a POST request to create a new task.
export const CreateTask = async (task) =>
  apiRequest("post", "/api/tasks/create-task", task);

// This function 'GetAllTasks' sends a POST request to retrieve all tasks with optional filters.
export const GetAllTasks = async (filters) =>
  apiRequest("post", "/api/tasks/get-all-tasks", filters);

// This function 'UpdateTask' sends a POST request to update an existing task.
export const UpdateTask = async (task) =>
  apiRequest("post", "/api/tasks/update-task", task);

// This function 'DeleteTask' sends a POST request to delete a task by its ID.
export const DeleteTask = async (id) =>
  apiRequest("post", "/api/tasks/delete-task", { _id: id });

// This function 'UploadImage' sends a POST request to upload an image associated with a task.
export const UploadImage = async (payload) => {
  return apiRequest("post", "/api/tasks/upload-image", payload);
};
