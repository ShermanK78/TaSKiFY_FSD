import React, { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProject, GetAllProjects } from "../../../apicalls/projects";
import { SetLoading } from "../../../redux/loadersSlice";
import { getDateFormat } from "../../../utils/helpers";
import ProjectForm from "./ProjectForm";

function Projects() {
  // State for managing selected project, list of projects, and form visibility
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  
  // Access user data from Redux store and get access to dispatch function
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // Function to fetch project data
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      // Make an API call to get all projects owned by the user
      const response = await GetAllProjects({ owner: user._id });

      if (response.success) {
        // Update the list of projects
        setProjects(response.data);
      } else {
        // If there's an error, display an error message
        throw new Error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  // Function to handle project deletion
  const onDelete = async (id) => {
    try {
      dispatch(SetLoading(true));
      // Make an API call to delete a project
      const response = await DeleteProject(id);

      if (response.success) {
        // Display a success message and refresh the project data
        message.success(response.message);
        getData();
      } else {
        // If there's an error, display an error message
        throw new Error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    getData();
  }, []);

  // Configuration for the table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-4">
          <i
            className="ri-delete-bin-line"
            onClick={() => onDelete(record._id)}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => {
              setSelectedProject(record);
              setShow(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  // Function to handle adding a new project
  const handleAddProject = () => {
    setSelectedProject(null);
    setShow(true);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button type="default" onClick={handleAddProject}>
          Add Project
        </Button>
      </div>
      <Table columns={columns} dataSource={projects} className="mt-4" />
      {show && (
        <ProjectForm
          show={show}
          setShow={setShow}
          reloadData={getData}
          project={selectedProject}
        />
      )}
    </div>
  );
}

export default Projects;
