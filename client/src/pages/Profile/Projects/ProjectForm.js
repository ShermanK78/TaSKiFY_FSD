import { Form, Input, message, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { CreateProject, EditProject } from "../../../apicalls/projects";

function ProjectForm({ show, setShow, reloadData, project }) {
  // Create a ref for the form
  const formRef = React.useRef(null);
  
  // Access user data from Redux store and get access to dispatch function
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  
  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      // Set loading state
      dispatch(SetLoading(true));
      let response = null;
      
      if (project) {
        // Edit project if a project object is provided
        values._id = project._id;
        response = await EditProject(values);
      } else {
        // Create a new project if no project object is provided
        values.owner = user._id;
        values.members = [
          {
            user: user._id,
            role: "owner",
          },
        ];
        response = await CreateProject(values);
      }
     
      if (response.success) {
        // Display a success message, refresh data, and hide the modal
        message.success(response.message);
        reloadData();
        setShow(false);
      } else {
        // If there's an error, throw an error
        throw new Error(response.error);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      // Handle errors by dispatching loading action and displaying an error message
      dispatch(SetLoading(false));
    }
  };

  return (
    <Modal
      title={project ? "EDIT PROJECT" : "CREATE PROJECT"}
      visible={show}
      onCancel={() => setShow(false)}
      centered
      width={700}
      onOk={() => {
        // Submit the form when the "Save" button is clicked
        formRef.current.submit();
      }}
      okText="Save"
    >
      <Form
        layout="vertical"
        ref={formRef}
        onFinish={onFinish}
        initialValues={project}
      >
        <Form.Item label="Project Name" name="name">
          <Input placeholder="Project Name" />
        </Form.Item>
        <Form.Item label="Project Description" name="description">
          <TextArea placeholder="Project Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ProjectForm;
