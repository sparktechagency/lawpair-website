import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const DashboardLogin = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [form] = useForm();

  const onFinish = async (values) => {
    const loginInfo = {
      role: "admin",
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axiosPublic.post("/login", loginInfo);
      if (response.data.success) {
        Cookies.set("adminToken", response?.data?.access_token, { expires: 7 });
        toast.success("login success");
        navigate("/admin/dashboard");
      } else {
        toast.error("login failed");
      }
    } catch (error) {
      toast.error("Login Error. plz try again");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#faffff]">
      <div className="max-w-[684px] bg-[#FFFFFF] p-10 lg:px-20 py-8">
        <div className="flex flex-col justify-center">
          <img
            src="/logo.png"
            alt="logo"
            className="w-[183px] h-[56px] mx-auto border"
          />

          <div className="flex flex-col justify-center items-center pb-10">
            <h1 className="font-roboto text-[#121221] font-semibold text-[20px] md:text-[36px] pt-[40px] pb-[20px]">
              Welcome back!
            </h1>
            <p className="font-roboto text-[18px] text-[#929299] max-w-[341px]">
              Please enter email & password to continue
            </p>
          </div>
        </div>

        <Form form={form} onFinish={onFinish} className="">
          <div>
            <p className="font-roboto font-bold text-[#121221] text-[16px]">
              Email
            </p>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Invalid email address" },
              ]}
            >
              <Input
                placeholder="Enter your email"
                className="w-full border border-gray-400 p-2 rounded-md"
              />
            </Form.Item>
          </div>

          <div>
            <p className="font-roboto font-bold text-[#121221] text-[16px]">
              password
            </p>
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
                placeholder="Enter your password"
                style={{ border: "1px solid #B6B6BA", padding: "10px" }}
              />
            </Form.Item>
          </div>

          <div className="flex justify-between items-center pb-2 pr-1">
            <Checkbox className="font-bold font-roboto">
              Remember password
            </Checkbox>
            <Link to={"/admin/dashboard/forget-password"}>
              <h1 className="text-primary font-bold font-roboto">
                Forgot password?
              </h1>
            </Link>
          </div>

          {/* Submit Button */}
          <Form.Item>
            {/* <Link to={'/admin/dashboard'}> */}
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
            {/* </Link> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DashboardLogin;
