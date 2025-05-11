import { Link, useNavigate } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";
import { FaEdit } from "react-icons/fa";
import { Button, Form, Input, Modal, Pagination, Upload } from "antd";
import { useCallback, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { UploadOutlined } from "@ant-design/icons";
import defalutAvater from "/attorney1.png";
import LoadindSpenier from "../../components/shared/LoadindSpenier";
import { UploadCloud } from "lucide-react";
import CustomNotFound from "../../components/shared/CustomNotFound";
import { FiArrowLeft } from "react-icons/fi";

const UserProfile = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [favoriteData, setFavoriteData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ImageFileList, setImageFileList] = useState([]);
  const [modalValues, setModalValues] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  console.log(userData)


  const { address, avatar, email, first_name, last_name, full_name, phone } =
    userData || {};

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        ...userData,
        first_name: userData.first_name,
        last_name: userData.last_name,
        full_name: userData.full_name,
        phone: userData.phone,
        email: userData.email,
        address: userData.address,
        avatar: userData.avatar,
      });
      if (userData.avatar) {
        setImageFileList([
          {
            uid: "-1",
            name: "Existing Image",
            status: "done",
            url: userData.avatar,
          },
        ]);
      }
    }
  }, [userData]);

  // token get in cookies
  const userToken = Cookies.get("userToken");

  // Handle File Upload
  // const handleChange = ({ fileList }) => setFileList(fileList);

  // user profile get api
  const fetchUserData = async () => {
    try {
      const response = await axiosPublic.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      });

      if (response.data.status) {
        setUserData(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchUserData();
    }
  }, [userToken]);

  // first modal option get server
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(
          `/user/favorite-list?per_page=10`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: "application/json",
            },
          }
        );

        setFavoriteData(response.data?.favoriteList?.data);
        setLoading(false)
      } catch (error) {
        console.error("Failed to load data:", error);
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Slice data based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = favoriteData.slice(startIndex, endIndex);

  // logout function
  const handleLogout = async () => {
    try {
      const response = await axiosPublic.get("/logout", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      });
      console.log(response.data);
      if (response.data.success) {
        toast.success("User logged out successfully");
        Cookies.remove("userToken");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  // ========== user profile update modal start ================
  const handleInputChange = (e) => {
    setModalValues({ ...modalValues, [e.target.name]: e.target.value });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    form.submit();
  };

  const onFinishUserProfile = async (values) => {
    setLoading(true);
    const formData = new FormData();

    if (ImageFileList[0]?.originFileObj) {
      formData.append("avatar", ImageFileList[0].originFileObj);
    }

    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("phone", values.phone);
    formData.append("address", values.address);

    // formData.forEach((value, key) => {
    //     console.log(key, value);
    // });

    try {
      const response = await axiosPublic.post("/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      });

      console.log("Server Response:", response.data);
      if (response.data.success) {
        toast.success("Profile updated successfully");
        setIsModalOpen(false);
        // ✅ Fetch updated user data
        fetchUserData();
        setModalValues({
          first_name: "",
          last_name: "",
          phone: "",
          address: "",
        });
        setFileList([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // modal scroll off screen
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);
  // ========== user profile update modal end  =================


  console.log('fevorite list ', favoriteData)
  console.log('paginatedata', paginatedData)







  // favorit list add
  const handleunfevorite = async (id) => {
 

    if (userToken) {
      try {
        const response = await axiosPublic.delete(
          `/user/unmark-as-favorite/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: "application/json",
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          toast.success("Favorite list deleted successfully");
          
          // Update local state
          setFavoriteData(prev => prev.filter(item => item.id !== id));
        }
        
      } catch (error) {
        console.log(error)
      }
    } else {
      navigate("/login", { state: { from: location } });
    }
  };




 




  return (
    <div className="bg-gray-100">
      <AccountCreate>
        {
          loading ? <LoadindSpenier />
            :
            <section className="container mx-auto px-4 ">
              <div className="flex justify-center">
                <div className="flex flex-col md:flex-row justify-center gap-6">
                  {/* sidebar */}
                  <div className=" md:w-[270px] lg:w-[309px]  bg-[#FFFFFF] flex flex-col justify-between shadow-lg rounded-lg p-4">
                    <div className="p-4">
                      {userData.avatar ? (
                        <img
                          className="object-cover w-[124px] h-[124px] rounded-full"
                          src={userData?.avatar}
                          alt="User Avatar"
                        />
                      ) : (
                        <img
                          className="object-cover w-[124px] h-[124px] rounded-full"
                          src="/defaultImage.webp"
                          alt="User Avatar"
                        />
                      )}
                      <h1 className=" font-bold font-roboto text-[#001018 pl-4 pt-[12px] pb-[24px]">
                        {first_name} {last_name}
                      </h1>
                      <button
                        onClick={showModal}
                        className="flex items-center gap-2 border rounded-md px-4 py-2 text-[14px] font-bold text-primary mb-[24px]"
                      >
                        Edit profile
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask
                            id="mask0_599_7852"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                          >
                            <rect width="20" height="20" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_599_7852)">
                            <path
                              d="M1.66663 19.9993V16.666H18.3333V19.9993H1.66663ZM4.99996 13.3327H6.16663L12.6666 6.85352L11.4791 5.66602L4.99996 12.166V13.3327ZM3.33329 14.9993V11.4577L12.6666 2.14518C12.8194 1.9924 12.9965 1.87435 13.1979 1.79102C13.3993 1.70768 13.6111 1.66602 13.8333 1.66602C14.0555 1.66602 14.2708 1.70768 14.4791 1.79102C14.6875 1.87435 14.875 1.99935 15.0416 2.16602L16.1875 3.33268C16.3541 3.48546 16.4757 3.66602 16.552 3.87435C16.6284 4.08268 16.6666 4.29796 16.6666 4.52018C16.6666 4.72852 16.6284 4.93338 16.552 5.13477C16.4757 5.33615 16.3541 5.52018 16.1875 5.68685L6.87496 14.9993H3.33329Z"
                              fill="#1B69AD"
                            />
                          </g>
                        </svg>
                      </button>

                      {/* edit modal component */}
                      <Modal
                        centered
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={600}
                        footer={
                          <div className="font-roboto flex justify-center md:justify-between items-center gap-x-4 md:px-7 pt-[7px]">
                            <button
                              className="w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                            <Button
                              className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                              htmlType="submit"
                              onClick={handleOk}
                              style={{ backgroundColor: "#1b69ad", color: "white" }}
                            >
                              Continue
                            </Button>
                          </div>
                        }
                      >
                        <Form form={form} onFinish={onFinishUserProfile}>
                          <div className="py-8">
                            <div className="pb-4 w-full">
                              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                                Upload profile photo
                              </p>
                              <div className="w-full">
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
                                    onChange={({ fileList }) =>
                                      setImageFileList(fileList)
                                    }
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

                            <div className="pt-4">
                              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                                First Name
                              </p>
                              <Form.Item name="first_name">
                                <Input
                                  placeholder="Enter Your First Name"
                                  style={{ width: "100%", height: "40px" }}
                                />
                              </Form.Item>
                            </div>
                            <div className="pt-4">
                              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                                Last Name
                              </p>
                              <Form.Item name="last_name">
                                <Input
                                  placeholder="Enter Your Last Name"
                                  style={{ width: "100%", height: "40px" }}
                                />
                              </Form.Item>
                            </div>

                            <div className="pt-4">
                              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                                Phone Number
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
                                    e.target.value = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                  }}
                                  placeholder="Enter Your Phone Number"
                                  style={{ width: "100%", height: "40px" }}
                                />
                              </Form.Item>
                            </div>

                            <div className="pt-4">
                              <p className="text-[14px] font-roboto font-bold text-[#001018]">
                                address
                              </p>
                              <Form.Item name="address">
                                <Input
                                  placeholder="Enter Your Address"
                                  style={{ width: "100%", height: "40px" }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                        </Form>
                      </Modal>

                      <hr />

                      <div className="pt-[24px]">
                        <div className="">
                          {email && (
                            <div className="flex items-center ">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 7V17H19V7H5ZM19 5C20.1 5 21 5.9 21 7V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V7C3 5.9 3.9 5 5 5H19Z"
                                  fill="#10101E"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M5.498 6.5H3.124C3.273 6.94 3.523 7.354 3.874 7.705L9.756 13.586C10.0455 13.8757 10.3892 14.1056 10.7676 14.2624C11.1459 14.4192 11.5514 14.4999 11.961 14.4999C12.3706 14.4999 12.7761 14.4192 13.1544 14.2624C13.5328 14.1056 13.8765 13.8757 14.166 13.586L20.048 7.705C20.398 7.354 20.648 6.94 20.797 6.5H18.424L12.752 12.172C12.6481 12.276 12.5247 12.3585 12.3889 12.4147C12.2531 12.471 12.1075 12.5 11.9605 12.5C11.8135 12.5 11.6679 12.471 11.5321 12.4147C11.3963 12.3585 11.2729 12.276 11.169 12.172L5.498 6.5Z"
                                  fill="#10101E"
                                />
                              </svg>
                              {email}
                            </div>
                          )}
                          {phone && (
                            <div className="flex items-center pt-4">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M7.79399 5.36376C6.06799 7.49676 7.18299 10.3208 8.05999 12.4528C8.47599 13.4648 9.13299 14.4778 9.68899 15.2928C10.662 16.7168 12.878 19.4228 15.59 19.0148C16.758 18.8388 18.117 17.4598 17.187 16.5788L15.318 14.6388C15.318 14.6388 14.795 14.2028 14.147 14.5588L13.099 15.1718C13.099 15.1718 12.671 15.3738 12.3 14.8968C11.137 13.5258 10.305 12.0998 9.72199 10.4008C9.49499 9.73776 9.88999 9.57276 9.88999 9.57276L10.657 9.12276C11.294 8.74476 11.181 8.07176 11.181 8.07176L10.743 5.33376C10.611 4.76576 10.142 4.53076 9.59799 4.53076C8.94999 4.53076 8.19799 4.86476 7.79399 5.36376Z"
                                  fill="#10101E"
                                />
                              </svg>
                              {phone}
                            </div>
                          )}

                          {address && (
                            <div className="flex items-center pt-4">
                              <p className=" flex items-center  font-roboto text-[16px] text-[#10101E] text-wrap">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12 21C9.72 21 6 12.314 6 9C6 7.4087 6.63214 5.88258 7.75736 4.75736C8.88258 3.63214 10.4087 3 12 3C13.5913 3 15.1174 3.63214 16.2426 4.75736C17.3679 5.88258 18 7.4087 18 9C18 12.314 14.28 21 12 21ZM12 12C12.3824 12 12.7611 11.9247 13.1144 11.7783C13.4677 11.632 13.7887 11.4175 14.0591 11.1471C14.3295 10.8767 14.544 10.5557 14.6903 10.2024C14.8367 9.84907 14.912 9.47041 14.912 9.088C14.912 8.70559 14.8367 8.32693 14.6903 7.97363C14.544 7.62033 14.3295 7.29931 14.0591 7.0289C13.7887 6.7585 13.4677 6.544 13.1144 6.39766C12.7611 6.25132 12.3824 6.176 12 6.176C11.2277 6.176 10.487 6.4828 9.9409 7.0289C9.3948 7.57501 9.088 8.31569 9.088 9.088C9.088 9.86031 9.3948 10.601 9.9409 11.1471C10.487 11.6932 11.2277 12 12 12Z"
                                    fill="#10101E"
                                  />
                                </svg>
                                {address}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 px-4"
                      >
                        <span className="">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.9999 3V5H18.9999V19H11.9999V21H19.0059C20.1059 21 20.9999 20.107 20.9999 19.005V4.995C21.0002 4.73302 20.9488 4.47357 20.8487 4.23147C20.7486 3.98937 20.6018 3.76938 20.4166 3.58409C20.2314 3.3988 20.0114 3.25184 19.7694 3.15161C19.5273 3.05139 19.2679 2.99987 19.0059 3H11.9999Z"
                              fill="#EF436B"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M3.97694 11C3.71472 11.0034 3.46457 11.1108 3.2814 11.2984C3.09823 11.4861 2.997 11.7388 2.99994 12.001C2.99994 12.552 3.43694 13 3.97694 13H15.0239C15.2858 12.9968 15.5357 12.8898 15.7187 12.7025C15.9017 12.5152 16.0029 12.2629 15.9999 12.001C16.0029 11.7389 15.9018 11.4864 15.7188 11.2988C15.5359 11.1111 15.286 11.0037 15.0239 11H3.97694Z"
                              fill="#EF436B"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.3029 8.305C12.1089 8.502 12.0001 8.76745 12.0001 9.044C12.0001 9.32055 12.1089 9.586 12.3029 9.783L14.4999 12L12.3029 14.217C12.1087 14.4135 11.9998 14.6787 11.9998 14.955C11.9998 15.2313 12.1087 15.4965 12.3029 15.693C12.7069 16.102 13.3629 16.102 13.7679 15.693L16.6979 12.738C16.8912 12.5408 16.9995 12.2756 16.9995 11.9995C16.9995 11.7234 16.8912 11.4582 16.6979 11.261L13.7679 8.305C13.6719 8.20858 13.5577 8.13207 13.432 8.07987C13.3063 8.02767 13.1715 8.00079 13.0354 8.00079C12.8993 8.00079 12.7646 8.02767 12.6389 8.07987C12.5132 8.13207 12.399 8.20858 12.3029 8.305Z"
                              fill="#EF436B"
                            />
                          </svg>
                        </span>
                        <h4 className="text-[#EF436B] font-roboto font-semibold pt-2">
                          Logout
                        </h4>
                      </button>
                    </div>
                  </div>

                  {/*  right side content   */}
                  {Object.keys(paginatedData).length > 0 ? (
                    <div className=" col-span-2 pt-8 md:pt-0">
                      <h1 className="font-roboto lg:text-[26px] font-bold text-[#000000] md:pb-2">
                        Your <span className="text-primary">LawPair</span> Suggested
                        attorneys
                      </h1>

                      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-6 md:gap-2 lg:gap-6">
                        {paginatedData.map((attorney, index) => {
                          console.log(attorney)
                          return (
                            // <Link key={index} to={`/attorney-tm-details/${attorney.lawyer_id}`}>
                            <div
                              className="lg:first-letter  lg:h-auto lg:w-[300px] p-4 shadow-lg rounded-md "
                            >
                            <Link key={attorney.id} to={`/attorney-tm-details/${attorney.lawyer_id}?is_favorite=${attorney.is_favorite}`}>
                            <img
                                src={attorney.avatar}
                                alt="Profile"
                                onError={(e) => (e.target.src = "/attorney1.png")}
                                className="object-cover rounded-md w-[250px] h-[280px]"
                              />

                            </Link>
                              <div className="flex justify-between items-center">
                                <div className="w-full">
                                  <div className="flex justify-between items-center">
                                    <h2 className="text-[20px] font-bold font-roboto text-[#001018] pb-2 pt-[16px] capitalize">
                                      {attorney.first_name} {attorney.last_name}
                                    </h2>

                                    <span>
                                      {attorney?.is_favorite ? (
                                       <button onClick={() => handleunfevorite(parseInt(attorney?.id))}>
                                         <svg
                                          className="cursor-pointer "
                                          width="30"
                                          height="25"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.3824 11.0689C9.50441 11.1213 9.61475 11.1975 9.707 11.293L11 12.586L14.293 9.29302C14.3852 9.19751 14.4956 9.12133 14.6176 9.06892C14.7396 9.01651 14.8708 8.98892 15.0036 8.98777C15.1364 8.98662 15.2681 9.01192 15.391 9.0622C15.5138 9.11248 15.6255 9.18673 15.7194 9.28063C15.8133 9.37452 15.8875 9.48617 15.9378 9.60907C15.9881 9.73196 16.0134 9.86364 16.0122 9.99642C16.0111 10.1292 15.9835 10.2604 15.9311 10.3824C15.8787 10.5044 15.8025 10.6148 15.707 10.707L11.707 14.707C11.5195 14.8945 11.2652 14.9998 11 14.9998C10.7348 14.9998 10.4805 14.8945 10.293 14.707L8.293 12.707C8.19749 12.6148 8.1213 12.5044 8.0689 12.3824C8.01649 12.2604 7.9889 12.1292 7.98775 11.9964C7.98659 11.8636 8.0119 11.732 8.06218 11.6091C8.11246 11.4862 8.18671 11.3745 8.2806 11.2806C8.3745 11.1867 8.48615 11.1125 8.60904 11.0622C8.73194 11.0119 8.86362 10.9866 8.9964 10.9878C9.12918 10.9889 9.2604 11.0165 9.3824 11.0689Z"
                                            fill="#05C793"
                                          />
                                        </svg>
                                       </button>
                                      ) : (
                                        <button>
                                        <svg
                                          className="cursor-pointer "
                                        
                                          width="30"
                                          height="24"
                                          viewBox="0 0 25 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M12.5 20C14.6217 20 16.6566 19.1571 18.1569 17.6569C19.6571 16.1566 20.5 14.1217 20.5 12C20.5 9.87827 19.6571 7.84344 18.1569 6.34315C16.6566 4.84285 14.6217 4 12.5 4C10.3783 4 8.34344 4.84285 6.84315 6.34315C5.34285 7.84344 4.5 9.87827 4.5 12C4.5 14.1217 5.34285 16.1566 6.84315 17.6569C8.34344 19.1571 10.3783 20 12.5 20ZM12.5 22C6.977 22 2.5 17.523 2.5 12C2.5 6.477 6.977 2 12.5 2C18.023 2 22.5 6.477 22.5 12C22.5 17.523 18.023 22 12.5 22Z"
                                            fill="#44546F"
                                          />
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M10.207 11.293C10.1148 11.1975 10.0044 11.1213 9.8824 11.0689C9.7604 11.0165 9.62918 10.9889 9.4964 10.9877C9.36362 10.9866 9.23194 11.0119 9.10905 11.0622C8.98615 11.1125 8.8745 11.1867 8.78061 11.2806C8.68671 11.3745 8.61246 11.4861 8.56218 11.609C8.5119 11.7319 8.4866 11.8636 8.48775 11.9964C8.4889 12.1292 8.51649 12.2604 8.5689 12.3824C8.62131 12.5044 8.69749 12.6148 8.793 12.707L10.793 14.707C10.9805 14.8945 11.2348 14.9998 11.5 14.9998C11.7652 14.9998 12.0195 14.8945 12.207 14.707L16.207 10.707C16.3025 10.6148 16.3787 10.5044 16.4311 10.3824C16.4835 10.2604 16.5111 10.1292 16.5123 9.9964C16.5134 9.86362 16.4881 9.73194 16.4378 9.60905C16.3875 9.48615 16.3133 9.3745 16.2194 9.2806C16.1255 9.18671 16.0139 9.11246 15.891 9.06218C15.7681 9.0119 15.6364 8.98659 15.5036 8.98775C15.3708 8.9889 15.2396 9.01649 15.1176 9.0689C14.9956 9.12131 14.8852 9.19749 14.793 9.293L11.5 12.586L10.207 11.293Z"
                                            fill="#44546F"
                                          />
                                        </svg>

                                        </button>
                                      )}
                                    </span>
                                  </div>
                                  <h2 className="font-bold font-roboto text-[#001018] capitalize">
                                    {attorney.state}
                                  </h2>
                                </div>


                              </div>
                              <div className="text-[14px] font-roboto text-[#001018]">
                                {attorney?.categories?.map((categorie, index) => {
                                  return (
                                    <div key={index}>
                                      <h1>{index + 1}. {categorie}</h1>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                            // </Link>
                          );
                        })}
                      </div>
                      <div className="py-4">
                        <Pagination

                          current={currentPage}
                          total={favoriteData.length}
                          pageSize={itemsPerPage}
                          onChange={handlePageChange}
                          align="center"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col col-span-2 justify-center items-center lg:min-h-[600px]">
                      <h1 className="lg:text-8xl md:text-4xl text-base font-bold text-gray-200 uppercase text-center ">
                        data not found
                      </h1>
                      {
                        <div className="flex gap-2 items-center justify-center">
                          <FiArrowLeft size={20} color="#1b69ad" />

                          <Link className="text-primary" to={"/"}>
                            Go Back
                          </Link>
                        </div>
                      }
                    </div>
                  )}
                </div>
              </div>
            </section>
        }
      </AccountCreate>
    </div>
  );
};

export default UserProfile;
