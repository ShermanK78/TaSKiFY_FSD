import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUser } from "../apicalls/users";
import { SetNotifications, SetUser } from "../redux/usersSlice";
import { SetLoading } from "../redux/loadersSlice";
import { GetAllNotifications } from "../apicalls/notifications";
import { Avatar, Badge } from "antd";
import Notifications from "./Notifications";

// Define a functional component named "ProtectedPage" for rendering protected content.
function ProtectedPage({ children }) {
  // Define a state variable to control the display of notifications modal.
  const [showNotifications, setShowNotifications] = useState(false);

  // Access the client-side navigation function.
  const navigate = useNavigate();

  // Retrieve the Redux dispatch function and user-related data from the Redux store.
  const dispatch = useDispatch();
  const { user, notifications } = useSelector((state) => state.users);

  // Define a function to fetch user information.
  const getUser = async () => {
    try {
      // Set a loading state in Redux to indicate a loading process.
      dispatch(SetLoading(true));

      // Make an API call to get the currently logged-in user.
      const response = await GetLoggedInUser();

      // Clear the loading state in Redux.
      dispatch(SetLoading(false));

      // If the API call is successful, update the user information in the Redux store.
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        // If there's an error, throw an error and display an error message.
        throw new Error(response.message);
      }
    } catch (error) {
      // Clear the loading state in Redux.
      dispatch(SetLoading(false));

      // Display an error message using the "message" component from Ant Design.
      message.error(error.message);

      // Remove the token from local storage and navigate to the login page.
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  // Define a function to fetch notifications for the logged-in user.
  const getNotifications = async () => {
    try {
      // Set a loading state in Redux to indicate a loading process.
      dispatch(SetLoading(true));

      // Make an API call to get all notifications.
      const response = await GetAllNotifications();

      // Clear the loading state in Redux.
      dispatch(SetLoading(false));

      // If the API call is successful, update the notifications in the Redux store.
      if (response.success) {
        dispatch(SetNotifications(response.data));
      } else {
        // If there's an error, throw an error and display an error message.
        throw Error(response.message);
      }
    } catch (error) {
      // Clear the loading state in Redux.
      dispatch(SetLoading(false));

      // Display an error message using the "message" component.
      message.error(error.message);
    }
  };

  // Use the useEffect hook to fetch user information when the component mounts.
  useEffect(() => {
    // Check if a token is present in local storage (indicating the user is authenticated).
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      // If no token is found, navigate to the login page.
      navigate("/login");
    }
  }, []);

  // Use the useEffect hook to fetch notifications when the "user" state changes.
  useEffect(() => {
    // Check if user data is available.
    if (user) {
      getNotifications();
    }
  }, [user]);

  // Render the protected page if there's a user (authenticated user).
  return (
    user && (
      <div>
        <div className="flex justify-between items-center bg-primary text-white px-5 py-4">
          <h1 className="text-2xl cursor-pointer" onClick={() => navigate("/")}>
            TaSKiFy - Management Technology
          </h1>

          <div className="flex items-center bg-white px-5 py-2 rounded">
            <span
              className=" text-primary cursor-pointer underline mr-2"
              onClick={() => navigate("/profile")}
            >
              {/* Display the user's first name. */}
              {user?.firstName}
            </span>

            {/* Display the count of unread notifications with an icon. */}
            <Badge
              count={
                notifications.filter((notification) => !notification.read)
                  .length
              }
              className="cursor-pointer"
            >
              <Avatar
                shape="square"
                size="large"
                icon={
                  <i className="ri-notification-line text-white rounded-full"></i>
                }
                onClick={() => {
                  // Show the notifications modal when clicked.
                  setShowNotifications(true);
                }}
              />
            </Badge>

            {/* Render a logout button that clears the token and navigates to the login page. */}
            <i
              className="ri-logout-box-r-line ml-10 text-primary"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="px-5 py-3">{children}</div>

        {/* Display the notifications modal if "showNotifications" state is true. */}
        {showNotifications && (
          <Notifications
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            reloadNotifications={getNotifications}
          />
        )}
      </div>
    )
  );
}

// Export the "ProtectedPage" component as the default export.
export default ProtectedPage;
