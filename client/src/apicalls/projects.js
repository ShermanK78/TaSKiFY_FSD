const { apiRequest } = require(".");

// This function 'CreateProject' sends a POST request to create a new project.
export const CreateProject = async (project) => apiRequest("post", "/api/projects/create-project", project);

// This function 'GetAllProjects' sends a POST request to retrieve all projects with optional filters.
export const GetAllProjects = async (filters) => apiRequest("post", "/api/projects/get-all-projects", filters);

// This function 'GetProjectById' sends a POST request to retrieve a project by its ID.
export const GetProjectById = async (id) => apiRequest("post", "/api/projects/get-project-by-id", { _id: id });

// This function 'EditProject' sends a POST request to edit an existing project.
export const EditProject = async (project) => apiRequest("post", "/api/projects/edit-project", project);

// This function 'DeleteProject' sends a POST request to delete a project by its ID.
export const DeleteProject = async (id) => apiRequest("post", "/api/projects/delete-project", { _id: id });

// This function 'GetProjectsByRole' sends a POST request to retrieve projects based on a user's role.
export const GetProjectsByRole = async (userId) => apiRequest("post", "/api/projects/get-projects-by-role", { userId });

// This function 'AddMemberToProject' sends a POST request to add a member to a project.
export const AddMemberToProject = async (data) => apiRequest("post", "/api/projects/add-member", data);

// This function 'RemoveMemberFromProject' sends a POST request to remove a member from a project.
export const RemoveMemberFromProject = async (data) => apiRequest("post", "/api/projects/remove-member", data);
