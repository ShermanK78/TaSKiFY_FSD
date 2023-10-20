const { apiRequest } = require(".");

// This function 'AddNotification' sends a POST request to add a new notification.
export const AddNotification = async (notification) => apiRequest("post", "/api/notifications/add-notification", notification);

// This function 'GetAllNotifications' sends a GET request to retrieve all notifications.
export const GetAllNotifications = async () => apiRequest("get", "/api/notifications/get-all-notifications");

// This function 'MarkNotificationAsRead' sends a POST request to mark a notification as read.
export const MarkNotificationAsRead = async (id) => apiRequest("post", "/api/notifications/mark-as-read");

// This function 'DeleteAllNotifications' sends a DELETE request to delete all notifications.
export const DeleteAllNotifications = async () => apiRequest("delete", "/api/notifications/delete-all-notifications");
