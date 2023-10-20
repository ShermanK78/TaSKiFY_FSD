import { message, Modal } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DeleteAllNotifications,
  MarkNotificationAsRead,
} from "../apicalls/notifications";
import { SetLoading } from "../redux/loadersSlice";
import { SetNotifications } from "../redux/usersSlice";
// Define a functional component called "Notifications."
function Notifications({ showNotifications, setShowNotifications }) {
  // Retrieve the notifications from the Redux store using the useSelector hook.
  const { notifications } = useSelector((state) => state.users);
  // Access the client-side navigation function.
  const navigate = useNavigate();
  // Retrieve the dispatch function for Redux actions.
  const dispatch = useDispatch();

  // Define a function to mark notifications as read.
  const readNotifications = async () => {
    try {
      // Make an API call to mark notifications as read.
      const response = await MarkNotificationAsRead();
      // If the API call is successful, update the notifications in the Redux store.
      if (response.success) {
        // Log the response data (optional).
        console.log(response.data);
        // Dispatch an action to update notifications in the Redux store.
        dispatch(SetNotifications(response.data));
      }
    } catch (error) {
      // Display an error message using the "message" component from Ant Design.
      message.error(error.message);
    }
  };

  // Define a function to delete all notifications.
  const deleteAllNotifications = async () => {
    try {
      // Set a loading state in Redux (shows a loading indicator).
      dispatch(SetLoading(true));
      // Make an API call to delete all notifications.
      const response = await DeleteAllNotifications();
      // Clear the loading state.
      dispatch(SetLoading(false));
      if (response.success) {
        // Clear notifications in the Redux store.
        dispatch(SetNotifications([]));
      } else {
        // Throw an error with a custom message if the API call fails.
        throw new Error(response.message);
      }
    } catch (error) {
      // Clear the loading state in Redux.
      dispatch(SetLoading(false));
      // Display an error message using the "message" component.
      message.error(error.message);
    }
  };

  // Use the useEffect hook to automatically mark notifications as read when notifications change.
  useEffect(() => {
    // If there are unread notifications, call the "readNotifications" function.
    if (notifications.length > 0) {
      readNotifications();
    }
  }, [notifications]);

  // Return a modal component to display notifications and user interactions.
  return (
    <Modal
      title="NOTIFICATIONS"
      open={showNotifications} // Determine if the modal is open.
      onCancel={() => setShowNotifications(false)} // Close the modal when "Cancel" is clicked.
      centered
      footer={null}
      width={1000}
    >
      <div className="flex flex-col gap-5 mt-5">
        {notifications.length > 0 ? ( // If there are notifications, display the "Delete All" option.
          <div className="flex justify-end">
            <span
              className="text-[15px] underline cursor-pointer"
              onClick={deleteAllNotifications} // Call "deleteAllNotifications" when clicked.
            >
              Delete All
            </span>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="text-[15px]">No Notifications</span>
          </div>
        )}
        {notifications.map((notification) => (
          <div
            className="flex justify-between items-end border border-solid p-2 roudned cursor-pointer"
            onClick={() => {
              setShowNotifications(false); // Close the modal when a notification is clicked.
              navigate(notification.onClick); // Navigate to the specified route.
            }}
          >
            <div className="flex flex-col">
              <span className="text-md font-semibold  text-gray-700">
                {notification.title}
              </span>
              <span className="text-sm">{notification.description}</span>
            </div>
            <div>
              <span className="text-sm">
                {moment(notification.createdAt).fromNow()} {/* Display the time since the notification was created.*/}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

// Export the "Notifications" component as the default export.
export default Notifications;
