import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Tabs } from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";

import toast from "react-hot-toast";
import Cookies from "js-cookie";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const [clientForm] = Form.useForm(); // Form instance
  const [attorneyForm] = Form.useForm(); // Form instance
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onChange = (key) => {
    clientForm.resetFields(); // Client form reset
    attorneyForm.resetFields(); // Attorney form reset
  };

  const onFinishClient = async (values) => {
    const clientInfo = {
      role: "user",
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axiosPublic.post("/login", clientInfo);
      console.log(response.data);

      if (response.data.success) {
        toast.success("login success");
        Cookies.set("userToken", response?.data?.access_token, {
          expires: 7,
        });
        Cookies.remove("lawyerToken");
        Cookies.remove("user_role");
        navigate(from, { replace: true });
      } else {
        toast.error("login failed");
      }
    } catch (error) {
      toast.error("Login Error. plz try again");
    }

    clientForm.resetFields();
  };

  const onFinishAttorney = async (values) => {
    const attorneyInfo = {
      role: "lawyer",
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axiosPublic.post("/login", attorneyInfo);
      if (response.data.success) {
        toast.success("login success");
        Cookies.set("lawyerToken", response?.data?.access_token, {
          expires: 7,
        });

        console.log(response);
        Cookies.remove("userToken");
        Cookies.remove("lawyer_role");

        navigate(from, { replace: true });
      } else {
        toast.error("login failed");
      }
    } catch (error) {
      toast.error("Login Error. plz try again");
    }
    attorneyForm.resetFields();
  };

  const handleNavigate = (role) => {
    if (role === "lawyer") {
      navigate("/forget-password", { state: { lawyer_role: "lawyer" } });
    } else if (role === "user") {
      navigate("/forget-password", { state: { user_role: "user" } });
    }
  };

  const items = [
    {
      key: "1",
      label: "I’m a client",
      children: (
        <Form form={clientForm} layout="vertical" onFinish={onFinishClient}>
          <div>
            <p className="font-roboto text-[16px]">Email</p>
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
                style={{ border: "1px solid #B6B6BA", padding: "10px" }}
              />
            </Form.Item>
          </div>

          <div>
            <p className="font-roboto text-[16px]">password</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Create your password"
                style={{ border: "1px solid #B6B6BA", padding: "10px" }}
              />
            </Form.Item>
          </div>

          <div className="flex justify-end pb-2 pr-1">
            <h1
              onClick={() => handleNavigate("user")}
              className="text-primary font-bold font-roboto cursor-pointer"
            >
              Forgot password?
            </h1>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full "
              style={{
                backgroundColor: "#1b69ad",
                color: "white",
                fontFamily: "Roboto",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "24px",
              }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      ),
    },

    {
      key: "2",
      label: "I’m an attorney",
      children: (
        <Form form={attorneyForm} layout="vertical" onFinish={onFinishAttorney}>
          <div>
            <p className="font-roboto text-[16px]">Email</p>
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
                style={{ border: "1px solid #B6B6BA", padding: "10px" }}
              />
            </Form.Item>
          </div>

          <div>
            <p className="font-roboto text-[16px]">password</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Create your password"
                style={{ border: "1px solid #B6B6BA", padding: "10px" }}
              />
            </Form.Item>
          </div>

          <div className="flex justify-end pb-2 pr-1">
            <h1
              onClick={() => handleNavigate("lawyer")}
              className="text-primary font-bold font-roboto cursor-pointer"
            >
              Forgot password?
            </h1>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full "
              style={{
                backgroundColor: "#1b69ad",
                color: "white",
                fontFamily: "Roboto",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "24px",
              }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <AccountCreate>
      <div className="flex flex-col justify-center items-center h-[calc(100vh-122px)] bg-[#f5f5f7] container mx-auto px-4 ">
        <div className="w-full md:w-[578px]  bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
          <h2 className="text-[26px] font-bold font-roboto text-[#10101E]  mb-0">
            Log In
          </h2>
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            className="custom-tabs"
          />
        </div>

        <div className="text-center pt-6">
          <p className="text-[14px] font-roboto">
            Don’t have an account?{" "}
            <Link
              to={"/create-account"}
              className="text-primary font-bold font-roboto"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </AccountCreate>
  );
};

export default Login;
