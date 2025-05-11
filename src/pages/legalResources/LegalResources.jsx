import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadindSpenier from "../../components/shared/LoadindSpenier";
import { useNavigate } from "react-router-dom";

const LegalResources = () => {
  const axiosPublic = useAxiosPublic();
  const [resurcesData, setResurcesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const adminToken = Cookies.get("adminToken");

  // get request
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard users:", error);
        setLoading(false);
      });
  }, [adminToken]);

  const handleClick = (id) => {
    navigate(`/legal-resources-details/${id}`);
  };

  return (
    <div className="flex justify-center items-center pt-28 lg:pt-40 pb-16 min-h-[65vh] px-2">
      {loading ? (
        <div>
          <LoadindSpenier />
        </div>
      ) : (
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
                    {" "}
                    {item.description.length > 49
                      ? `${item.description.slice(0, 65)}.`
                      : item.description}
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
      )}
    </div>
  );
};

export default LegalResources;
