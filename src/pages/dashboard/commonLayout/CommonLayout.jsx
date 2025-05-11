import { FaRegEye, FaUserGroup } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaBalanceScale } from "react-icons/fa";
import Chart from "../charts/Chart";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const CommonLayout = () => {
  const axiosPublic = useAxiosPublic();
  const [count, setCount] = useState({});
  const [chartValue, setChartValue] = useState([]);
  const [userType, setUserType] = useState("total_users");
  const [curdTitle, setCurdTitle] = useState("Total Users");
  const [selectedYear, setSelectedYear] = useState(null);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    setYears([currentYear, previousYear]);
    setSelectedYear(currentYear); // Default latest year
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const dashboardAllData = [
    {
      icon1: (
        <svg
          width="36"
          height="31"
          viewBox="0 0 36 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="31" rx="8" fill="#B9D4EB" />
          <path
            d="M22 21V23H8V21C8 21 8 17 15 17C22 17 22 21 22 21ZM18.5 11.5C18.5 10.8078 18.2947 10.1311 17.9101 9.55554C17.5256 8.97997 16.9789 8.53137 16.3394 8.26646C15.6999 8.00155 14.9961 7.93224 14.3172 8.06729C13.6382 8.20234 13.0146 8.53568 12.5251 9.02516C12.0356 9.51465 11.7023 10.1383 11.5673 10.8172C11.4322 11.4962 11.5015 12.1999 11.7664 12.8394C12.0313 13.479 12.4799 14.0256 13.0555 14.4102C13.6311 14.7948 14.3078 15 15 15C15.9283 15 16.8185 14.6313 17.4749 13.9749C18.1313 13.3185 18.5 12.4283 18.5 11.5ZM21.94 17C22.5547 17.4758 23.0578 18.0805 23.4137 18.7715C23.7696 19.4626 23.9697 20.2233 24 21V23H28V21C28 21 28 17.37 21.94 17ZM21 8.00004C20.3118 7.99684 19.6388 8.20257 19.07 8.59004C19.6774 9.43877 20.0041 10.4563 20.0041 11.5C20.0041 12.5438 19.6774 13.5613 19.07 14.41C19.6388 14.7975 20.3118 15.0032 21 15C21.9283 15 22.8185 14.6313 23.4749 13.9749C24.1313 13.3185 24.5 12.4283 24.5 11.5C24.5 10.5718 24.1313 9.68154 23.4749 9.02516C22.8185 8.36879 21.9283 8.00004 21 8.00004Z"
            fill="#164D8E"
          />
        </svg>
      ),
      icon2: (
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.00004 3.50003H15V10.5H14V5.20714L8.00004 11.2071L5.00004 8.20714L0.853591 12.3536L0.146484 11.6465L5.00004 6.79292L8.00004 9.79292L13.2929 4.50003H8.00004V3.50003Z"
            fill="#28A745"
          />
        </svg>
      ),
      name: "Total Users",
      subscribe: count.total_users,
      title: "0.5 increase in last 7 days",
    },
    {
      icon1: (
        <svg
          width="36"
          height="31"
          viewBox="0 0 36 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="1.52588e-05" width="36" height="31" rx="8" fill="#B9D4EB" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18 5.75002C18.1989 5.75002 18.3896 5.82903 18.5303 5.96969C18.671 6.11034 18.75 6.3011 18.75 6.50002V7.25602C21.8253 7.30138 24.8895 7.63619 27.902 8.25602C28.0844 8.29306 28.2466 8.39663 28.3569 8.54659C28.4672 8.69655 28.5178 8.88219 28.4988 9.06739C28.4799 9.25259 28.3927 9.42412 28.2543 9.54863C28.1159 9.67313 27.9361 9.7417 27.75 9.74102H25.832L28.306 19.865C28.3456 20.0268 28.3303 20.1972 28.2624 20.3493C28.1945 20.5014 28.0779 20.6265 27.931 20.705C26.9528 21.2294 25.8598 21.5026 24.75 21.5C23.6402 21.5026 22.5471 21.2294 21.569 20.705C21.4221 20.6265 21.3055 20.5014 21.2376 20.3493C21.1697 20.1972 21.1543 20.0268 21.194 19.865L23.668 9.74102H18.75V23.021C20.043 23.097 21.284 23.364 22.447 23.797C22.6119 23.8583 22.75 23.9757 22.8372 24.1285C22.9243 24.2813 22.955 24.46 22.9237 24.6331C22.8925 24.8063 22.8014 24.9629 22.6664 25.0757C22.5313 25.1885 22.3609 25.2502 22.185 25.25H13.815C13.639 25.2502 13.4686 25.1885 13.3336 25.0757C13.1985 24.9629 13.1074 24.8063 13.0762 24.6331C13.045 24.46 13.0756 24.2813 13.1628 24.1285C13.2499 23.9757 13.3881 23.8583 13.553 23.797C14.715 23.364 15.957 23.097 17.25 23.022V9.74002H12.332L14.806 19.864C14.8456 20.0258 14.8303 20.1962 14.7624 20.3483C14.6945 20.5004 14.5779 20.6255 14.431 20.704C13.4529 21.2287 12.3599 21.5023 11.25 21.5C10.1402 21.5026 9.0471 21.2294 8.06897 20.705C7.92206 20.6265 7.80547 20.5014 7.73757 20.3493C7.66967 20.1972 7.65433 20.0268 7.69397 19.865L10.168 9.74102H8.24997C8.0638 9.7417 7.88403 9.67313 7.74562 9.54863C7.60721 9.42412 7.52005 9.25259 7.50109 9.06739C7.48214 8.88219 7.53274 8.69655 7.64306 8.54659C7.75337 8.39663 7.91552 8.29306 8.09797 8.25602C11.1105 7.63619 14.1747 7.30138 17.25 7.25602V6.50002C17.25 6.3011 17.329 6.11034 17.4696 5.96969C17.6103 5.82903 17.8011 5.75002 18 5.75002ZM22.878 19.293L24.75 11.631L26.622 19.293H22.878ZM13.122 19.293L11.25 11.631L9.37797 19.293H13.122Z"
            fill="#164D8E"
          />
        </svg>
      ),
      icon2: (
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.00004 3.50003H15V10.5H14V5.20714L8.00004 11.2071L5.00004 8.20714L0.853591 12.3536L0.146484 11.6465L5.00004 6.79292L8.00004 9.79292L13.2929 4.50003H8.00004V3.50003Z"
            fill="#28A745"
          />
        </svg>
      ),
      name: "Lawyers",
      subscribe: count.total_lawyers,
      title: "0.5 increase in last 7 days",
    },
    {
      icon1: (
        <svg
          width="36"
          height="31"
          viewBox="0 0 36 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="31" rx="8" fill="#B9D4EB" />
          <path
            d="M18.1 24.5C17.8167 24.5 17.5793 24.404 17.388 24.212C17.1967 24.02 17.1007 23.7827 17.1 23.5C17.1 23.3833 17.125 23.2623 17.175 23.137C17.225 23.0117 17.3 22.8993 17.4 22.8L22.025 18.175L21.3 17.45L16.7 22.075C16.6 22.175 16.4917 22.25 16.375 22.3C16.2583 22.35 16.1333 22.375 16 22.375C15.7167 22.375 15.4793 22.2793 15.288 22.088C15.0967 21.8967 15.0007 21.659 15 21.375C15 21.2083 15.025 21.0707 15.075 20.962C15.125 20.8533 15.1917 20.7577 15.275 20.675L19.9 16.05L19.2 15.35L14.575 19.95C14.475 20.05 14.3667 20.125 14.25 20.175C14.1333 20.225 14 20.25 13.85 20.25C13.5833 20.25 13.35 20.15 13.15 19.95C12.95 19.75 12.85 19.5167 12.85 19.25C12.85 19.1167 12.875 18.9917 12.925 18.875C12.975 18.7583 13.05 18.65 13.15 18.55L17.775 13.925L17.05 13.225L12.45 17.85C12.3667 17.9333 12.2667 18 12.15 18.05C12.0333 18.1 11.8917 18.125 11.725 18.125C11.4417 18.125 11.204 18.029 11.012 17.837C10.82 17.645 10.7243 17.4077 10.725 17.125C10.725 16.9917 10.75 16.8667 10.8 16.75C10.85 16.6333 10.925 16.525 11.025 16.425L16.6 10.85L20.35 14.625C20.5333 14.8083 20.75 14.9543 21 15.063C21.25 15.1717 21.5 15.2257 21.75 15.225C22.2833 15.225 22.75 15.0377 23.15 14.663C23.55 14.2883 23.75 13.809 23.75 13.225C23.75 12.9917 23.7083 12.75 23.625 12.5C23.5417 12.25 23.3917 12.0167 23.175 11.8L18.7 7.325C18.9833 7.05834 19.3 6.85434 19.65 6.713C20 6.57167 20.35 6.50067 20.7 6.5C21.1333 6.5 21.5333 6.571 21.9 6.713C22.2667 6.855 22.6 7.07567 22.9 7.375L27.125 11.625C27.425 11.925 27.646 12.2583 27.788 12.625C27.93 12.9917 28.0007 13.4167 28 13.9C28 14.2333 27.925 14.571 27.775 14.913C27.625 15.255 27.4083 15.5673 27.125 15.85L18.8 24.2C18.6667 24.3333 18.55 24.4167 18.45 24.45C18.35 24.4833 18.2333 24.5 18.1 24.5ZM9.525 16.5L8.875 15.85C8.59167 15.5833 8.375 15.2667 8.225 14.9C8.075 14.5333 8 14.15 8 13.75C8 13.3167 8.08333 12.9167 8.25 12.55C8.41667 12.1833 8.625 11.875 8.875 11.625L13.1 7.375C13.3667 7.10834 13.6833 6.89567 14.05 6.737C14.4167 6.57834 14.775 6.49934 15.125 6.5C15.575 6.5 15.975 6.56267 16.325 6.688C16.675 6.81334 17.0167 7.04234 17.35 7.375L22.475 12.5C22.575 12.6 22.65 12.7083 22.7 12.825C22.75 12.9417 22.775 13.0667 22.775 13.2C22.775 13.4667 22.675 13.7 22.475 13.9C22.275 14.1 22.0417 14.2 21.775 14.2C21.625 14.2 21.5 14.1793 21.4 14.138C21.3 14.0967 21.1917 14.0173 21.075 13.9L16.575 9.45L9.525 16.5Z"
            fill="#164D8E"
          />
        </svg>
      ),
      icon2: (
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.146484 4.35356L0.853591 3.64645L5.00004 7.7929L8.00004 4.7929L14 10.7929V5.50001H15V12.5H8.00004V11.5H13.2929L8.00004 6.20711L5.00004 9.20711L0.146484 4.35356Z"
            fill="#B73838"
          />
        </svg>
      ),
      name: "Clients",
      subscribe: count.total_clients,
      title: "0.5 increase in last 7 days",
    },
  ];
  const handleClick = (name) => {
    let itemValue = {};
    if (name?.name === "Lawyers") {
      itemValue = { category: "Lawyers" };
      setCurdTitle(name?.name);
    } else if (name?.name === "Total Users") {
      itemValue = { category: "total_users" };
      setCurdTitle(name?.name);
    } else if (name?.name === "Clients") {
      itemValue = { category: "Clients" };
      setCurdTitle(name?.name);
    }
    setUserType(itemValue.category);
  };

  const token = Cookies.get("adminToken");
  useEffect(() => {
    if (selectedYear) {
      axiosPublic
        .get(`/admin/dashboard?user_type=${userType}&year=${selectedYear}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          setCount(response.data?.usersCount);
          setChartValue(response.data?.data);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        });
    }
  }, [token, selectedYear, userType]);

  return (
    <div>
      <div className="flex items-center gap-2 pb-[20px]">
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">
          Hello, Papatundee
        </h1>
        <img src="/logo/hand.png" alt="" />
      </div>
      <div className="bg-[#FFFFFF] p-4 rounded-lg">
        <div className="pb-[24px]">
          <h2 className="font-roboto text-[16px] text-[#41414D]">Overview</h2>
          <p className="text-[12px] font-roboto text-[#929299]">
            Activities summary at a glance
          </p>
        </div>

        {/* main div here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[23px] ">
          {dashboardAllData.map((item, index) => {
            return (
              <div
                onClick={() => handleClick(item)}
                key={index}
                className="h-[151px] p-5 border rounded-lg hover:border-2 hover:border-primary transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex items-center gap-1 pb-[12px]">
                  {item.icon1}
                  <h1 className="font-roboto text-[18px] font-bold">
                    {item.name}
                  </h1>
                </div>
                <div className="flex items-center gap-2 pb-[4px]">
                  <h1 className="font-roboto text-[26px] font-bold">
                    {item.subscribe || 0}
                  </h1>
                  {item.icon2}
                </div>
                {/* <p className="font-roboto text[12px]">{item.title}</p> */}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2></h2>
        {/* Year Select Dropdown */}
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="bg-transparent outline-none border p-2"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* dynamic chart */}
      <Chart chartValue={chartValue} curdTitle={curdTitle} />
    </div>
  );
};

export default CommonLayout;
