import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import { TfiClose } from "react-icons/tfi";
import Button from "../Button";
import { RiSearchLine } from "react-icons/ri";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Header = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [lawyerData, setlawyerData] = useState({});
  const [userData, setUserData] = useState({});

  // token get in cookies
  const lawyerToken = Cookies.get("lawyerToken");
  const userToken = Cookies.get("userToken");

  const handleNavigate = () => {
    navigate("/");
  };

  // background color add in navbar scroll
  const changeBackground = () => {
    if (window.scrollY >= 32) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      return alert("Please enter a search term");
    }

    try {
      const response = await axiosPublic.get(
        `/search-lawyer?name=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
            // ✅ Send token in Authorization header
          },
        }
      );
      console.log(response)
      if (response.data.success) {
        navigate("/search-attorney", {
          state: { searchResults: response.data.lawyers.data },
        });
      }
    } catch (error) {
      navigate("/search-attorney");
    }
  };

  // Background color change on scroll
  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 32) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  // lawyer profile data get api
  useEffect(() => {
    const fetchLawyerData = async () => {
      try {
        const response = await axiosPublic.get("/lawyer/profile", {
          headers: {
            Authorization: `Bearer ${lawyerToken}`,
            Accept: "application/json",
          },
        });
        setlawyerData(response.data.lawyer);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchLawyerData();
  }, [lawyerToken]);

  // useer profile data get api
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosPublic.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
          },
        });
        setUserData(response.data.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchUserData();
  }, [userToken]);

  return (
    <>
      {/* Navbar */}
      <header
        className={`sticky -top-[3px] left-0 w-full  transition-all ease-in-out duration-300 ${navbar ? "0 z-50 fixed " : " z-50 "
          }`}
      >
        <div
          className={`absolute w-full ${navbar ? "bg-[#FFFFFF] lg:py-2" : "lg:my-2"
            }`}
        >
          <div className="container mx-auto px-[27px] flex items-center bg-[#FFFFFF] lg:rounded-full py-[16px]">
            <nav className="relative container flex justify-between items-center w-full">
              {/* Logo */}
              <div className="flex items-center gap-6">
                <div onClick={handleNavigate} className="cursor-pointer">
                  <img
                    className="w-[140px] h-[40px] md:w-[161px] md:h-[50px]"
                    src="/logo3.png"
                    alt="nav logo"
                  />
                </div>

                {/* Search Bar */}
                <div className="relative hidden md:block ">
                  <input
                    type="text"
                    maxLength={18}
                    className="w-[316px] h-[50px] py-2 pl-3 pr-4  bg-[#E7E7E999] text-gray-700 rounded-2xl outline-none "
                    placeholder="Search attorney..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pl-3">
                    <RiSearchLine
                      onClick={handleSearch}
                      className="w-10 h-8 pr-3 text-primary"
                    />
                  </span>
                </div>


              </div>

              {/* Mobile Menu Button */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setMenuOpen(!menuOpen) && setMenuOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-[6px] focus:ring-2 ring-primary"
                >
                  {menuOpen ? (
                    <TfiClose className="text-2xl" />
                  ) : (
                    <VscMenu className="text-2xl" />
                  )}
                </button>
              </div>

              {/* Sidebar (Mobile Menu) */}
              <div
                className={`fixed top-0 right-0 h-full w-2/3 p-4 bg-gray-100 shadow-lg z-[200] transition-transform overflow-y-auto ${menuOpen ? "translate-x-0" : "translate-x-full"
                  }`}
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-4 right-4"
                >
                  <TfiClose className="text-2xl" />
                </button>
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLink to="/" onClick={() => setMenuOpen(false)}>
                    <Button text={"Home"} />
                  </NavLink>
                  <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                    <Button text={"About Us"} />
                  </NavLink>
                  <NavLink to="/disclaimer" onClick={() => setMenuOpen(false)}>
                    <Button text={"Disclaimer"} />
                  </NavLink>
                  <NavLink
                    to="/legal-resources"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Button text={"Legal Resources"} />
                  </NavLink>

                  {/* ============= Search Bar ================ */}
                  <div className="relative md:hidden">
                    <input
                      type="text"
                      maxLength={18}
                      className="py-3 md:py-4 pl-2 pr-4 w-[180px] md:w-[190px]  bg-[#E7E7E999] text-gray-700 rounded  outline-none "
                      placeholder="Search attorney..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pl-3">
                      <RiSearchLine
                        onClick={handleSearch}
                        className="w-10 h-8 pr-3 text-primary"
                      />
                    </span>
                  </div>
                  {/* Signup Button */}
                  <div className="bg-secondery/50 rounded-md py-3">
                    <div className="flex items-center gap-4">
                      {lawyerToken && Object.keys(lawyerData).length > 0 ? (
                        <Link to="/lawyer-profile">
                          <button
                            className="h-[48px] bg-primary rounded-[4px] text-[16px] 
                        text-[#FFFFFF] px-[24px] font-bold font-roboto flex items-center gap-2"
                          >
                            <span className="inline-flex items-center">
                              {lawyerData?.full_name}
                            </span>
                            <img
                              src={lawyerData?.avatar}
                              alt=""
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          </button>
                        </Link>
                      ) : userToken && Object.keys(userData).length > 0 ? (
                        <Link to="/user-profile">
                          <button
                            className="h-[48px] bg-primary rounded-[4px] text-[16px] 
                        text-[#FFFFFF] px-[24px] font-bold font-roboto flex items-center gap-2"
                          >
                            <span className="inline-flex items-center">
                              {userData?.full_name}
                            </span>
                            {userData?.avatar ? (
                              <img
                                src={userData?.avatar}
                                alt=""
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <img
                                src="/defaultImage.webp"
                                alt=""
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            )}
                          </button>
                        </Link>
                      ) : (
                        <Link to="/create-account">
                          <button
                            className="h-[48px] bg-primary rounded-2xl text-[16px] 
                            text-[#FFFFFF] px-[24px] font-bold font-roboto flex items-center  gap-2"
                          >
                            <span className="inline-flex items-center">
                              Create an Account
                            </span>
                            <span className="h-[20px] flex items-center">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.666 5C16.666 4.53976 16.2929 4.16667 15.8327 4.16667C15.3724 4.16667 14.9994 4.53976 14.9994 5V8.33333C14.9994 8.79357 15.3724 9.16667 15.8327 9.16667C16.2929 9.16667 16.666 8.79357 16.666 8.33333V5Z"
                                  fill="white"
                                />
                                <path
                                  d="M17.4994 5.83333H14.166C13.7058 5.83333 13.3327 6.20643 13.3327 6.66667C13.3327 7.1269 13.7058 7.5 14.166 7.5H17.4994C17.9596 7.5 18.3327 7.1269 18.3327 6.66667C18.3327 6.20643 17.9596 5.83333 17.4994 5.83333Z"
                                  fill="white"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.16602 11.6667C4.16602 10.7458 4.91768 10 5.84018 10H12.4918C13.4169 10 14.166 10.745 14.166 11.6717V15.3717C14.166 18.2092 4.16602 18.2092 4.16602 15.3717V11.6667Z"
                                  fill="white"
                                />
                                <path
                                  d="M9.16602 9.16667C11.007 9.16667 12.4993 7.67428 12.4993 5.83333C12.4993 3.99238 11.007 2.5 9.16602 2.5C7.32507 2.5 5.83268 3.99238 5.83268 5.83333C5.83268 7.67428 7.32507 9.16667 9.16602 9.16667Z"
                                  fill="white"
                                />
                              </svg>
                            </span>
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex lg:justify-center items-center">
                <div className="flex items-center space-x-4">
                  <NavLink to="/">
                    <Button text={"Home"} />
                  </NavLink>
                  <NavLink to="/about">
                    <Button text={"About Us"} />
                  </NavLink>
                  <NavLink to="/disclaimer">
                    <Button text={"Disclaimer"} />
                  </NavLink>
                  <NavLink to="/legal-resources">
                    <Button text={"Legal Resources"} />
                  </NavLink>
                </div>
              </div>

              {/* Desktop Signup/Login Button */}
              <div className="hidden lg:flex lg:justify-end">
                <div className="flex items-center gap-4">
                  {lawyerToken && Object.keys(lawyerData).length > 0 ? (
                    <Link to="/lawyer-profile">
                      <button
                        className="h-[48px] bg-primary rounded-[4px] text-[16px] 
                        text-[#FFFFFF] px-[24px] font-bold font-roboto flex items-center gap-2"
                      >
                        <span className="inline-flex items-center">
                          {lawyerData?.full_name}
                        </span>
                        <img
                          src={lawyerData?.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </button>
                    </Link>
                  ) : userToken && Object.keys(userData).length > 0 ? (
                    <Link to="/user-profile">
                      <button
                        className="h-[48px] bg-primary rounded-[4px] text-[16px] 
                        text-[#FFFFFF] px-[24px] font-bold font-roboto flex items-center gap-2"
                      >
                        <span className="inline-flex items-center">
                          {userData?.full_name}
                        </span>
                        {userData?.avatar ? (
                          <img
                            src={userData?.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <img
                            src="/defaultImage.webp"
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                      </button>
                    </Link>
                  ) : (
                    <Link to="/create-account">
                      <button
                        className="h-[48px] bg-primary rounded-2xl text-[16px] 
                            text-[#FFFFFF] px-[24px] font-bold font-roboto flex items-center gap-2"
                      >
                        <span className="inline-flex items-center">
                          Create an Account
                        </span>
                        <span className="h-[20px] flex items-center">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.666 5C16.666 4.53976 16.2929 4.16667 15.8327 4.16667C15.3724 4.16667 14.9994 4.53976 14.9994 5V8.33333C14.9994 8.79357 15.3724 9.16667 15.8327 9.16667C16.2929 9.16667 16.666 8.79357 16.666 8.33333V5Z"
                              fill="white"
                            />
                            <path
                              d="M17.4994 5.83333H14.166C13.7058 5.83333 13.3327 6.20643 13.3327 6.66667C13.3327 7.1269 13.7058 7.5 14.166 7.5H17.4994C17.9596 7.5 18.3327 7.1269 18.3327 6.66667C18.3327 6.20643 17.9596 5.83333 17.4994 5.83333Z"
                              fill="white"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.16602 11.6667C4.16602 10.7458 4.91768 10 5.84018 10H12.4918C13.4169 10 14.166 10.745 14.166 11.6717V15.3717C14.166 18.2092 4.16602 18.2092 4.16602 15.3717V11.6667Z"
                              fill="white"
                            />
                            <path
                              d="M9.16602 9.16667C11.007 9.16667 12.4993 7.67428 12.4993 5.83333C12.4993 3.99238 11.007 2.5 9.16602 2.5C7.32507 2.5 5.83268 3.99238 5.83268 5.83333C5.83268 7.67428 7.32507 9.16667 9.16602 9.16667Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
