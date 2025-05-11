import { Form, Input, Button, Tabs } from "antd";
import AccountCreate from "../../layout/AccountCreate";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const CreateAccount = () => {
  const axiosPublic = useAxiosPublic();
  const [formOne] = Form.useForm();
  const [formTwo] = Form.useForm();
  const navigate = useNavigate();

  const onChange = (key) => {
    formOne.resetFields(); // Client form reset
    formTwo.resetFields(); // attorney form reset
  };

  const onFinishOne = async (values) => {
    const createAccountUserInfo = {
      role: "user",
      first_name: values.first_name,
      last_name: values.last_name,
      location: values.location,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    try {
      const res = await axiosPublic.post("/register", createAccountUserInfo);
      console.log(res.data);
      if (res.data.success) {
        Cookies.set("user_role", createAccountUserInfo.role, { expires: 7 });
        toast.success(res.data.message);

        navigate(`/otp-code?verifaction=true`, {
          state: {
            email: values.email,
            registerPage: true,
          },
        });
        formOne.resetFields();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something is wrong. plz try again");
    }
  };

  const onFinishTwo = async (values) => {
    const createAttorneyInfo = {
      role: "lawyer",
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    try {
      const res = await axiosPublic.post("/register", createAttorneyInfo);

      if (res.data.success) {
        Cookies.set("lawyer_role", createAttorneyInfo.role, { expires: 7 });
        toast.success(res.data?.data?.message);
        navigate(`/otp-code?lawyer=true&verifaction=true`, {
          state: {
            email: values.email,
            registerPage: true,
          },
        });
        formTwo.resetFields();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something is wrong plz try again");
    }
  };

  const items = [
    {
      key: "1",
      label: "Client, Looking for an Attorney",
      children: (
        <div className="min-h-[500px]">
          <Form
            form={formOne}
            layout="vertical"
            onFinish={onFinishOne}
            className="space-y-4"
          >
            <div>
              <p>First Name</p>
              <Form.Item
                name="first_name"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input
                  placeholder="Enter your first name"
                  className="w-full border border-gray-400 p-2 rounded-md"
                />
              </Form.Item>
            </div>

            <div>
              <p>Last Name</p>
              <Form.Item
                name="last_name"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input
                  placeholder="Enter your last name"
                  className="w-full border border-gray-400 p-2 rounded-md"
                />
              </Form.Item>
            </div>

            <div>
              <p>Email</p>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Invalid email address" },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-400 p-2 rounded-md"
                />
              </Form.Item>
            </div>

            <div>
              <p>Location</p>
              <Form.Item
                name="location"
                rules={[
                  { required: true, message: "Please enter your location" },
                ]}
              >
                <Input
                  placeholder="Enter your location"
                  className="w-full border border-gray-400 p-2 rounded-md"
                />
              </Form.Item>
            </div>

            <div>
              <p>Create Password</p>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Create your password"
                  className="w-full border border-gray-400 p-2 rounded-md"
                />
              </Form.Item>
            </div>

            <div>
              <p>Confirm Password</p>
              <Form.Item
                name="password_confirmation"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value.length < 8) {
                        return Promise.reject(
                          new Error("Password must be at least 8 characters")
                        );
                      }
                      if (getFieldValue("password") !== value) {
                        return Promise.reject(
                          new Error("Password does not match")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Confirm your password"
                  className="w-full border border-gray-400 p-2 rounded-md"
                />
              </Form.Item>
            </div>

            <Form.Item>
              {/* <Link to={'/otp-code'}> */}
              <Button
                htmlType="submit"
                block
                style={{
                  backgroundColor: "#1b69ad",
                  color: "white",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "24px",
                }}
              >
                Create Account
              </Button>
              {/* </Link> */}
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: "2",
      label: "Create Attorney Profile",
      children: (
        <div className="min-h-[500px]">
          <Form
            form={formTwo}
            layout="vertical"
            onFinish={onFinishTwo}
            className="space-y-4"
          >
            <div>
              <p>First Name</p>
              <Form.Item
                name="first_name"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input
                  placeholder="Enter your first name"
                  className="w-full border border-gray-400 p-2 rounded-md"
                />
              </Form.Item>
            </div>

            <div>
              <p>Last Name</p>
              <Form.Item
                name="last_name"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input
                  placeholder="Enter your last name"
                  className="w-full border border-gray-400 p-2 rounded-md"
                />
              </Form.Item>
            </div>

            <div>
              <p>Email</p>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Invalid email address" },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-400 p-2 rounded-md"
                />
              </Form.Item>
            </div>

            <div>
              <p>Create Password</p>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Create your password"
                  className="w-full border border-gray-400 p-2 rounded-md"
                />
              </Form.Item>
            </div>

            <div>
              <p>Confirm Password</p>
              <Form.Item
                name="password_confirmation"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value.length < 8) {
                        return Promise.reject(
                          new Error("Password must be at least 8 characters")
                        );
                      }
                      if (getFieldValue("password") !== value) {
                        return Promise.reject(
                          new Error("Password does not match")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Confirm your password"
                  className="w-full border border-gray-400 p-2 rounded-md"
                />
              </Form.Item>
            </div>

            <Form.Item>
              {/* <Link to={'/otp-code'}> */}
              <Button
                htmlType="submit"
                block
                style={{
                  backgroundColor: "#1b69ad",
                  color: "white",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "24px",
                }}
              >
                Create Account
              </Button>
              {/* </Link> */}
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <AccountCreate>
      <div className="flex flex-col justify-center items-center  bg-gray-100 px-4 min-h-[65vh]">
        <div className="w-full md:max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Create Your Account
          </h2>
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            className="custom-tabs px-2 overflow-x-auto"
          />
        </div>
        <div className="text-center pt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={handleLogin}
              className="text-blue-600 font-bold cursor-pointer"
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </AccountCreate>
  );
};

export default CreateAccount;
