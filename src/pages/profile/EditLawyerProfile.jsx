import AccountCreate from "../../layout/AccountCreate";
import { useEffect, useMemo, useState } from "react";
import {
  Form,
  Button,
  Typography,
  Space,
  Modal,
  Select,
  TimePicker,
  DatePicker,
  Input,
  Upload,
} from "antd";
const { Title } = Typography;
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import moment from "moment";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { label } from "framer-motion/client";
dayjs.extend(customParseFormat);

const EditLawyerProfile = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categorieData, setCategorieData] = useState([]);
  const [lawyerAllData, setLawyerAllData] = useState({});
  const [ImageFileList, setImageFileList] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);


  // Convert time string to dayjs format
  const parseTime = (timeString) => {
    if (
      !timeString ||
      typeof timeString !== "string" ||
      !timeString.includes(" - ")
    ) {
      return [null, null];
    }
    const [start, end] = timeString.split(" - ").map((time) => time.trim());
    const startTime = dayjs(start, "hh:mm a", true);
    const endTime = dayjs(end, "hh:mm a", true);

    return startTime.isValid() && endTime.isValid()
      ? [startTime, endTime]
      : [null, null];
  };

  // Handle time change
  const handleTimeChange = (day, value) => {
    setScheduleData((prev) =>
      prev.map((item) =>
        item.day === day
          ? {
            ...item,
            time: value
              ? `${value[0]?.format("hh:mm a")} - ${value[1]?.format(
                "hh:mm a"
              )}`
              : "",
          }
          : item
      )
    );
  };


  // lawyer token
  const lawyerToken = Cookies.get("lawyerToken");

  const {
    first_name,
    last_name,
    full_name,
    address,
    city,
    avatar,
    categories,
    email,
    experience,
    languages,
    phone,
    practice_area,
    state,
    zipcode,
    web_link,
    schedule,
    linkedin_url
  } = lawyerAllData || {};

  useEffect(() => {
    if (lawyerAllData) {
      form.setFieldsValue({
        ...lawyerAllData,
        first_name: first_name,
        last_name: last_name,
        full_name: full_name,
        address: address,
        city: city,
        avatar: avatar,
        categories: categories,
        email: email,
        experience: experience,
        languages: languages,
        phone: phone,
        practice_area: practice_area,
        state: state,
        zipcode: zipcode,
        web_link: web_link,
        linkedin_url: linkedin_url,
        day: lawyerAllData.schedule?.day,
        startTime: lawyerAllData.schedule?.startTime,
        endTime: lawyerAllData.schedule?.endTime,
      });
      if (lawyerAllData.avatar) {
        setImageFileList([
          {
            uid: "-1",
            name: "Existing Image",
            status: "done",
            url: lawyerAllData.avatar,
          },
        ]);
      }
    }
  }, [lawyerAllData, form]);

  const filteredCategories = categorieData.filter((category) =>
    categories?.includes(category.name)
  );



  // Handle select change
  const handleSelect = (value) => {
    // if (value.length <= 3) {
    //   setSelectedOptions(value); // update selected values if it's 3 or fewer
    // } else {
    //   toast.error("You can select a maximum of 3 options");
    // }
    setSelectedOptions(value);
  };

  // lawyer all value get
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axiosPublic.get("/lawyer/profile", {
          headers: {
            Authorization: `Bearer ${lawyerToken}`,
            Accept: "application/json",
            // ✅ Send token in Authorization header
          },
        });

        setSelectedOptions(JSON.parse(response?.data?.lawyer?.category_ids));
        setScheduleData(response?.data?.lawyer?.schedule);
        setLawyerAllData(response?.data?.lawyer);
        setAllCategories(response?.data?.lawyer?.categories || []);
        // setStartTime(dayjs(response?.data?.lawyer?.schedule?.time, "HH:mm:ss"));
        // setEndTime(dayjs(response?.data?.lawyer?.schedule?.time, "HH:mm:ss"));
        // setScheduleData(response?.data?.lawyer?.schedule || []);
      } catch (error) {
        console.error("Failed to load data:");
      }
    };

    fetchAllData();
  }, []);

  // first modal option get server
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



  const onFinish = async (values) => {
    const service_ids = selectedOptions;
    // const formattedSchedule = scheduleData?.map((item) => ({
    //   day: item.day,
    //   time: item.time ? item.time : "",
    // }));

    const formData = new FormData();
    formData.append("service_ids", JSON.stringify(service_ids));
    formData.append("practice_area", values.practice_area);
    formData.append("id_number", values.id_number);
    formData.append("languages", values.languages);
    if (ImageFileList[0]?.originFileObj) {
      formData.append("avatar", ImageFileList[0].originFileObj);
    }
    formData.append("state", values.state);
    formData.append("zipcode", values.zipcode);
    formData.append("address", values.address);
    formData.append("city", values.city);
    formData.append("phone", values.phone);

    formData.append("web_link", values.web_link);
    formData.append("linkedin_url", values.linkedin_url);
    // formData.append("schedule", JSON.stringify(formattedSchedule));
    console.log(formData.forEach(item => {
      console.log(item)
    }))

    try {
      const response = await axiosPublic.post(
        "/lawyer/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${lawyerToken}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            // "Accept": "application/json"
          },
        }
      );

      console.log(response.data);
      if (response.data.success) {
        toast.success("Profile Update successfully");
        navigate("/lawyer-profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };



  return (
    <div className="">
      <AccountCreate>
        <div className="container mx-auto px-4 border rounded-md  p-4 ">
          <h1 className="font-roboto font-bold text-center text-2xl uppercase text-primary">
            Edit Lawyer Profile{" "}
          </h1>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div>
              <Space
                style={{ width: "100%", height: "40px" }}
                direction="vertical"
              >
                <Select
                  style={{ width: "100%", height: "40px" }}
                  mode="multiple"
                  allowClear
                  placeholder="Please select"
                  maxTagCount={9}
                  value={selectedOptions}
                  onChange={handleSelect}
                  options={categorieData?.map(item => {
                    return {
                      label: item?.name,
                      value: item?.id
                    }
                  })}
                />
              </Space>
            </div>

            <div className="mt-8">
              <div className="pb-4">
                <p className="text-[14px] font-roboto font-bold text-[#001018]">
                  Where do you practice
                </p>
                <Form.Item name="practice_area">
                  <Input
                    placeholder="e.g.: New Jersey, New York, EOIR (Immigration Court)"
                    style={{ width: "100%", height: "40px" }}
                  />
                </Form.Item>
              </div>
              <div className="pb-4">
                <p className="text-[14px] font-roboto font-bold text-[#001018]">
                  ID Number
                </p>
                <Form.Item name="id_number">
                  <Input
                    placeholder="Enter your Id number"
                    style={{ width: "100%", height: "40px" }}
                  />
                </Form.Item>
              </div>
              {/* 
              <div className="pb-4">
                <p className="text-[14px] font-roboto font-bold text-[#001018]">
                  Experience
                </p>
                <Form.Item name="experience">
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

              <div className="pb-4 w-full">
                <p className="text-[14px] font-roboto font-bold text-[#001018]">
                  Language
                </p>
                <Form.Item name="languages">
                  <Select
                    showSearch
                    placeholder="Select..."
                    style={{ width: "100%", height: "40px" }}
                    options={[
                      { label: "English", value: "english" },
                      { label: "Spanish", value: "spanish" },
                      { label: "German", value: "german" },
                      { label: "Russian", value: "russian" },
                    ]}
                  />
                </Form.Item>
              </div>

              <div className="pb-4 w-full">
                <p className="text-[14px] font-roboto font-bold text-[#001018]">
                  Upload profile photo
                </p>
                <div className="w-full ">
                  <Form.Item
                    className="md:col-span-2"
                    name="image"
                    rules={[
                      {
                        required: ImageFileList?.length === 0,
                        message: "Image required",
                      },
                    ]}
                  >
                    <Upload
                      beforeUpload={false}
                      accept="image/*"
                      maxCount={1}
                      showUploadList={{ showPreviewIcon: true }}
                      fileList={ImageFileList}
                      onChange={({ fileList }) => setImageFileList(fileList)}
                      listType="picture-card"
                    >
                      <div className="flex flex-col items-center">
                        <UploadCloud className="w-5 h-5 text-gray-400" />
                        <span className="mt-2">Choose File</span>
                      </div>
                    </Upload>
                  </Form.Item>
                </div>
              </div>

              <div className="pb-4 w-full">
                <p className="text-[14px] font-roboto font-bold text-[#001018]">
                  State
                </p>
                <Form.Item name="state">
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

              <div className="pb-4">
                <p className="text-[14px] font-roboto font-bold text-[#001018]">
                  Office address
                </p>
                <Form.Item name="address">
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
                <Form.Item name="city">
                  <Input
                    placeholder="city"
                    style={{ width: "100%", height: "40px" }}
                  />
                </Form.Item>
              </div>

              <div className="pb-4">
                <p className="text-[14px] font-roboto font-bold text-[#001018]">
                  Mobile number
                </p>
                <Form.Item name="phone">
                  <Input
                    placeholder="Enter your contact number to reach client"
                    style={{ width: "100%", height: "40px" }}
                  />
                </Form.Item>
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
                    {scheduleData?.length > 0 &&
                      scheduleData.map((item) => (
                        <div
                          key={item.day}
                          className="flex items-center justify-between gap-3"
                        >
                          <div>
                            <p className="text-primary font-semibold">
                              {item.day}
                            </p>
                          </div>
                          <div>
                            <TimePicker.RangePicker
                              value={parseTime(item.time)}
                              onChange={(value) =>
                                handleTimeChange(item.day, value)
                              }
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div> */}
            </div>

            <Button
              block
              htmlType="submit"
              style={{
                backgroundColor: "#1b69ad",
                fontFamily: "Roboto",
                fontWeight: "bold",
                fontSize: "16px",
                color: "white",
                padding: "20px 0px",
              }}
            >
              Update Profile
            </Button>
          </Form>
        </div>
      </AccountCreate>
    </div>
  );
};

export default EditLawyerProfile;
