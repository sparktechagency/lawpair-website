import { useEffect, useRef, useState } from "react";
import { Button, Typography, Space, Modal, Select, Form, Input } from "antd";
const { Title } = Typography;
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { PlayCircleOutlined } from "@ant-design/icons";
import { FaPlay } from "react-icons/fa";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { useForm } from "antd/es/form/Form";

const Banner = () => {
  const [FindLawyerForm] = Form.useForm();
  const [categorieForm] = Form.useForm();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [categorieData, setCategorieData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTow, setIsModalOpenTwo] = useState(false);
  const [isModalOpenThree, setIsModalOpenThree] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [secondSelectValue, setSecondSelecteValue] = useState({
    location: null,
    city: null,
  });
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [modalOneValue, setModalOneValue] = useState([]);
  const [lawyerModalOpenTwo, setLawyerModalOpenTwo] = useState(false);
  const [lawyerModalOpenThree, setLawyerModalOpenThree] = useState(false);
  // categorie modal
  const [categorieModalOpen, setCategorieModalOpen] = useState(false);
  const [categorieSecondModalOpen, setCategorieSecondModalOpen] =
    useState(false);
  const [categorieName, setCategorieName] = useState("");
  const [categorieSelectValue, setCategorieSelecteValue] = useState({
    location: null,
    city: null,
  });

  // token get in cookies
  const userToken = Cookies.get("userToken");

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
  //====================== first modal start ==============
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setModalOneValue(selectedOptions);
    if (selectedOptions.length === 0) {
      console.log("No options selected.");
      return;
    }

    if (role === "user") {
      setIsModalOpen(false);
      setSelectedOptions([]);
      setIsModalOpenTwo(true);
    } else {
      setIsModalOpen(false);
      setSelectedOptions([]);
      setLawyerModalOpenTwo(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedOptions("");
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

  // ===== user modal two start ===============
  useEffect(() => {}, [selectedOptions]);

  const onFinishFindLawyer = async (values) => {
    const findLawyerInfo = {
      service_ids: modalOneValue,
      state: values.location,
      // city: values.city, remove this line
    };

    try {
      const response = await axiosPublic.get(`/find-lawyers`, {
        params: {
          service_ids: JSON.stringify(findLawyerInfo.service_ids),
          state: findLawyerInfo.state,
          // city: findLawyerInfo.city, remove this line
        },
        headers: {
          // Move headers inside the same object
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      });

      console.log(response.data);
      if (response.data.success && response.data?.lawyers?.data?.length > 0) {
        navigate("/attorney-tm", {
          state: { lawyers: response.data.lawyers.data },
        });
      } else {
        navigate("/attorney-tm");
      }
    } catch (error) {
      setIsModalOpenTwo(false);
      FindLawyerForm.resetFields("");
      navigate("/attorney-tm");
    }
  };
  const handleOkTwo = async () => {
    FindLawyerForm.submit();
  };

  const handleCancelTwo = () => {
    setIsModalOpenTwo(false);
    setIsModalOpen(true);
  };
  // ===== modal two end =====================

  //=============== categorie first modal start =================

  const onFinishCategorie = async (values) => {
    const findLawyerInfo = {
      service_ids: [categorieName],
      state: values.location,
      // city: values.city, remove this line
    };

    try {
      const response = await axiosPublic.get(`/find-lawyers`, {
        params: {
          service_ids: JSON.stringify(findLawyerInfo.service_ids), // Ensure it's a JSON array
          state: findLawyerInfo.state,
          // city: findLawyerInfo.city, remove this line
        },
      });
      if (response.data.success) {
        navigate("/attorney-tm", {
          state: { lawyers: response.data?.lawyers?.data },
        });
      }
    } catch (error) {
      setCategorieModalOpen(false);
      categorieForm.resetFields("");
      navigate("/attorney-tm");
    }
  };

  const showModalCategorie = () => {
    setCategorieModalOpen(true);
  };

  const handleCategorieOk = async () => {
    categorieForm.submit();
  };

  const handleCancelCategorie = () => {
    setCategorieModalOpen(false);
    categorieForm.resetFields("");
  };

  //=============== categorie first modal end =================
  const role = "user";

  const handleCateogrie = (name) => {
    setCategorieName(name);
  };

  useEffect(() => {
    // Disable scroll when any modal is open
    if (
      isModalOpen ||
      isModalOpenTow ||
      isModalOpenThree ||
      categorieModalOpen ||
      categorieSecondModalOpen ||
      lawyerModalOpenTwo ||
      lawyerModalOpenThree ||
      categorieModalOpen ||
      categorieSecondModalOpen
    ) {
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll when no modal is open
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup function
    };
  }, [
    isModalOpen,
    isModalOpenTow,
    isModalOpenThree,
    lawyerModalOpenTwo,
    lawyerModalOpenThree,
    categorieModalOpen,
    categorieSecondModalOpen,
  ]);

  useEffect(() => {
    if (categorieModalOpen || categorieSecondModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup function
    };
  }, [categorieModalOpen, categorieSecondModalOpen]);

  //=============== video start component  =========
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };
  //=============== video start component  =========

  return (
    <>
      <div className="bg-[url('/bannerBg.png')] bg-cover bg-center bg-no-repeat ">
        <div className="text-center pt-[60px] lg:pt-[193px] ">
          <div className="flex flex-col justify-center items-center pb-6 md:pb-10 pt-20 lg:pt-0">
            {/* <img src="/logo4.png" alt="logo" className="" /> */}
            {/* <img src="/banner/bannerImage1.png" alt="logo" className="lg:w-[70%]" /> */}
            <img
              src="/banner/bannerImage2.png"
              alt="logo"
              className="lg:w-[70%]"
            />
            {/* <img src="/banner/bannerImage3.png" alt="logo" className="lg:w-[70%]" /> */}
            {/* <img src="/banner/bannerImage4.png" alt="logo" className="lg:w-[70%]" /> */}
          </div>

          <Button
            onClick={showModal}
            style={{
              width: "251px",
              height: "64px",
              backgroundColor: "#1b69ad",
              color: "white",
              fontFamily: "Roboto",
              fontSize: "20px",
              fontWeight: "bold",
              borderRadius: "16px",
              border: "0px solid",
            }}
            className="no-hover small-button"
          >
            Find your lawyer
          </Button>

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
              <div
                style={{ maxWidth: "90%", margin: "auto", textAlign: "center" }}
              >
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
                    strokeWidth="2"
                  />
                  <circle cx="20" cy="20" r="5" fill="#1B69AD" />
                  <rect x="36" y="19" width="456" height="2" fill="#B6B6BA" />
                  <circle
                    cx="508"
                    cy="20"
                    r="15"
                    stroke="#B6B6BA"
                    strokeWidth="2"
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

          {/* video start */}
          <div className="flex justify-center py-[20px] md:py-[70px] rounded-2xl px-2 md:px-0">
            <div className="relative w-[710px] rounded-lg overflow-hidden">
              {!isPlaying ? (
                <div className="relative w-full h-full cursor-pointer rounded-2xl">
                  <motion.img
                    src="/thumbail.jpg"
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover rounded-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
                    {/* <PlayCircleOutlined className=" rounded-full text-primary opacity-50 text-[100px]" /> */}
                    <MdOutlinePlayCircleFilled
                      onClick={() => setIsPlaying(true)}
                      className="md:text-[90px] text-[60px] text-gray-400 hover:text-red-600 opacity-60 cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <motion.video
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1], // Smooth & bounce effect
                  }}
                  src="/video01.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-cover rounded-2xl"
                />
              )}
            </div>
          </div>

          {/* video end */}

          {/* modal two */}
          <Modal
            centered
            open={isModalOpenTow}
            onOk={handleOkTwo}
            onCancel={handleCancelTwo}
            width={600}
            footer={
              <div className="flex justify-between items-center gap-x-4 pt-[24px]">
                <button
                  className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                  onClick={handleCancelTwo}
                >
                  Back
                </button>
                <Button
                  className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                  htmlType="submit"
                  onClick={handleOkTwo}
                  style={{ backgroundColor: "#1b69ad", color: "white" }}
                >
                  Continue
                </Button>
              </div>
            }
          >
            <Form form={FindLawyerForm} onFinish={onFinishFindLawyer}>
              <div>
                <svg
                  width="90%"
                  height="40"
                  viewBox="0 0 528 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="20" r="16" fill="#1B69AD" />
                  <path
                    d="M14.167 20.832L17.5003 24.1654L25.8337 15.832"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <rect x="36" y="19" width="456" height="2" fill="#1B69AD" />
                  <circle
                    cx="508"
                    cy="20"
                    r="15"
                    stroke="#1B69AD"
                    stroke-width="2"
                  />
                  <circle cx="508" cy="20" r="5" fill="#1B69AD" />
                </svg>
                <hr />

                <div className="pt-4">
                  <Title
                    level={4}
                    className="text-[14px] font-roboto font-bold text-[#001018]"
                  >
                    Location
                  </Title>
                </div>

                <div className="pb-4">
                  <p className="text-[14px] font-roboto font-bold text-[#001018]">
                    Select your location
                  </p>
                  <Form.Item
                    name="location"
                    rules={[
                      {
                        required: true,
                        message: "Please select location",
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
                        {
                          value: "washington, d.c",
                          label: "Washington, D.C",
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
          </Modal>
        </div>
      </div>

      {/* second part */}
      <div className="container mx-auto px-2 md:px-4 pb-6 md:pb-[36px] lg:pb-[64px]">
        <div className="">
          <div className="max-w-[580px] mx-auto text-center text-wrap pb-[36px] lg:pt-[96px] md:pt-[40px] pt-[30px]">
            <h1 className="text-primary font-roboto font-bold text-[24px] md:text-[32px] textpri">
              Find the Legal Help You Need
            </h1>
            <p className="text-[#60606A] font-poppins font-normal text-[20px] md:text-[24px] pt-[12px] leading-[35px]">
              Finding the right legal support has never been easier. Select up
              to 3 practice areas to find your LawPair Suggested attorney today
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
              {categorieData.slice(0, 9).map((item, index) => {
                return (
                  <div
                    key={index}
                    className="relative cursor-pointer bg-[#E7E7E9] h-full w-full flex flex-col justify-center p-3 rounded-[24px] border border-[#B6B6BA]"
                    onClick={() => (
                      handleCateogrie(item.id), showModalCategorie()
                    )}
                  >
                    <div className="">
                      <img
                        src={item.image_icon}
                        alt="default image"
                        className="pb-[8px] transition-opacity duration-300 ease-in-out h-[50px] aspect-square"
                      />
                      <h4 className="text-[18px] font-semibold md:font-bold font-roboto line-clamp-3 break-words">
                        {item.name.length > 30
                          ? `${item.name.slice(0, 30)}...`
                          : item.name}
                      </h4>

                      <p className="line-clamp-3 break-words">
                        {item.description?.length > 143
                          ? `${item.description.slice(0, 143)}...`
                          : item.description}
                      </p>
                    </div>
                  </div>
                );
              })}

              <Modal
                centered
                open={categorieModalOpen}
                onOk={handleCategorieOk}
                onCancel={handleCancelCategorie}
                width={600}
                footer={
                  <div className="flex justify-between items-center gap-x-4 pt-[24px]">
                    <button
                      className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                      onClick={handleCancelCategorie}
                    >
                      Back
                    </button>
                    <Button
                      className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                      htmlType="submit"
                      onClick={handleCategorieOk}
                      style={{ backgroundColor: "#1b69ad", color: "white" }}
                    >
                      Continue
                    </Button>
                  </div>
                }
              >
                <Form form={categorieForm} onFinish={onFinishCategorie}>
                  <div>
                    <svg
                      className="mb-4"
                      width="90%"
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
                        strokeWidth="2"
                      />
                      <circle cx="20" cy="20" r="5" fill="#1B69AD" />
                      <rect
                        x="36"
                        y="19"
                        width="456"
                        height="2"
                        fill="#B6B6BA"
                      />
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
                        className="text-[14px] font-roboto font-bold text-[#001018]"
                      >
                        Location
                      </Title>
                    </div>

                    <div className="pb-4">
                      <p className="text-[14px] font-roboto font-bold text-[#001018]">
                        Select your location
                      </p>
                      <Form.Item
                        name="location"
                        rules={[
                          {
                            required: true,
                            message: "Please select location",
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
                            {
                              value: "washington, d.c",
                              label: "Washington, D.C",
                            },
                          ]}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
