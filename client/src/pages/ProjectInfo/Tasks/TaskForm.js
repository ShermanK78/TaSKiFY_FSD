import React from "react";
import { Button, Form, Input, message, Modal, Tabs, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { AddNotification } from "../../../apicalls/notifications";
import { CreateTask, UpdateTask, UploadImage } from "../../../apicalls/tasks";
import { SetLoading } from "../../../redux/loadersSlice";

function TaskForm({
  showTaskForm,
  setShowTaskForm,
  project,
  task,
  reloadData,
  form
}) {
  // State to manage the active tab
  const [selectedTab = "1", setSelectedTab] = React.useState("1");

  // State to store the email
  const [email, setEmail] = React.useState("");

  // Access user data from Redux
  const { user } = useSelector((state) => state.users);

  // Reference to the form
  const formRef = React.useRef(null);

  // State to handle file uploads
  const [file = null, setFile] = React.useState(null);

  // State to store task attachments
  const [images = [], setImages] = React.useState(task?.attachments || []);
  const dispatch = useDispatch();

  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      let response = null;

      // Find the member in the project by email
      const assignedToMember = project.members.find(
        (member) => member.user.email === email
      );

      // Extract the assigned user's ID
      const assignedToUserId = assignedToMember?.user._id;

      dispatch(SetLoading(true));

      if (task) {
        // Update an existing task
        response = await UpdateTask({
          ...values,
          project: project._id,
          assignedTo: task.assignedTo?._id,
          _id: task._id,
        });
      } else {
        // Create a new task
        const assignedBy = user?._id;
        response = await CreateTask({
          ...values,
          project: project._id,
          assignedTo: assignedToUserId,
          assignedBy,
        });
      }

      if (response.success) {
        if (!task) {
          // Send a notification to the assigned employee
          AddNotification({
            title: `You have been assigned a new task in ${project.name}`,
            user: assignedToUserId,
            onClick: `/project/${project._id}`,
            description: values.description,
          });
        }

        reloadData();
        message.success(response.message);
        setShowTaskForm(false);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  // Function to validate the entered email
  const validateEmail = () => {
    const employeesInProject = project.members.filter(
      (member) => member.role === "employee" || member.role === "admin"
    );

    // Check if the entered email is valid and corresponds to an employee in the project
    const isEmailValid = employeesInProject.some(
      (member) => user && member.user.email  === email
    );

    return isEmailValid ? true : false;
  };

  // Function to upload an image
  const uploadImage = async () => {
    try {
      dispatch(SetLoading(true));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("taskId", task?._id);
      const response = await UploadImage(formData);

      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        reloadData();
      } else {
        throw new Error(response.message);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  // Function to delete an uploaded image
  const deleteImage = async (image) => {
    try {
      dispatch(SetLoading(true));
      const attachments = images.filter((img) => img !== image);
      const response = await UpdateTask({
        ...task,
        attachments,
      });

      if (response.success) {
        message.success(response.message);
        setImages(attachments);
        reloadData();
      } else {
        throw new Error(response.message);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  return (
    <Modal
      title={task ? "UPDATE TASK" : "CREATE TASK"}
      open={showTaskForm}
      onCancel={() => setShowTaskForm(false)}
      centered
      onOk={() => {
        formRef.current.submit();
      }}
      okText={task ? "UPDATE" : "CREATE"}
      width={800}
      {...(selectedTab === "2" && { footer: null })}
      okButtonProps={{
        disabled: email && !validateEmail(),
      }}
    
    >
      <Tabs activeKey={selectedTab} onChange={(key) => setSelectedTab(key)}>
        <Tabs.TabPane tab="Task Details" key="1">
          <Form
            layout="vertical"
            ref={formRef}
            onFinish={onFinish}
            initialValues={{
              ...task,
              assignedTo: task ? task.assignedTo.email : "",
            }}
          >
            <Form.Item label="Task Name" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Task Description" name="description">
              <TextArea />
            </Form.Item>
            <Form.Item label="Assign To" name="assignedTo" noStyle>
              <Input
                placeholder="Enter email of the employee"
                onChange={(e) => setEmail(e.target.value)}
                disabled={task ? true : false}
              />
            </Form.Item>

            {email && !validateEmail() && (
  <Form.Item
    noStyle
    shouldUpdate={(prevValues, currentValues) =>
      prevValues.assignedTo !== currentValues.assignedTo
    }
  >
    {({ getFieldsValue }) => (
      <div className="bg-red-700 text-sm p-2 rounded">
        <span className="text-white">
          Email is not valid or member was not included in this project 
          NB: Only Project Owners & Admins may add members to projects
        </span>
       
      </div>
    )}
  </Form.Item>
)}
          </Form>
        </Tabs.TabPane>
       
      </Tabs>
    </Modal>
  );
}

export default TaskForm;
