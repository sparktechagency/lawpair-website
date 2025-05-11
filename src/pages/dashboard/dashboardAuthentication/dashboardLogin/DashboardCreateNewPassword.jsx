import { Form, Input, Button } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const DashboardCreateNewPassword = () => {
  const [form] = Form.useForm(); // Form instance
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()


  const token = Cookies.get("otpToken");
  const onFinish = async (values) => {
    const newPasswordInfo = {
      password: values.password,
      password_confirmation: values.password_confirmation
    }

    try {
      const response = await axiosPublic.post('/reset-password', newPasswordInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept": "application/json"
        }
      })
      console.log(response.data)
      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/admin/dashboard/congratulation')
        form.resetFields();
      } else {
        toast.error('Failed. please try again')
      }
    }
    catch (error) {
      console.log('Filed.....')
    }

  };


  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#faffff]">
      <div className="max-w-[684px] bg-[#FFFFFF] p-10 lg:px-20 py-8">
        <div className="flex flex-col justify-center">
          <img src="/logo.png" alt="logo" className="w-[183px] h-[56px] mx-auto border" />

          <div className="flex flex-col justify-center items-center pb-10">
            <h1 className="font-roboto text-[#121221] font-semibold text-[20px] md:text-[36px] pt-[40px] pb-[20px]">Create new password</h1>
            {/* <p className="font-roboto text-[18px] text-[#929299] ">We will sent a verification code to william***@gmail.com</p> */}
          </div>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div>
            <p className="font-roboto">New Password</p>
            <Form.Item name="password" rules={[
              { required: true, message: "Please input your password" },
              { min: 8, message: "Password must be at least 8 characters" }
            ]}
              hasFeedback
            >
              <Input.Password placeholder="Create your new password" className="w-full border border-gray-400 p-2 rounded-md" />
            </Form.Item>
          </div>

          <div>
            <p className="font-roboto">Confirm Password</p>
            <Form.Item name="password_confirmation"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please input your confirm password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value.length < 8) {
                      return Promise.reject(new Error("Password must be at least 8 characters"));
                    }
                    if (getFieldValue("password") !== value) {
                      return Promise.reject(new Error("Password does not match"));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Re-enter your new password" className="w-full border border-gray-400 p-2 rounded-md" />
            </Form.Item>
          </div>


          <Form.Item>

            <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
              Done
            </Button>

          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default DashboardCreateNewPassword