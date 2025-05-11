import { useState, useRef } from "react";
import { Button, Form, Input, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Cookies from "js-cookie";

const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <Space>
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          maxLength={1}
          style={{ width: 60, height: 60, textAlign: "center" }}
        />
      ))}
    </Space>
  );
};

const DashboardForgetPassword = () => {
  const [form] = Form.useForm(); // Form instance
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState(0);

  const handleOtpComplete = (otp) => {
    setOtpValue(otp);
  };

  const handleVerify = async () => {
    try {
      const response = await axiosPublic.post("/verify-email", {
        otp: parseInt(otpValue),
      });
      console.log(response.data);
      if (response.data.success && response.data.access_token) {
        Cookies.set("otpToken", response?.data?.access_token, {
          expires: 7,
        });

        toast.success("OTP send successfully.");
        navigate("/admin/dashboard/create-new-password");
        form.resetFields();
      } else {
        toast.error("Failed to send OTP. Try again.");
      }
    } catch (error) {
      toast.error("Error sending OTP. Please try again.");
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

          <div className="flex flex-col justify-center items-center pb-10 md:pb-[78px]">
            <h1 className="font-roboto text-[#121221] font-semibold text-[20px] md:text-[36px] pt-[40px] pb-[20px]">
              OTP Verification
            </h1>
            <p className="font-roboto text-[18px] text-[#929299]">
              We have sent a verification code to william***@gmail.com
            </p>
          </div>
        </div>

        <Form>
          <div className="pb-10 flex justify-center">
            <OTPInput length={6} onComplete={handleOtpComplete} />
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              className="w-full"
              style={{
                backgroundColor: "#1b69ad",
                color: "white",
                fontFamily: "Roboto",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "24px",
              }}
              onClick={handleVerify}
            >
              Verify
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DashboardForgetPassword;
