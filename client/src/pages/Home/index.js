import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProjectsByRole } from "../../apicalls/projects";
import { SetLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { getDateFormat } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

// Define a functional component named "Home" for rendering the user's home page.
function Home() {
  // Define state to store project data.
  const [projects, setProjects] = useState([]);

  // Access the user data from the Redux store.
  const { user } = useSelector((state) => state.users);

  // Retrieve the Redux dispatch function and set up client-side navigation.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define a function to fetch projects by the user's role.
  const getData = async () => {
    try {
      // Set a loading state in Redux to indicate a loading process.
      dispatch(SetLoading(true));

      // Make an API call to get projects based on the user's role.
      const response = await GetProjectsByRole();
      
      // Clear the loading state in Redux.
      dispatch(SetLoading(false));

      // If the API call is successful, store the project data in the state.
      if (response.success) {
        setProjects(response.data);
      } else {
        // If there's an error, throw an error and display an error message.
        throw new Error(response.message);
      }
    } catch (error) {
      // Clear the loading state in Redux.
      dispatch(SetLoading(false));

      // Display an error message using the "message" component from Ant Design.
      message.error(error.message);
    }
  };

  // Use the useEffect hook to fetch project data when the component mounts.
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1 className="text-primary text-xl">
        {/* Display a welcome message with the user's first and last name. */}
        Hi {user?.firstName} {user?.lastName}, Welcome to TaSKiFy
      </h1>

      <div className="grid grid-cols-4 gap-5 mt-5">
        {projects.length === 0 ? (
          <div className="flex">
            <h1 className="text-primary text-xl">You have no projects yet</h1>
          </div>
        ) : (
          // Render project cards based on the retrieved data.
          projects.map((project) => (
            <div
              key={project._id}
              className="flex flex-col gap-1 border border-solid border-gray-400 rounded-md p-2 cursor-pointer"
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <h1 className="text-primary text-lg uppercase font-semibold">
                {/* Display the project's name. */}
                {project.name}
              </h1>

              {/* Render a divider. */}

              <div className="flex justify-between">
                <span className="text-gray-600 text-sm font-semibold">
                  Created At
                </span>
                <span className="text-gray-600 text-sm">
                  {/* Display the creation date of the project. */}
                  {getDateFormat(project.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm font-semibold">
                  Owner
                </span>
                <span className="text-gray-600 text-sm">
                  {/* Display the project owner's first name. */}
                  {project.owner.firstName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm font-semibold">
                  Status
                </span>
                <span className="text-gray-600 text-sm uppercase">
                  {/* Display the status of the project. */}
                  {project.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Export the "Home" component as the default export.
export default Home;
