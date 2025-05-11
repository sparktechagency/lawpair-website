import { Form, Input, Button } from "antd";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";
import Cookies from "js-cookie";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

export const CreateNewPassword = () => {
  const [form] = Form.useForm(); // Form instance
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const onFinish = async (values) => {
    const CreateNewPasswordInfo = {
      password: values.password,
      password_confirmation: values.password_confirmation,
      email,
    };

    try {
      const response = await axiosPublic.post(
        "/reset-password",
        CreateNewPasswordInfo
      );

      console.log(response.data);
      if (response.data.success) {
        toast.success("Password reset successfully");

        navigate("/login");
        form.resetFields();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }

    form.resetFields();
  };

  return (
    <AccountCreate>
      <div className="flex flex-col justify-center items-center h-[calc(100vh-122px)] bg-[#f5f5f7] container mx-auto px-4">
        <div className="w-full md:w-[478px] min-h-[292px] bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
          <h2 className="text-[26px] font-bold font-roboto text-[#10101E]  mb-0 pb-[32px]">
            Create a new password
          </h2>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div>
              <p className="font-roboto">Enter your new password</p>
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
                  type="password"
                  placeholder="Create your new password"
                  style={{ border: "1px solid #B6B6BA", padding: "10px" }}
                />
              </Form.Item>
            </div>

            <div>
              <p className="font-roboto">Re-enter new password</p>
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
                  type="password"
                  placeholder="Re-enter your new password"
                  style={{ border: "1px solid #B6B6BA", padding: "10px" }}
                />
              </Form.Item>
            </div>

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
                Save password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </AccountCreate>
  );
};
