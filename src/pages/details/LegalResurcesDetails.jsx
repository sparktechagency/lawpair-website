import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import LoadindSpenier from "../../components/shared/LoadindSpenier";

const LegalResurcesDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [legalData, setLegalData] = useState({});
  const [loading, setLoading] = useState(true);
  const { image, title, description } = legalData || {};

  console.log(description);
  const token = Cookies.get("adminToken");
  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(`/admin/legal-resources/${parseInt(id)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data?.legal_resource);
        setLegalData(response.data?.legal_resource);
      })
      .catch((error) => {
        console.error("Error fetching dashboard users:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }, [token, id]);

  return (
    <>
      {loading ? (
        <LoadindSpenier />
      ) : (
        <div className=" px-4 lg:px-0 pt-[100px] pb-4">
          <div className="max-w-4xl  mx-auto overflow-hidden bg-white rounded-lg shadow-md ">
            <img
              className="object-cover rounded-lg"
              src={image}
              alt="Article"
            />

            <div className="pt-6 lg:p-6">
              <div>
                <h1 className="block mt-2 text-xl font-bold text-gray-800 transition-colors duration-300 transform font-roboto">
                  {title}
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LegalResurcesDetails;
