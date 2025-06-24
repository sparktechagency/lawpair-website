import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const HomeLegalResources = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [resurcesData, setResurcesData] = useState([]);

  const adminToken = Cookies.get("adminToken");

  // get requestt 
  useEffect(() => {
    axiosPublic
      .get("/admin/legal-resources/?per_page=10", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setResurcesData(response.data.legal_resources.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard users:", error);
      });
  }, [adminToken]);

  const handleClick = (id) => {
    navigate(`/legal-resources-details/${id}`);
  };
  return (
    <div className="container mx-auto px-2 md:px-4 pb-[24px] lg:pb-[48px] md:pt-[30px] lg:pt-[96px]">
      <h1 className="font-roboto font-bold text-[24px] md:text-[32px] text-center py-[32px] text-primary">
        Free legal resources
      </h1>

      {/* Free legal resources cards */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {resurcesData.slice(0, 6).map((item, index) => {
            return (
              <div
                key={index}
                className="relative w-full h-full lg:w-[329px] lg:h-[306px] rounded"
              >
                <div className="w-full h-full lg:w-[329px] lg:h-[306px]">
                  <img
                    src={item.image}
                    alt="Your Legal Compass"
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 rounded-xl"></div>

                <div className="absolute bottom-2 left-0 p-[24px] w-full text-white">
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="text-sm">
                    <p className="text-sm">
                      {" "}
                      {item.description.length > 74
                        ? `${item.description.slice(0, 74)}.`
                        : item.description}
                    </p>
                  </p>
                  <button
                    onClick={() => handleClick(item.id)}
                    className="mt-3 bg-white text-black px-4 py-[14px] font-semibold rounded"
                  >
                    Read more
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeLegalResources;
