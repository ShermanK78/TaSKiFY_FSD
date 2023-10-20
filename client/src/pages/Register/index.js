import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetButtonLoading } from "../../redux/loadersSlice";
import { getAntdFormInputRules } from "../../utils/helpers";

function Register() {
  // Initialize the routing navigate function
  const navigate = useNavigate();

  // Access buttonLoading state from Redux
  const { buttonLoading } = useSelector((state) => state.loaders);

  const dispatch = useDispatch();

  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      // Set the button loading state
      dispatch(SetButtonLoading(true));

      // Call the RegisterUser API with form values
      const response = await RegisterUser(values);

      // Reset the button loading state
      dispatch(SetButtonLoading(false));

      if (response.success) {
        // Display a success message and navigate to the login page
        message.success(response.message);
        navigate("/login");
      } else {
        // If registration is not successful, throw an error with the error message
        throw new Error(response.message);
      }
    } catch (error) {
      // Handle errors, reset the button loading state, and display an error message
      dispatch(SetButtonLoading(false));
      message.error(error.message);
    }
  };

  // Check if the user is already logged in and redirect to the home page
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="grid grid-cols-2">
      <div className="bg-primary h-screen flex flex-col justify-center items-center">
        <div>
          <h1 className="text-7xl text-white">TaSKiFy</h1>
          <span className="text-white mt-5">
            Management Technology Suite
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[420px]">
          <h1 className="text-2xl text-gray-700 uppercase">
            Let's get you started
          </h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={getAntdFormInputRules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={getAntdFormInputRules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={getAntdFormInputRules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={getAntdFormInputRules}
            >
              <Input type="password" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={buttonLoading}
            >
              {buttonLoading ? "Loading" : "Register"}
            </Button>

            <div className="flex justify-center mt-5">
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
