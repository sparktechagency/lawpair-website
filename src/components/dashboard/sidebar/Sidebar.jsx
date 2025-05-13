import { icons } from "antd/es/image/PreviewGroup";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { User2Icon } from "lucide-react";
import useAdminProfileData from "../../../hooks/useAdminProfileData";
import toast from "react-hot-toast";

const Sidebar = () => {
  const axiosPublic = useAxiosPublic();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [settingIconColor, setSettingIconColor] = useState(false);
  const navigate = useNavigate();
  const [adminData, refetch] = useAdminProfileData();

  const adminToken = Cookies.get("adminToken");

  // navigate founction
  const handleClick = () => {
    navigate("/");
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
    setSettingIconColor(!settingIconColor);
  };

  const menus = [
    {
      path: "/admin/dashboard",
      title: "Dashboard",
      icon1: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0Z"
            fill="#121221"
          />
        </svg>
      ),
      icon2: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 9V3H21V9H13ZM3 13V3H11V13H3ZM13 21V11H21V21H13ZM3 21V15H11V21H3Z"
            fill="#1E73BE"
          />
        </svg>
      ),
    },
    {
      path: "/admin/dashboard/add-categories",
      title: "Add categories",
      icon1: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_571_7860"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
            style={{ maskType: "alpha" }}
          >
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_571_7860)">
            <path
              d="M6.5 11L12 2L17.5 11H6.5ZM17.5 22C16.25 22 15.1875 21.5625 14.3125 20.6875C13.4375 19.8125 13 18.75 13 17.5C13 16.25 13.4375 15.1875 14.3125 14.3125C15.1875 13.4375 16.25 13 17.5 13C18.75 13 19.8125 13.4375 20.6875 14.3125C21.5625 15.1875 22 16.25 22 17.5C22 18.75 21.5625 19.8125 20.6875 20.6875C19.8125 21.5625 18.75 22 17.5 22ZM3 21.5V13.5H11V21.5H3Z"
              fill="#121221"
            />
          </g>
        </svg>
      ),
      icon2: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_571_7848"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_571_7848)">
            <path
              d="M6.5 11L12 2L17.5 11H6.5ZM17.5 22C16.25 22 15.1875 21.5625 14.3125 20.6875C13.4375 19.8125 13 18.75 13 17.5C13 16.25 13.4375 15.1875 14.3125 14.3125C15.1875 13.4375 16.25 13 17.5 13C18.75 13 19.8125 13.4375 20.6875 14.3125C21.5625 15.1875 22 16.25 22 17.5C22 18.75 21.5625 19.8125 20.6875 20.6875C19.8125 21.5625 18.75 22 17.5 22ZM3 21.5V13.5H11V21.5H3Z"
              fill="#1E73BE"
            />
          </g>
        </svg>
      ),
    },
    {
      path: "/admin/dashboard/manage-user",
      title: "Manage users",
      icon1: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 20 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 13V15H0V13C0 13 0 9.00004 7 9.00004C14 9.00004 14 13 14 13ZM10.5 3.50004C10.5 2.8078 10.2947 2.13111 9.91014 1.55554C9.52556 0.979969 8.97893 0.531365 8.33939 0.266459C7.69985 0.0015519 6.99612 -0.0677598 6.31718 0.0672885C5.63825 0.202337 5.01461 0.53568 4.52513 1.02516C4.03564 1.51465 3.7023 2.13829 3.56725 2.81722C3.4322 3.49615 3.50152 4.19989 3.76642 4.83943C4.03133 5.47897 4.47993 6.0256 5.0555 6.41018C5.63108 6.79477 6.30777 7.00004 7 7.00004C7.92826 7.00004 8.8185 6.63129 9.47487 5.97491C10.1313 5.31853 10.5 4.42829 10.5 3.50004ZM13.94 9.00004C14.5547 9.47578 15.0578 10.0805 15.4137 10.7715C15.7696 11.4626 15.9697 12.2233 16 13V15H20V13C20 13 20 9.37004 13.94 9.00004ZM13 3.67965e-05C12.3118 -0.00316434 11.6388 0.202568 11.07 0.590037C11.6774 1.43877 12.0041 2.45632 12.0041 3.50004C12.0041 4.54375 11.6774 5.5613 11.07 6.41004C11.6388 6.79751 12.3118 7.00324 13 7.00004C13.9283 7.00004 14.8185 6.63129 15.4749 5.97491C16.1313 5.31853 16.5 4.42829 16.5 3.50004C16.5 2.57178 16.1313 1.68154 15.4749 1.02516C14.8185 0.368786 13.9283 3.67965e-05 13 3.67965e-05Z"
            fill="#121221"
          />
        </svg>
      ),
      icon2: (
        <svg
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 13V15H0V13C0 13 0 9.00004 7 9.00004C14 9.00004 14 13 14 13ZM10.5 3.50004C10.5 2.8078 10.2947 2.13111 9.91014 1.55554C9.52556 0.979969 8.97893 0.531365 8.33939 0.266459C7.69985 0.0015519 6.99612 -0.0677598 6.31718 0.0672885C5.63825 0.202337 5.01461 0.53568 4.52513 1.02516C4.03564 1.51465 3.7023 2.13829 3.56725 2.81722C3.4322 3.49615 3.50152 4.19989 3.76642 4.83943C4.03133 5.47897 4.47993 6.0256 5.0555 6.41018C5.63108 6.79477 6.30777 7.00004 7 7.00004C7.92826 7.00004 8.8185 6.63129 9.47487 5.97491C10.1313 5.31853 10.5 4.42829 10.5 3.50004ZM13.94 9.00004C14.5547 9.47578 15.0578 10.0805 15.4137 10.7715C15.7696 11.4626 15.9697 12.2233 16 13V15H20V13C20 13 20 9.37004 13.94 9.00004ZM13 3.67965e-05C12.3118 -0.00316434 11.6388 0.202568 11.07 0.590037C11.6774 1.43877 12.0041 2.45632 12.0041 3.50004C12.0041 4.54375 11.6774 5.5613 11.07 6.41004C11.6388 6.79751 12.3118 7.00324 13 7.00004C13.9283 7.00004 14.8185 6.63129 15.4749 5.97491C16.1313 5.31853 16.5 4.42829 16.5 3.50004C16.5 2.57178 16.1313 1.68154 15.4749 1.02516C14.8185 0.368786 13.9283 3.67965e-05 13 3.67965e-05Z"
            fill="#1E73BE"
          />
        </svg>
      ),
    },
    {
      path: "#",
      title: "Settings",
      icon1: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.25001 22L8.85001 18.8C8.63335 18.7167 8.42935 18.6167 8.23801 18.5C8.04668 18.3833 7.85901 18.2583 7.67501 18.125L4.70001 19.375L1.95001 14.625L4.52501 12.675C4.50835 12.5583 4.50001 12.446 4.50001 12.338V11.663C4.50001 11.5543 4.50835 11.4417 4.52501 11.325L1.95001 9.375L4.70001 4.625L7.67501 5.875C7.85835 5.74167 8.05001 5.61667 8.25001 5.5C8.45001 5.38333 8.65001 5.28333 8.85001 5.2L9.25001 2H14.75L15.15 5.2C15.3667 5.28333 15.571 5.38333 15.763 5.5C15.955 5.61667 16.1423 5.74167 16.325 5.875L19.3 4.625L22.05 9.375L19.475 11.325C19.4917 11.4417 19.5 11.5543 19.5 11.663V12.337C19.5 12.4457 19.4833 12.5583 19.45 12.675L22.025 14.625L19.275 19.375L16.325 18.125C16.1417 18.2583 15.95 18.3833 15.75 18.5C15.55 18.6167 15.35 18.7167 15.15 18.8L14.75 22H9.25001ZM12.05 15.5C13.0167 15.5 13.8417 15.1583 14.525 14.475C15.2083 13.7917 15.55 12.9667 15.55 12C15.55 11.0333 15.2083 10.2083 14.525 9.525C13.8417 8.84167 13.0167 8.5 12.05 8.5C11.0667 8.5 10.2373 8.84167 9.56201 9.525C8.88668 10.2083 8.54935 11.0333 8.55001 12C8.55068 12.9667 8.88835 13.7917 9.56301 14.475C10.2377 15.1583 11.0667 15.5 12.05 15.5Z"
            fill="#121221"
          />
        </svg>
      ),
      icon2: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.25001 22L8.85001 18.8C8.63335 18.7167 8.42935 18.6167 8.23801 18.5C8.04668 18.3833 7.85901 18.2583 7.67501 18.125L4.70001 19.375L1.95001 14.625L4.52501 12.675C4.50835 12.5583 4.50001 12.446 4.50001 12.338V11.663C4.50001 11.5543 4.50835 11.4417 4.52501 11.325L1.95001 9.375L4.70001 4.625L7.67501 5.875C7.85835 5.74167 8.05001 5.61667 8.25001 5.5C8.45001 5.38333 8.65001 5.28333 8.85001 5.2L9.25001 2H14.75L15.15 5.2C15.3667 5.28333 15.571 5.38333 15.763 5.5C15.955 5.61667 16.1423 5.74167 16.325 5.875L19.3 4.625L22.05 9.375L19.475 11.325C19.4917 11.4417 19.5 11.5543 19.5 11.663V12.337C19.5 12.4457 19.4833 12.5583 19.45 12.675L22.025 14.625L19.275 19.375L16.325 18.125C16.1417 18.2583 15.95 18.3833 15.75 18.5C15.55 18.6167 15.35 18.7167 15.15 18.8L14.75 22H9.25001ZM12.05 15.5C13.0167 15.5 13.8417 15.1583 14.525 14.475C15.2083 13.7917 15.55 12.9667 15.55 12C15.55 11.0333 15.2083 10.2083 14.525 9.525C13.8417 8.84167 13.0167 8.5 12.05 8.5C11.0667 8.5 10.2373 8.84167 9.56201 9.525C8.88668 10.2083 8.54935 11.0333 8.55001 12C8.55068 12.9667 8.88835 13.7917 9.56301 14.475C10.2377 15.1583 11.0667 15.5 12.05 15.5Z"
            fill="#1E73BE"
          />
        </svg>
      ),
      hasDropdown: true,
      dropdownItems: [
        {
          path: "/admin/dashboard/setting/personal-information",
          title: "Personal Information",
        },
        {
          path: "/admin/dashboard/setting/about-us",
          title: "About Us",
        },
        {
          path: "/admin/dashboard/setting/disclai-mer",
          title: "Disclaimer",
        },
        {
          path: "/admin/dashboard/setting/legal-re-sources",
          title: "Legal Resources",
        },
      ],
    },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, Logout",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosPublic.get("/logout", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            Accept: "application/json",
            // ✅ Send token in Authorization header
          },
        });
        console.log(response)
        if (response.data.success) {
          Cookies.remove("adminToken");
          navigate("/admin/dashboard/login");
        }
      } catch (error) {
        toast.error(error.message, "Logged out Failed");
      }
    }
  };




  return (
    <>
      <div className="h-full hidden lg:flex flex-col justify-between  mx-4">
        <div>
          <img
            onClick={handleClick}
            src="/logo.png"
            alt="logo"
            className="w-full object-contain pt-6 cursor-pointer"
          />
          {/* sidebar menu */}
          <ul className="h-full flex flex-col gap-4 pt-8 py-2">
            {menus.map((menu, index) => (
              <li key={index} className="mb-2">
                {menu.hasDropdown ? (
                  <>
                    <NavLink
                      onClick={() => toggleDropdown(index)}
                      className="flex justify-between items-center w-full px-4 py-2 hover:text-primary font-roboto"
                    >
                      <span
                        className={`flex items-center gap-2 font-roboto ${
                          settingIconColor ? "text-primary font-bold" : ""
                        }`}
                      >
                        {settingIconColor ? menu.icon2 : menu.icon1}
                        {menu.title}
                      </span>
                      <span>
                        {openDropdown === index ? (
                          <IoIosArrowDown />
                        ) : (
                          <IoIosArrowUp />
                        )}
                      </span>
                    </NavLink>

                    {openDropdown === index && (
                      <ul className="mt-2 rounded">
                        {menu.dropdownItems.map((item, idx) => (
                          <li key={idx} className="px-6 py-2 ">
                            <NavLink
                              to={item.path}
                              className={({ isActive }) =>
                                `block px-4 py-2 rounded ${
                                  isActive
                                    ? "bg-[#e9f1f9] text-primary text-[14px] font-bold"
                                    : "  hover:bg-[#e9f1f9]"
                                }`
                              }
                            >
                              {item.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={menu.path}
                    end={menu.path === "/admin/dashboard"}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded ${
                        isActive
                          ? "bg-[#e9f1f9] text-primary font-bold flex items-center gap-2"
                          : "  hover:bg-[#e9f1f9] flex items-center gap-2"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? menu.icon2 : menu.icon1}
                        <span>{menu.title}</span>
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <button className="bg-[#b9d4eb] rounded-md flex justify-between items-center w-full px-1 py-2">
            <div className="flex items-center gap-2">
              {adminData.avatar ? (
                <img
                  src={adminData?.avatar}
                  alt="avater"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <span>
                  <User2Icon size={30} />
                </span>
              )}
              <span className="font-roboto text-sm font-bold">
                {adminData?.full_name}
              </span>
            </div>
            <div>
              <svg
                onClick={handleLogout}
                className="cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
                  fill="#EF436B"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/*============== mobile device ============ */}
      <div className="lg:hidden">
        <div>
          {/* sidebar menu */}
          <ul className="h-full flex flex-col gap-4 pt-8 py-2">
            {menus.map((menu, index) => (
              <li key={index} className="mb-2">
                {menu.hasDropdown ? (
                  <>
                    <NavLink
                      onClick={() => toggleDropdown(index)}
                      className="flex justify-between items-center w-full px-4 py-2 hover:text-primary font-roboto"
                    >
                      <span
                        className={`flex items-center gap-2 font-roboto ${
                          settingIconColor ? "text-primary font-bold" : ""
                        }`}
                      >
                        {settingIconColor ? menu.icon2 : menu.icon1}
                        {menu.title}
                      </span>
                      <span>
                        {openDropdown === index ? (
                          <IoIosArrowDown />
                        ) : (
                          <IoIosArrowUp />
                        )}
                      </span>
                    </NavLink>

                    {openDropdown === index && (
                      <ul className="mt-2 rounded">
                        {menu.dropdownItems.map((item, idx) => (
                          <li key={idx} className="px-6 py-2 ">
                            <NavLink
                              to={item.path}
                              className={({ isActive }) =>
                                `block px-4 py-2 rounded ${
                                  isActive
                                    ? "bg-[#e9f1f9] text-primary text-[14px] font-bold"
                                    : "  hover:bg-[#e9f1f9]"
                                }`
                              }
                            >
                              {item.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={menu.path}
                    end={menu.path === "/admin/dashboard"}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded ${
                        isActive
                          ? "bg-[#e9f1f9] text-primary font-bold flex items-center gap-2"
                          : "  hover:bg-[#e9f1f9] flex items-center gap-2"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? menu.icon2 : menu.icon1}
                        <span>{menu.title}</span>
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <button className="bg-[#b9d4eb] rounded-md flex justify-between items-center w-full px-1 py-2">
            <div className="flex items-center gap-2">
              {adminData.avatar ? (
                <img
                  src={adminData?.avatar}
                  alt="avater"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <span>
                  <User2Icon size={30} />
                </span>
              )}
              <span className="font-roboto text-sm font-bold">
                {adminData?.full_name}
              </span>
            </div>
            <div>
              <svg
                onClick={handleLogout}
                className="cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
                  fill="#EF436B"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
