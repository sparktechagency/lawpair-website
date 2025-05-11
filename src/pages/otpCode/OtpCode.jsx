import {
  Form,
  Input,
  Button,
  Modal,
  Space,
  Select,
  Upload,
  TimePicker,
  message,
} from "antd";
import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Title from "antd/es/skeleton/Title";
import { UploadOutlined } from "@ant-design/icons";

const OtpCode = () => {
  const axiosPublic = useAxiosPublic();
  const [form] = Form.useForm();
  const [formTwo] = Form.useForm();
  const [formThree] = Form.useForm();

  console.log('form three',formThree)
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const email = location?.state?.email;
  const loginPage_forget = location?.state?.loginPage_forget;
  const registerPage = location?.state?.registerPage;
  const forget_user = location.state.user_role;
  const forget_lawyer = location.state.lawyer_role;
  const navigate = useNavigate();

  const [search] = useSearchParams();

  const verification = search.get("verifaction");
  const forget = search.get("forgot");
  const lawyar = search.get("lawyer");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [issModalOpenThree, setIsModalOpenThree] = useState(false);

  const [categorieData, setCategorieData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [modalOneValue, setModalOneValue] = useState([]);
  const [modalTwoValue, setModalTwoValue] = useState({});

  // modal three
  const [fileList, setFileList] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    saturday: "",
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
  });

  const handleTimeChange = (day, value) => {
    setScheduleData((prevSchedule) => ({
      ...prevSchedule,
      [day]: value,
    }));
  };

  const lawyerToken = Cookies.get("lawyerToken");
  const userToken = Cookies.get("userToken");
  const user_role = Cookies.get("user_role");
  const lawyer_role = Cookies.get("lawyer_role");

  console.log(lawyer_role);

  // Otp code
  const onFinish = async (values) => {
    const otpCode = {
      otp: values.otp,
    };

    try {
      const response = await axiosPublic.post("/verify-email", otpCode);
      if (response.data.success) {
        if (verification) {
          if (!lawyar) {
            Cookies.set("userToken", response?.data?.access_token, {
              expires: 7,
            });
            navigate("/");
          } else if (lawyar) {
            Cookies.set("lawyerToken", response?.data?.access_token, {
              expires: 7,
            });
            setIsModalOpen(true);
          }
        } else {
          navigate(`/create-new-password?email=${email}`);
        }

        form.resetFields();
      } else {
        toast.error("Otp send request failed");
      }
    } catch (error) {
      toast.error("Wrong otp. please try again");
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await axiosPublic.post("/resent-otp", { email });
      if (response.data.success) {
        toast.success("OTP has been resent successfully.");
      } else {
        toast.error("Failed to resend OTP. Try again.");
      }
    } catch (error) {
      toast.error("Error sending OTP. Please try again.");
    }

    setLoading(false);
  };

  // categorie name gat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(`/admin/categories?per_page=10`);
        setCategorieData(response?.data?.categories.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle File Upload
  const handleChange = ({ file, fileList }) => {
    // Ensure we store the file with originFileObj
    setFileList(
      fileList.map((file) => ({
        ...file,
        originFileObj: file.originFileObj || file,
      }))
    );
  };

  //====================== first modal start ==============

  const handleOk = async () => {
    setModalOneValue(selectedOptions);

    setIsModalOpen(false);
    setIsModalOpenTwo(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedOptions("");
    navigate("/create-account");
  };

  const handleSelect = (option) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option.id)) {
        return prev.filter((item) => item !== option.id);
      } else if (prev.length < 3) {
        return [...prev, option.id];
      } else {
        return prev;
      }
    });
  };

  //====================== first modal end =================

  //====================== second modal start =================

  const handleOkLowyerTwo = async () => {
    formTwo.submit();
    const isValid = await formTwo.validateFields();

    if (isValid) {
      formTwo.submit();
      setIsModalOpenThree(true);
      setIsModalOpenTwo(false);
    }
    // setIsModalOpenThree(true)
    // setIsModalOpenTwo(false)
  };

  const onFinishModalTwo = (values) => {
    setModalTwoValue(values);
  };

  const handleCancelLowyerTwo = () => {
    setIsModalOpenTwo(false);
    setIsModalOpen(true);
  };
  //====================== second modal end = =================

  // ===================== three modal start ===================
  const handleOkLowyerThree = () => {
    formThree.submit();
  };

  // formThree.forEach(i=>console.log(i))

  const onFinishModalThree = async (values) => {
    // const formattedSchedule = Object.keys(scheduleData).map((day) => ({
    //   day: day,
    //   time: scheduleData[day]
    //     ? `${scheduleData[day][0].format("hh:mm a")} - ${scheduleData[
    //         day
    //       ][1].format("hh:mm a")}`
    //     : "",
    // }));

    const formData = new FormData();
    formData.append("service_ids", JSON.stringify(modalOneValue));
    formData.append("practice_area", modalTwoValue.practice_area);
    formData.append("id_number", modalTwoValue.id_number);
    // formData.append("experience", modalTwoValue.experience);
    formData.append("languages", modalTwoValue.languages);
    if (fileList && fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj);
    }
    formData.append("state", modalTwoValue.state);
    formData.append("zipcode", modalTwoValue.zipcode);
    formData.append("address", modalTwoValue.address);
    formData.append("city", modalTwoValue.city);
    formData.append("phone", modalTwoValue.phone);

    formData.append("web_link", values?.web_link);
    formData.append("linkedin_url", values?.linkedin_url);
    // formData.append("schedule", JSON.stringify(formattedSchedule));

    formData.forEach((value, key) => {
        console.log(key, value);
    });

    try {
      const response = await axiosPublic.post(
        "/lawyer/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${lawyerToken}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        toast.success("Profile create successfully");
        navigate("/lawyer-profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleCancelLowyerThree = () => {
    setIsModalOpenThree(false);
    setIsModalOpenTwo(true);
  };

  // ===================== three modal end  ====================

  useEffect(() => {
    // Disable scroll when any modal is open
    if (isModalOpen || issModalOpenTwo || issModalOpenThree) {
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll when no modal is open
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup function
    };
  }, [isModalOpen, issModalOpenTwo, issModalOpenThree]);

  return (
    <AccountCreate>
      <div className="flex flex-col justify-center items-center bg-[#f5f5f7] h-[calc(100vh-122px)] container mx-auto px-4">
        <div className="w-full md:w-[478px] min-h-[292px] bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
          <h2 className="text-[26px] font-bold font-roboto text-[#10101E]  mb-0">
            We’ve sent you an OTP to
          </h2>
          <p className="font-roboto text-[#121221] text-[16px] pb-[32px]">
            {email || "immi@gmail.com"}
          </p>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div>
              <p className="font-roboto">OTP code</p>
              <Form.Item
                name="otp"
                rules={[
                  { required: true, message: "Please Enter your OTP" },
                  { pattern: /^[0-9]{4,6}$/, message: "Invalid OTP format" }, // ✅ Ensures 4-6 digit number
                ]}
              >
                <Input
                  type="text" // ✅ Use "text" instead of "number" to avoid auto-correction issues
                  maxLength={6} // ✅ Limits OTP to 6 digits
                  placeholder="Enter your OTP"
                  style={{ border: "1px solid #B6B6BA", padding: "10px" }}
                />
              </Form.Item>
            </div>

            {/* submit button */}
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
                Submit OTP
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="text-center pt-8">
          <p className="text-[14px] font-roboto">
            Didn’t get OTP yet?{" "}
            <span
              onClick={handleResendOtp}
              className="text-primary font-bold font-roboto cursor-pointer"
            >
              Resend
            </span>
          </p>
        </div>
      </div>

      {/* =========================  modal start ====================== */}
      {/* modal one */}
      <Modal
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={
          <div className="font-roboto flex justify-center md:justify-between items-center gap-x-4 md:px-7 pt-[24px]">
            <button
              className="w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] rounded-[5px] text-[16px] font-bold ${
                selectedOptions.length > 0
                  ? "bg-[#1b69ad] text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              onClick={handleOk}
              disabled={selectedOptions.length === 0}
            >
              Continue
            </button>
          </div>
        }
      >
        <div>
          <div style={{ maxWidth: "90%", margin: "auto", textAlign: "center" }}>
            <svg
              className="mb-4 w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%]"
              width="100%"
              height="40"
              viewBox="0 0 528 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="15"
                stroke="#1B69AD"
                stroke-width="2"
              />
              <circle cx="20" cy="20" r="5" fill="#1B69AD" />
              <rect x="36" y="19" width="212" height="2" fill="#B6B6BA" />
              <circle
                cx="264"
                cy="20"
                r="15"
                stroke="#B6B6BA"
                stroke-width="2"
              />
              <rect x="280" y="19" width="212" height="2" fill="#B6B6BA" />
              <circle
                cx="508"
                cy="20"
                r="15"
                stroke="#B6B6BA"
                stroke-width="2"
              />
            </svg>

            <Title
              level={4}
              className="text-[#000000] font-roboto text-start pb-[8px]"
            >
              Select the legal help you need
            </Title>

            <Space wrap>
              {categorieData.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleSelect(option)}
                  disabled={
                    selectedOptions.length === 3 &&
                    !selectedOptions.includes(option.id)
                  }
                  style={{
                    borderRadius: 20,
                    backgroundColor: selectedOptions.includes(option.id)
                      ? "#1b69ad"
                      : "#FFFFFF",
                    color: selectedOptions.includes(option.id)
                      ? "#FFFFFF"
                      : "#1b69ad",
                    border: "1px solid #B6B6BA",
                    fontWeight: "bold",
                    fontSize: "16px",
                    fontFamily: "Roboto",
                    padding: "20px",
                    cursor:
                      selectedOptions.length === 3 &&
                      !selectedOptions.includes(option.id)
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      selectedOptions.length === 3 &&
                      !selectedOptions.includes(option.id)
                        ? 0.5
                        : 1,
                  }}
                >
                  {option.name}
                </Button>
              ))}
            </Space>
          </div>
        </div>
      </Modal>

      {/* ========================= modal tow start ==================== */}
      <Form form={formTwo} onFinish={onFinishModalTwo}>
        <Modal
          centered
          open={issModalOpenTwo}
          onOk={handleOkLowyerTwo}
          onCancel={handleCancelLowyerTwo}
          width={600}
          footer={
            <div className="flex justify-between items-center gap-x-4 pt-[24px]">
              <button
                className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                onClick={handleCancelLowyerTwo}
              >
                Back
              </button>
              <Button
                className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                htmlType="submit"
                onClick={handleOkLowyerTwo}
                style={{ backgroundColor: "#1b69ad", color: "white" }}
                onMouseEnter={(e) => e.preventDefault()}
              >
                Continue
              </Button>
            </div>
          }
        >
          <div>
            <svg
              className="mb-4 w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%]"
              width="40"
              height="40"
              viewBox="0 0 528 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="16" fill="#1B69AD" />
              <path
                d="M14.167 20.8335L17.5003 24.1668L25.8337 15.8335"
                stroke="white"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect x="36" y="19" width="212" height="2" fill="#1B69AD" />
              <circle
                cx="264"
                cy="20"
                r="15"
                stroke="#1B69AD"
                strokeWidth="2"
              />
              <circle cx="264" cy="20" r="5" fill="#1B69AD" />
              <rect x="280" y="19" width="212" height="2" fill="#B6B6BA" />
              <circle
                cx="508"
                cy="20"
                r="15"
                stroke="#B6B6BA"
                strokeWidth="2"
              />
            </svg>

            <hr />

            <div className="pt-4">
              <Title
                level={4}
                className="text-[#000000] font-roboto text-start pb-[8px]"
              >
                Add your professional details
              </Title>
            </div>
            <div className="pb-4">
              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                Where do you practice
              </p>
              <Form.Item
                name="practice_area"
                rules={[
                  {
                    required: true,
                    message: "Please input your practice",
                  },
                ]}
              >
                <Input
                  placeholder="e.g.: New Jersey, New York, EOIR (Immigration Court)"
                  style={{ width: "100%", height: "40px" }}
                />
              </Form.Item>
            </div>
            <div className="pb-4">
              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                Id Number
              </p>
              <Form.Item
                name="id_number"
                rules={[
                  {
                    required: true,
                    message: "Please input your id_number",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your id number"
                  style={{ width: "100%", height: "40px" }}
                />
              </Form.Item>
            </div>

            {/* <div className="pb-4">
              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                Experience
              </p>
              <Form.Item
                name="experience"
                rules={[
                  {
                    required: true,
                    message: "Please select your experience",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select..."
                  style={{ width: "100%", height: "40px" }}
                  options={[
                    { label: "1-3 Years", value: "1-3 Years" },
                    { label: "4-7 Years", value: "4-7 Years" },
                    { label: "8+ Years", value: "8+ Years" },
                  ]}
                />
              </Form.Item>
            </div> */}

            <div className="pb-4">
              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                Languages
              </p>
              <Form.Item
                name="languages"
                rules={[
                  {
                    required: true,
                    message: "Please select your language",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select..."
                  style={{ width: "100%", height: "40px" }}
                  options={[
                    { label: "English", value: "English" },
                    { label: "Spanish", value: "Spanish" },
                    { label: "German", value: "German" },
                    { label: "Russian", value: "Russian" },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="pb-4">
              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                Phone
              </p>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits long",
                  },
                ]}
              >
                <Input
                  maxLength={10}
                  onInput={(e) => {
                    // Only allow numeric input
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  placeholder="phone"
                  style={{ width: "100%", height: "40px" }}
                />
              </Form.Item>
            </div>
            <div className="pb-4">
              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                Office address
              </p>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address",
                  },
                ]}
              >
                <Input
                  placeholder="address"
                  style={{ width: "100%", height: "40px" }}
                />
              </Form.Item>
            </div>

            <div className="pb-4">
              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                City
              </p>
              <Form.Item
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please input your city",
                  },
                ]}
              >
                <Input
                  placeholder="city"
                  style={{ width: "100%", height: "40px" }}
                />
              </Form.Item>
            </div>

            <div className="flex justify-between gap-2">
              <div className="pb-4 w-full">
                <p className="text-[14px] font-roboto font-bold text-[#001018]">
                  State
                </p>
                <Form.Item
                  name="state"
                  rules={[
                    {
                      required: true,
                      message: "Please select your state",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select..."
                    style={{ width: "100%", height: "40px" }}
                    options={[
                      { value: "new jersey", label: "New Jersey" },
                      { value: "new york", label: "New York" },
                      { value: "pennsylvania", label: "Pennsylvania" },
                      { value: "washington, d.c", label: "Washington, D.C" },
                    ]}
                  />
                </Form.Item>
              </div>

              <div className="pb-4 w-full">
                <p className="text-[14px] font-roboto font-bold text-[#001018]">
                  Zip code
                </p>
                <Form.Item
                  name="zipcode"
                  rules={[
                    {
                      required: true,
                      message: "Please input your zip code",
                    },
                    {
                      pattern: /^[0-9]{4,5}$/,
                      message: "Zip code must be 4 or 5 digits long",
                    },
                  ]}
                >
                  <Input
                    maxLength={5}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 5);
                    }}
                    placeholder="Zip Code"
                    style={{ width: "100%", height: "40px" }}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </Modal>
      </Form>

      {/* ======================= modal three start ===================== */}
      <Form form={formThree} onFinish={onFinishModalThree}>
        <Modal
          centered
          open={issModalOpenThree}
          onOk={handleOkLowyerThree}
          onCancel={handleCancelLowyerThree}
          width={600}
          footer={
            <div className="flex justify-between items-center gap-x-4 pt-[24px]">
              <button
                className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                onClick={handleCancelLowyerThree}
              >
                Back
              </button>
              <Button
                className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                htmlType="submit"
                onClick={handleOkLowyerThree}
                style={{ backgroundColor: "#1b69ad", color: "white" }}
              >
                Continue
              </Button>
            </div>
          }
        >
          <div>
            <svg
              className="mb-4 w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%]"
              width="528"
              height="40"
              viewBox="0 0 528 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="16" fill="#1B69AD" />
              <path
                d="M14.1665 20.8335L17.4998 24.1668L25.8332 15.8335"
                stroke="white"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect x="36" y="19" width="212" height="2" fill="#1B69AD" />
              <circle cx="264" cy="20" r="16" fill="#1B69AD" />
              <path
                d="M258.167 20.8335L261.5 24.1668L269.833 15.8335"
                stroke="white"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect x="280" y="19" width="212" height="2" fill="#1B69AD" />
              <circle
                cx="508"
                cy="20"
                r="15"
                stroke="#1B69AD"
                strokeWidth="2"
              />
              <circle cx="508" cy="20" r="5" fill="#1B69AD" />
            </svg>

            <hr />

            <div className="pt-4">
              <Title
                level={4}
                className="text-[#000000] font-roboto text-start pb-[8px]"
              >
                Add your profile photo and availability
              </Title>
            </div>

            <div className="pb-4 w-full">
              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                Upload profile photo
              </p>
              <div className="w-full">
                <Form.Item
                  name="avatar"
                  rules={[
                    {
                      required: true,
                      message: "Please upload your  photo",
                    },
                  ]}
                >
                  <Upload
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={() => false}
                    style={{ width: "100%", height: "40px" }}
                    className="upload-component"
                  >
                    {fileList.length >= 1 ? null : (
                      <Button
                        icon={<UploadOutlined />}
                        style={{ width: "100%", height: "40px" }}
                      >
                        Upload Image
                      </Button>
                    )}
                  </Upload>
                </Form.Item>
              </div>
            </div>

            <div className="pb-4">
              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                Website link (optional)
              </p>
              <Form.Item name="web_link">
                <Input
                  placeholder="Include a link to your website here"
                  style={{ width: "100%", height: "40px" }}
                />
              </Form.Item>
            </div>

            <div className="pb-4">
              <p className="text-[14px] font-roboto font-bold text-[#001018]">
               Linkedin Profile link
              </p>
              <Form.Item name="linkedin_url">
                <Input
                  placeholder="Enter your linkedin Profile link"
                  style={{ width: "100%", height: "40px" }}
                />
              </Form.Item>
            </div>

            {/* <div className="pb-4">
              <div className="flex flex-col justify-between items-center gap-6 pb-4">
                <div className="border p-4 w-full rounded-lg space-y-3">
                  {Object.keys(scheduleData).map((day) => (
                    <div
                      key={day}
                      className="flex items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-primary font-semibold">{day}</p>
                      </div>
                      <div>
                        <TimePicker.RangePicker
                          value={
                            scheduleData[day]
                              ? [scheduleData[day][0], scheduleData[day][1]]
                              : []
                          }
                          onChange={(value) => handleTimeChange(day, value)}
                          format="hh:mm A"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </Modal>
      </Form>
    </AccountCreate>
  );
};

export default OtpCode;
