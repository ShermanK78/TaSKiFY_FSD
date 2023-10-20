import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetButtonLoading } from "../../redux/loadersSlice";
import { getAntdFormInputRules } from "../../utils/helpers";


const Login = () => {
  // Access buttonLoading state from Redux
  const { buttonLoading } = useSelector((state) => state.loaders);
  const dispatch = useDispatch();

  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      // Dispatch a loading action
      dispatch(SetButtonLoading(true));
      // Make an API call to log in the user
      const response = await LoginUser(values);
      // Dispatch a loading action to indicate the request has completed
      dispatch(SetButtonLoading(false));

      if (response.success) {
        // If login is successful, store the token and redirect to the home page
        localStorage.setItem("token", response.data);
        message.success(response.message);
        window.location.href = "/";
      } else {
        // If there's an error, display an error message
        throw new Error(response.message);
      }
    } catch (error) {
      // Handle errors by displaying an error message
      dispatch(SetButtonLoading(false));
      message.error(error.message);
    }
  };

  // useEffect to check if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="grid grid-cols-2">
      <div className="bg-primary h-screen flex flex-col justify-center items-center">
        <div>
          <h1 className="text-7xl text-white">TaSKiFy</h1>
          <span className="text-white mt-5">Management Technology Suite</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[420px]">
          <h1 className="text-2xl text-gray-700">LOGIN TO YOUR ACCOUNT</h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinish}>
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

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={buttonLoading}>
                {buttonLoading ? "Loading" : "Login"}
              </Button>
            </Form.Item>

            <Form.Item>
              <div className="flex justify-center mt-5">
                <span>
                  Don't have an account? <Link to="/register">Register</Link>
                </span>
              </div>
            </Form.Item>
          </Form>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
