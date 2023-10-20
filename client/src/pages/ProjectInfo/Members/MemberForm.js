import { Form, Input, message, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { AddMemberToProject } from "../../../apicalls/projects";
import { SetLoading } from "../../../redux/loadersSlice";
import { getAntdFormInputRules } from "../../../utils/helpers";

function MemberForm({
  showMemberForm,
  setShowMemberForm,
  reloadData,
  project,
}) {
  // Create a ref for the form
  const formRef = React.useRef(null);
  const dispatch = useDispatch();
  
  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      // Check if the email already exists among project members
      const emailExists = project.members.find(
        (member) => member.user.email === values.email
      );
      if (emailExists) {
        // Display an error message if the user is already a member of the project
        throw new Error("User is already a member of this project");
      } else {
        dispatch(SetLoading(true));
        // Make an API call to add a member to the project
        const response = await AddMemberToProject({
          projectId: project._id,
          email: values.email,
          role: values.role,
        });
        dispatch(SetLoading(false));
        if (response.success) {
          // Display a success message, refresh data, and hide the modal
          message.success(response.message);
          reloadData();
          setShowMemberForm(false);
        } else {
          // If there's an error, display an error message
          message.error(response.message);
        }
      }
    } catch (error) {
      // Handle errors by dispatching loading action and displaying an error message
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="ADD MEMBER"
      visible={showMemberForm}
      onCancel={() => setShowMemberForm(false)}
      centered
      okText="Add"
      onOk={() => {
        // Submit the form when the "Add" button is clicked
        formRef.current.submit();
      }}
    >
      <Form layout="vertical" ref={formRef} onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={getAntdFormInputRules}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item label="Role" name="role" rules={getAntdFormInputRules}>
          <select>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default MemberForm;
