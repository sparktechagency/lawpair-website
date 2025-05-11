import { Link, useNavigate } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import LoadindSpenier from "../../components/shared/LoadindSpenier";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { MdOutlineLocationCity } from "react-icons/md";
import { TbBuildingEstate } from "react-icons/tb";
import { TbFileTypeZip } from "react-icons/tb";


const LawyerProfile = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [modalOneOpen, setIsModalOneOpen] = useState(false);
  const [modalTwoOpen, setIsModalTwoOpen] = useState(false);
  const [lawyerAllData, setLawyerAllData] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(lawyerAllData)
  const {
    first_name,
    last_name,
    full_name,
    address,
    city,
    avatar,
    categories,
    email,
    id_number,
    experience,
    languages,
    phone,
    practice_area,
    state,
    zipcode,
    web_link,
    linkedin_url,
    schedule,
  } = lawyerAllData || {};

  // token get in cookies
  const lawyerToken = Cookies.get("lawyerToken");

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
        setLawyerAllData(response?.data?.lawyer);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load data:");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  //=========== modal one start ===========
  const showModal = () => {
    setIsModalOneOpen(true);
  };

  const handleOk = () => {
    setIsModalOneOpen(false);
    navigate("/edit-lawyer-profile");
  };

  const handleCancel = () => {
    setIsModalOneOpen(false);
  };
  //=========== modal one end ===========

  //=========== modal two start ===========
  const showModalTwo = () => {
    setIsModalTwoOpen(true);
    setIsModalOneOpen(false);
  };

  const handleOkTwo = async () => {
    try {
      const response = await axiosPublic.get("/logout", {
        headers: {
          Authorization: `Bearer ${lawyerToken}`,
          Accept: "application/json",
        },
      });
      console.log(response.data);
      if (response.data.success) {
        toast.success("User logged out successfully");
        Cookies.remove("lawyerToken");
        setIsModalTwoOpen(false);
        navigate("/login");
      }
    } catch (error) {
      toast.error("Logout Failed", error);
    }
  };

  const handleCancelTwo = () => {
    setIsModalTwoOpen(false);
  };
  //=========== modal one end =============

  useEffect(() => {
    // Disable scroll when any modal is open
    if (modalOneOpen || modalTwoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll when no modal is open
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup function
    };
  }, [modalOneOpen, modalTwoOpen]);

  if (loading) {
    return <LoadindSpenier />;
  }

  console.log(lawyerAllData);
  return (
    <div className="bg-gray-100">
      <AccountCreate>
        <div className="container mx-auto px-4 pb-4 ">
          <div>
            <div className="max-w-[1037px] lg:h-[789px] mx-auto overflow-hidden bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between pb-[12px]">
                <div className="relative">
                  <img
                    src={avatar}
                    alt="Profile"
                    onError={(e) => (e.target.src = "/attorney1.png")}
                    className="object-cover w-[100px] h-[100px] rounded-full"
                  />

                  <span className="absolute bottom-0 right-0">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="32" height="32" rx="16" fill="white" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 10.994C6 9.893 6.898 9 7.99 9H24.01C25.108 9 26 9.895 26 10.994V23.006C25.9992 23.5339 25.7894 24.04 25.4165 24.4137C25.0436 24.7873 24.5379 24.9981 24.01 25H7.99C7.46185 24.9989 6.9557 24.7884 6.58261 24.4146C6.20953 24.0407 6 23.5341 6 23.006V10.994ZM16 21C17.0609 21 18.0783 20.5786 18.8284 19.8284C19.5786 19.0783 20 18.0609 20 17C20 15.9391 19.5786 14.9217 18.8284 14.1716C18.0783 13.4214 17.0609 13 16 13C14.9391 13 13.9217 13.4214 13.1716 14.1716C12.4214 14.9217 12 15.9391 12 17C12 18.0609 12.4214 19.0783 13.1716 19.8284C13.9217 20.5786 14.9391 21 16 21ZM21 13C21 13.556 21.448 14 22 14C22.556 14 23 13.552 23 13C23 12.444 22.552 12 22 12C21.444 12 21 12.448 21 13ZM12 8C12 7.448 12.453 7 12.997 7H19.003C19.553 7 20 7.444 20 8V9H12V8Z"
                        fill="#121221"
                      />
                      <path
                        d="M16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z"
                        fill="#121221"
                      />
                    </svg>
                  </span>
                </div>

                <div className="flex">
                  <Button onClick={showModal} style={{ border: "0px solid" }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z"
                        fill="#121221"
                      />
                      <path
                        d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                        fill="#121221"
                      />
                      <path
                        d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z"
                        fill="#121221"
                      />
                    </svg>
                  </Button>

                  <Modal
                    centered
                    open={modalOneOpen}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    <div onClick={handleOk} className="flex  gap-2">
                      <span className="cursor-pointer">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.02001 19.23C3.9869 19.392 3.99447 19.5597 4.04205 19.718C4.08963 19.8764 4.17573 20.0205 4.29265 20.1374C4.40956 20.2543 4.55364 20.3404 4.71199 20.388C4.87034 20.4355 5.03802 20.4431 5.20001 20.41L9.01001 19.63L4.80001 15.42L4.02001 19.23ZM9.94101 16.61L7.82101 14.49L16.306 6H16.308L18.429 8.121L9.94001 16.611L9.94101 16.61ZM19.844 6.707L17.724 4.585C17.5381 4.39908 17.3173 4.2517 17.0743 4.15131C16.8314 4.05092 16.5709 3.9995 16.308 4C15.796 4 15.284 4.195 14.893 4.585L5.13601 14.343L10.086 19.293L19.843 9.535C20.218 9.15995 20.4286 8.65133 20.4286 8.121C20.4286 7.59068 20.218 7.08206 19.843 6.707H19.844Z"
                            fill="#121221"
                          />
                        </svg>
                      </span>
                      <p className="font-roboto cursor-pointer">Edit profile</p>
                    </div>

                    <div className="flex  gap-2 w-fit" onClick={showModalTwo}>
                      <span className="cursor-pointer">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 3V5H19V19H12V21H19.006C20.106 21 21 20.107 21 19.005V4.995C21.0003 4.73302 20.9489 4.47357 20.8488 4.23147C20.7487 3.98937 20.6018 3.76938 20.4166 3.58409C20.2314 3.3988 20.0115 3.25184 19.7695 3.15161C19.5274 3.05139 19.268 2.99987 19.006 3H12Z"
                            fill="#EF436B"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.977 11C3.71478 11.0034 3.46463 11.1108 3.28146 11.2984C3.09829 11.4861 2.99706 11.7388 3 12.001C3 12.552 3.437 13 3.977 13H15.024C15.2859 12.9968 15.5358 12.8898 15.7188 12.7025C15.9018 12.5152 16.0029 12.2629 16 12.001C16.0029 11.7389 15.9018 11.4864 15.7189 11.2988C15.5359 11.1111 15.286 11.0037 15.024 11H3.977Z"
                            fill="#EF436B"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.303 8.305C12.1089 8.502 12.0001 8.76745 12.0001 9.044C12.0001 9.32055 12.1089 9.586 12.303 9.783L14.5 12L12.303 14.217C12.1088 14.4135 11.9999 14.6787 11.9999 14.955C11.9999 15.2313 12.1088 15.4965 12.303 15.693C12.707 16.102 13.363 16.102 13.768 15.693L16.698 12.738C16.8913 12.5408 16.9996 12.2756 16.9996 11.9995C16.9996 11.7234 16.8913 11.4582 16.698 11.261L13.768 8.305C13.6719 8.20858 13.5578 8.13207 13.4321 8.07987C13.3064 8.02767 13.1716 8.00079 13.0355 8.00079C12.8994 8.00079 12.7646 8.02767 12.6389 8.07987C12.5132 8.13207 12.3991 8.20858 12.303 8.305Z"
                            fill="#EF436B"
                          />
                        </svg>
                      </span>
                      <p className="text-[#EF436B] font-roboto cursor-pointer">
                        Logout
                      </p>
                    </div>
                  </Modal>

                  <Modal
                    centered
                    open={modalTwoOpen}
                    onOk={handleOkTwo}
                    onCancel={handleCancelTwo}
                    footer={
                      <div className="flex justify-end gap-2 md:gap-x-4 pt-[24px]">
                        <button
                          className="font-roboto w-[40%] h-[40px] md:w-[121px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] md:text-[16px] font-bold"
                          onClick={handleOkTwo}
                        >
                          Yes, log out
                        </button>
                        <button
                          className="font-roboto w-[65%] h-[40px] md:w-[201px] md:h-[64px] border border-[#D9DDE1] text-[#1b69ad] px-1 rounded-[5px] md:text-[16px] font-bold"
                          onClick={handleCancelTwo}
                        >
                          No, keep me logged in
                        </button>
                      </div>
                    }
                  >
                    <h1 className="font-roboto font-bold text-[24px]">
                      Log out
                    </h1>
                    <p className="font-roboto">Do you want to log out?</p>
                  </Modal>
                </div>
              </div>

              <div className="pb-[24px]">
                <h1 className="text-[20px] font-bold font-roboto text-[#001018]">
                  {full_name}
                </h1>
                <div className="text-[14px] font-roboto text-[#001018] flex items-center flex-wrap gap-2 md:gap-3">
                  {
                    categories?.map((item, index) => {
                      console.log(item)
                      return (
                        <h3 key={index}>{index + 1}.{item}</h3>
                      )
                    })
                  }
                </div>
              </div>
              <hr />

              <div>
                <h2 className="font-roboto text-[16px] font-bold text-[#000000] pt-[24px]">
                  Contact details
                </h2>
                <div className=" pt-[8px]">
                  {phone && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">
                    {/* <svg
                      width="24"
                      height="25"
                      viewBox="0 0 12 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.79399 1.36425C0.0679901 3.49725 1.18299 6.32125 2.05999 8.45325C2.47599 9.46525 3.13299 10.4783 3.68899 11.2933C4.66199 12.7172 6.87799 15.4232 9.58999 15.0152C10.758 14.8392 12.117 13.4602 11.187 12.5793L9.31799 10.6392C9.31799 10.6392 8.79499 10.2032 8.14699 10.5592L7.09899 11.1722C7.09899 11.1722 6.67099 11.3743 6.29999 10.8973C5.13699 9.52625 4.30499 8.10025 3.72199 6.40125C3.49499 5.73825 3.88999 5.57325 3.88999 5.57325L4.65699 5.12325C5.29399 4.74525 5.18099 4.07225 5.18099 4.07225L4.74299 1.33425C4.61099 0.76625 4.14199 0.53125 3.59799 0.53125C2.94999 0.53125 2.19799 0.86525 1.79399 1.36425Z"
                        fill="#10101E"
                      />
                    </svg> */}
                    <p className="text-md font-semibold">Phone:</p>
                    <p>{phone}</p>
                  </div>
                  }

                  {email && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">
                    {/* <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 7.66797V17.668H19V7.66797H5ZM19 5.66797C20.1 5.66797 21 6.56797 21 7.66797V17.668C21 18.768 20.1 19.668 19 19.668H5C3.9 19.668 3 18.768 3 17.668V7.66797C3 6.56797 3.9 5.66797 5 5.66797H19Z"
                        fill="#10101E"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.498 7.16797H3.124C3.273 7.60797 3.523 8.02197 3.874 8.37297L9.756 14.254C10.0455 14.5437 10.3892 14.7735 10.7676 14.9303C11.1459 15.0872 11.5514 15.1679 11.961 15.1679C12.3706 15.1679 12.7761 15.0872 13.1544 14.9303C13.5328 14.7735 13.8765 14.5437 14.166 14.254L20.048 8.37297C20.398 8.02197 20.648 7.60797 20.797 7.16797H18.424L12.752 12.84C12.6481 12.944 12.5247 13.0264 12.3889 13.0827C12.2531 13.139 12.1075 13.168 11.9605 13.168C11.8135 13.168 11.6679 13.139 11.5321 13.0827C11.3963 13.0264 11.2729 12.944 11.169 12.84L5.498 7.16797Z"
                        fill="#10101E"
                      />
                    </svg> */}
                    <p className="text-md font-semibold">Email address:</p>
                  <p>  {email}</p>
                  </div>}


                  {practice_area && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">
                    {/* <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 14.332H19V9.33203H5V14.332H7V13.332C7 13.0668 7.10536 12.8125 7.29289 12.6249C7.48043 12.4374 7.73478 12.332 8 12.332C8.26522 12.332 8.51957 12.4374 8.70711 12.6249C8.89464 12.8125 9 13.0668 9 13.332V14.332H15V13.332C15 13.0668 15.1054 12.8125 15.2929 12.6249C15.4804 12.4374 15.7348 12.332 16 12.332C16.2652 12.332 16.5196 12.4374 16.7071 12.6249C16.8946 12.8125 17 13.0668 17 13.332V14.332ZM17 16.332V17.332C17 17.5972 16.8946 17.8516 16.7071 18.0391C16.5196 18.2267 16.2652 18.332 16 18.332C15.7348 18.332 15.4804 18.2267 15.2929 18.0391C15.1054 17.8516 15 17.5972 15 17.332V16.332H9V17.332C9 17.5972 8.89464 17.8516 8.70711 18.0391C8.51957 18.2267 8.26522 18.332 8 18.332C7.73478 18.332 7.48043 18.2267 7.29289 18.0391C7.10536 17.8516 7 17.5972 7 17.332V16.332H5V19.332H19V16.332H17ZM9 7.33203H15V6.33203H9V7.33203ZM7 7.33203V5.33203C7 5.06681 7.10536 4.81246 7.29289 4.62492C7.48043 4.43739 7.73478 4.33203 8 4.33203H16C16.2652 4.33203 16.5196 4.43739 16.7071 4.62492C16.8946 4.81246 17 5.06681 17 5.33203V7.33203H19C19.5304 7.33203 20.0391 7.54274 20.4142 7.91782C20.7893 8.29289 21 8.8016 21 9.33203V19.332C21 19.8625 20.7893 20.3712 20.4142 20.7462C20.0391 21.1213 19.5304 21.332 19 21.332H5C4.46957 21.332 3.96086 21.1213 3.58579 20.7462C3.21071 20.3712 3 19.8625 3 19.332V9.33203C3 8.8016 3.21071 8.29289 3.58579 7.91782C3.96086 7.54274 4.46957 7.33203 5 7.33203H7Z"
                        fill="#10101E"
                      />
                    </svg> */}
                    <p className="text-md font-semibold">Law firm name:</p>
                   <p> {practice_area}</p>
                  </div>}


                  <div>

                    <strong className=" flex flex-row items-center gap-2 ">

                      {/* <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 21.668C9.72 21.668 6 12.982 6 9.66797C6 8.07667 6.63214 6.55055 7.75736 5.42533C8.88258 4.30011 10.4087 3.66797 12 3.66797C13.5913 3.66797 15.1174 4.30011 16.2426 5.42533C17.3679 6.55055 18 8.07667 18 9.66797C18 12.982 14.28 21.668 12 21.668ZM12 12.668C12.3824 12.668 12.7611 12.5926 13.1144 12.4463C13.4677 12.3 13.7887 12.0855 14.0591 11.8151C14.3295 11.5447 14.544 11.2236 14.6903 10.8703C14.8367 10.517 14.912 10.1384 14.912 9.75597C14.912 9.37356 14.8367 8.99489 14.6903 8.64159C14.544 8.28829 14.3295 7.96728 14.0591 7.69687C13.7887 7.42647 13.4677 7.21197 13.1144 7.06563C12.7611 6.91929 12.3824 6.84397 12 6.84397C11.2277 6.84397 10.487 7.15077 9.9409 7.69687C9.3948 8.24298 9.088 8.98366 9.088 9.75597C9.088 10.5283 9.3948 11.269 9.9409 11.8151C10.487 12.3612 11.2277 12.668 12 12.668Z"
                        fill="#10101E"
                      />
                    </svg> */}

                      Address:</strong>
                    <div className=" pt-1 ">
                      <div className="pt-1">
                        <span>{address}</span>
                        <span>{city}</span>
                      </div>
                      <div className="flex flex-row items-center gap-2">

                        <p className="font-roboto text-[16px] text-[#10101E] pt-2">{state},</p>
                        <p className="font-roboto text-[16px] text-[#10101E] pt-2">{zipcode}</p>
                      </div>

                    </div>

                  </div>


                  {languages && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">
                    {/* <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 21.332C13.1819 21.332 14.3522 21.0992 15.4442 20.6469C16.5361 20.1947 17.5282 19.5317 18.364 18.696C19.1997 17.8603 19.8626 16.8681 20.3149 15.7762C20.7672 14.6843 21 13.5139 21 12.332C21 11.1501 20.7672 9.97981 20.3149 8.88788C19.8626 7.79595 19.1997 6.8038 18.364 5.96807C17.5282 5.13234 16.5361 4.46941 15.4442 4.01712C14.3522 3.56482 13.1819 3.33203 12 3.33203C9.61305 3.33203 7.32387 4.28024 5.63604 5.96807C3.94821 7.6559 3 9.94508 3 12.332C3 14.719 3.94821 17.0082 5.63604 18.696C7.32387 20.3838 9.61305 21.332 12 21.332ZM11.1 19.469C9.36032 19.252 7.75986 18.4069 6.59966 17.0925C5.43945 15.7782 4.79944 14.0852 4.8 12.332C4.8 11.774 4.872 11.243 4.989 10.721L9.3 15.032V15.932C9.3 16.922 10.11 17.732 11.1 17.732V19.469ZM17.31 17.183C17.1958 16.8193 16.9682 16.5017 16.6605 16.2766C16.3529 16.0515 15.9812 15.9307 15.6 15.932H14.7V13.232C14.7 12.737 14.295 12.332 13.8 12.332H8.4V10.532H10.2C10.695 10.532 11.1 10.127 11.1 9.63203V7.83203H12.9C13.89 7.83203 14.7 7.02203 14.7 6.03203V5.66303C17.337 6.73403 19.2 9.31703 19.2 12.332C19.2 14.204 18.48 15.905 17.31 17.183Z"
                        fill="#121221"
                      />
                    </svg> */}
                    <p className="text-md font-semibold">Languages:</p>
                    <p>{languages}</p>
                  </div>}

                  {
                    web_link && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">
                      {/* <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.856 5.45669L11.919 6.37669C11.8229 6.47007 11.7466 6.58177 11.6944 6.70518C11.6423 6.8286 11.6154 6.96121 11.6154 7.09519C11.6154 7.22917 11.6423 7.36178 11.6944 7.4852C11.7466 7.60861 11.8229 7.72031 11.919 7.81369C12.1146 8.00469 12.3771 8.11161 12.6505 8.11161C12.9239 8.11161 13.1864 8.00469 13.382 7.81369L14.366 6.84769C15.333 5.89769 16.908 5.71269 17.968 6.55969C18.2515 6.7833 18.484 7.06478 18.6501 7.38535C18.8162 7.70593 18.9121 8.05823 18.9313 8.41877C18.9505 8.77931 18.8926 9.13981 18.7615 9.47622C18.6304 9.81263 18.4291 10.1172 18.171 10.3697L15.268 13.2217C14.7738 13.704 14.1106 13.974 13.42 13.974C12.7294 13.974 12.0662 13.704 11.572 13.2217L10.462 12.1317L9.00001 13.5697L10.108 14.6587C11.93 16.4467 14.91 16.4467 16.73 14.6587L19.635 11.8067C20.0957 11.3543 20.455 10.8092 20.6892 10.2074C20.9234 9.60568 21.027 8.96106 20.9932 8.31625C20.9595 7.67144 20.7891 7.04116 20.4934 6.46715C20.1977 5.89315 19.7834 5.38852 19.278 4.98669C17.385 3.46969 14.583 3.76069 12.856 5.45669Z"
                          fill="#10101E"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.144 19.5427L12.081 18.6227C12.1771 18.5293 12.2534 18.4176 12.3056 18.2942C12.3577 18.1708 12.3846 18.0382 12.3846 17.9042C12.3846 17.7702 12.3577 17.6376 12.3056 17.5142C12.2534 17.3908 12.1771 17.2791 12.081 17.1857C11.8855 16.995 11.6231 16.8883 11.35 16.8883C11.0769 16.8883 10.8145 16.995 10.619 17.1857L9.63401 18.1517C8.66701 19.1017 7.09201 19.2867 6.03201 18.4397C5.74853 18.2161 5.51599 17.9346 5.34988 17.614C5.18378 17.2935 5.08792 16.9411 5.06871 16.5806C5.0495 16.2201 5.10738 15.8596 5.23848 15.5232C5.36958 15.1868 5.5709 14.8822 5.82901 14.6297L8.73201 11.7777C9.22624 11.2954 9.88944 11.0254 10.58 11.0254C11.2706 11.0254 11.9338 11.2954 12.428 11.7777L13.538 12.8677L15 11.4297L13.892 10.3407C12.07 8.55269 9.09001 8.55269 7.27001 10.3407L4.36501 13.1927C3.9043 13.6451 3.54497 14.1902 3.31081 14.792C3.07666 15.3937 2.97303 16.0383 3.00678 16.6831C3.04053 17.3279 3.2109 17.9582 3.5066 18.5322C3.8023 19.1062 4.21658 19.6109 4.72201 20.0127C6.61501 21.5297 9.417 21.2387 11.144 19.5427Z"
                          fill="#10101E"
                        />
                      </svg> */}
                      <p className="text-md font-semibold">Law firm website link: </p>
                      <p>

                        <Link
                          to={`${web_link}`}
                          className="text-primary underline"
                        >
                          {web_link}
                        </Link>
                      </p>
                    </div>
                  }
                  {
                    linkedin_url && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">
                      {/* <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.856 5.45669L11.919 6.37669C11.8229 6.47007 11.7466 6.58177 11.6944 6.70518C11.6423 6.8286 11.6154 6.96121 11.6154 7.09519C11.6154 7.22917 11.6423 7.36178 11.6944 7.4852C11.7466 7.60861 11.8229 7.72031 11.919 7.81369C12.1146 8.00469 12.3771 8.11161 12.6505 8.11161C12.9239 8.11161 13.1864 8.00469 13.382 7.81369L14.366 6.84769C15.333 5.89769 16.908 5.71269 17.968 6.55969C18.2515 6.7833 18.484 7.06478 18.6501 7.38535C18.8162 7.70593 18.9121 8.05823 18.9313 8.41877C18.9505 8.77931 18.8926 9.13981 18.7615 9.47622C18.6304 9.81263 18.4291 10.1172 18.171 10.3697L15.268 13.2217C14.7738 13.704 14.1106 13.974 13.42 13.974C12.7294 13.974 12.0662 13.704 11.572 13.2217L10.462 12.1317L9.00001 13.5697L10.108 14.6587C11.93 16.4467 14.91 16.4467 16.73 14.6587L19.635 11.8067C20.0957 11.3543 20.455 10.8092 20.6892 10.2074C20.9234 9.60568 21.027 8.96106 20.9932 8.31625C20.9595 7.67144 20.7891 7.04116 20.4934 6.46715C20.1977 5.89315 19.7834 5.38852 19.278 4.98669C17.385 3.46969 14.583 3.76069 12.856 5.45669Z"
                          fill="#10101E"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.144 19.5427L12.081 18.6227C12.1771 18.5293 12.2534 18.4176 12.3056 18.2942C12.3577 18.1708 12.3846 18.0382 12.3846 17.9042C12.3846 17.7702 12.3577 17.6376 12.3056 17.5142C12.2534 17.3908 12.1771 17.2791 12.081 17.1857C11.8855 16.995 11.6231 16.8883 11.35 16.8883C11.0769 16.8883 10.8145 16.995 10.619 17.1857L9.63401 18.1517C8.66701 19.1017 7.09201 19.2867 6.03201 18.4397C5.74853 18.2161 5.51599 17.9346 5.34988 17.614C5.18378 17.2935 5.08792 16.9411 5.06871 16.5806C5.0495 16.2201 5.10738 15.8596 5.23848 15.5232C5.36958 15.1868 5.5709 14.8822 5.82901 14.6297L8.73201 11.7777C9.22624 11.2954 9.88944 11.0254 10.58 11.0254C11.2706 11.0254 11.9338 11.2954 12.428 11.7777L13.538 12.8677L15 11.4297L13.892 10.3407C12.07 8.55269 9.09001 8.55269 7.27001 10.3407L4.36501 13.1927C3.9043 13.6451 3.54497 14.1902 3.31081 14.792C3.07666 15.3937 2.97303 16.0383 3.00678 16.6831C3.04053 17.3279 3.2109 17.9582 3.5066 18.5322C3.8023 19.1062 4.21658 19.6109 4.72201 20.0127C6.61501 21.5297 9.417 21.2387 11.144 19.5427Z"
                          fill="#10101E"
                        />
                      </svg> */}
                      <p className="text-md font-semibold">LinkedIn: </p>
                      <p>

                        <Link
                          to={`${linkedin_url}`}
                          className="text-primary underline"
                        >
                          {linkedin_url}
                        </Link>
                      </p>
                    </div>
                  }
                </div>
                {/* <h2 className="font-roboto text-[16px] font-bold text-[#000000] pt-[24px]">
                  Availability
                </h2>
                <div className="flex flex-wrap lg:flex-row items-center gap-3 pt-3">
                  {lawyerData?.schedule?.map((avilityDay, index) => {
                    return (
                      <button
                        key={index}
                        className="border px-4 py-1 rounded-full font-roboto text-primary text-[16px]"
                      >
                        {avilityDay.day}
                      </button>
                    );
                  })}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </AccountCreate>
    </div>
  );
};

export default LawyerProfile;
