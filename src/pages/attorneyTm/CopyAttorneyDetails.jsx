
import { useEffect, useState } from "react";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import photo from "/attorney1.png";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdFormatListNumberedRtl, MdTextsms } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import LoadindSpenier from "../../components/shared/LoadindSpenier";
import { MdOutlineLocationCity } from "react-icons/md";
import { TbBuildingEstate } from "react-icons/tb";
import { PiFileZipBold } from "react-icons/pi";
import { LinkedinOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";



const AttorneyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const [lawyerData, setLawyerData] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const is_favoriteValue = queryParams.get("is_favorite");

  // token get in cookies
  const userToken = Cookies.get("userToken");

  // favorit list add
  const handleFavoriteList = async (id) => {
    const favoriteInfo = {
      lawyer_id: id,
    };

    if (userToken) {
      try {
        const response = await axiosPublic.post(
          "/user/mark-as-favorite",
          favoriteInfo,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: "application/json",
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          toast.success("Favorite successfully");
          navigate("/user-profile");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(`/lawyer/${id}`, {
        headers: {
          Authorization: `Berrer ${userToken}`,
        },
      })
      .then((response) => {
        setLawyerData(response?.data?.lawyer)
        setLoading(false);
      }
      )
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      });
  }, [id, userToken]);

  const handleNavigate = () => {
    navigate(-1);
  };

  const locationLink = window.location.href

  // const handleShareProfile = () => {
  //   const profileUrl = `https://your-domain.com/attorney-tm-details/${id}`;
  //   const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;

  //   // Open LinkedIn post composer in a new tab
  //   window.open(linkedinUrl, "_blank");
  // };

  console.log(lawyerData)

  const handleShareProfile = () => {
    try {
      const profileUrl = `${window.location.href}`;
      const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&shareUrl=${profileUrl}`;
      window.open(linkedinUrl, "_blank");

      // Try to use Web Share API if supported
      // if (navigator.share) {
      //   navigator
      //     .share({
      //       title: "Check out this profile",
      //       text: `Check out ${lawyerData?.first_name} ${lawyerData?.last_name}'s profile on LinkedIn.`,
      //       url: profileUrl,
      //     })
      //     .catch((error) => console.error("Error sharing via Web Share API:", error));
      // } else {
      //   window.open(linkedinUrl, "_blank");
      // }
    } catch (error) {
      console.error("Error sharing profile:", error);
      window.open(linkedinUrl, "_blank");
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 md:py-20">
      <Helmet>
        <title>{lawyerData?.full_name}</title>
        <meta property="og:title" content="Your Website Title Here" />
        <meta
          property="og:description"
          content="A short description of your website or page."
        />
        <meta property="og:image" content={lawyerData?.avatar} />
        <meta property="og:url" content="http://137.59.180.219:3005" />
        <meta property="og:type" content={lawyerData?.web_link} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Website Title Here" />
        <meta
          name="twitter:description"
          content="A short description of your website or page."
        />
        <meta
          name="twitter:image"
          content="http://137.59.180.219:3005/images/preview.jpg"
        />

        <meta name="full_name" content={lawyerData?.full_name} />
        <meta name="email" content={lawyerData?.email} />
        <meta name="phone" content={lawyerData?.phone_number} />
        <meta name="address" content={lawyerData?.address} />
        <meta name="language" content={lawyerData?.language} />
        <meta name="website" content={lawyerData?.web_link} />
        <meta name="linkedin" content={lawyerData?.linkedin_url} />
      </Helmet>
      {
        loading ? <p><LoadindSpenier /></p>
          :
          <div>
            <div className="max-w-[1037px] mx-auto overflow-hidden bg-white rounded-lg shadow-md p-4 mt-10">
              <div className="flex justify-between items-center md:items-start pb-[12px] ">
                <img
                  className="object-cover w-[124px] h-[124px] rounded-full"
                  src={lawyerData?.avatar || photo}
                  alt="Article"
                />

                <div className="flex flex-col md:flex-row items-center justify-between md:gap-10">
                  <p className="text-[14px] md:text-lg font-semibold font-poppins pt-4 text-end">Share this profile</p>
                  <div className="flex items-center gap-2">

                    <button onClick={handleShareProfile}>
                      <LinkedinOutlined className="text-md mt-1" />
                    </button>
                    <span>
                      {is_favoriteValue === "true" ? (
                        <svg
                          className="cursor-not-allowed "
                          width="24"
                          height="20"
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
                      ) : (
                        <svg
                          className="cursor-pointer "
                          onClick={() => handleFavoriteList(parseInt(id))}
                          width="24"
                          height="20"
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
                      )}
                    </span>

                    {/* email */}
                    <a href={`mailto:${lawyerData.email}?subject=Service Inquiry&body=${locationLink}`} target="_blank">
                      <CgMail className="text-2xl " />
                    </a>

                    {/* whats'app */}
                    <a href={`https://wa.me/${lawyerData.phone}?text=${locationLink}`} target="_blank">
                      <IoLogoWhatsapp className="text-xl text-[#25d366]" />
                    </a>

                    {/* sms */}
                    <a
                      href={`sms:${lawyerData.phone}?&body=${locationLink}`}
                      target="_blank"
                    >
                      <MdTextsms className="text-xl text-[#04b5f7]" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pb-[24px]">
                {lawyerData.full_name && <h1 className="text-[20px] font-bold font-roboto text-[#001018]">
                  {lawyerData.full_name}
                </h1>
                }

              </div>
              <hr />

              <div>
                <h2 className="font-roboto text-[16px] font-bold text-[#000000] pt-[24px]">
                  Contact details
                </h2>
                <div className=" pt-[8px]">
                  {lawyerData.phone && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">
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
                    {/* <p className="text-md font-semibold">Phone:</p> */}
                    <p>{lawyerData.phone}</p>
                  </div>
                  }

                  {lawyerData.email && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">
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
                    {/* <p className="text-md font-semibold">Email address:</p> */}
                    <p>  {lawyerData.email}</p>
                  </div>}


                  {lawyerData.practice_area && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">
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
                    {/* <p className="text-md font-semibold">Law firm name:</p> */}
                    <p> {lawyerData.practice_area}</p>
                  </div>}


                  <div>

                    {/* <strong className=" flex flex-row items-center gap-2 ">

                      <svg
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
                    </svg>

                      Address:</strong> */}
                    <div className=" pt-1 ">
                      <div className="pt-1">
                        <span>{lawyerData.address}</span>
                        <span>{lawyerData.city}</span>
                      </div>
                      <div className="flex flex-row items-center gap-2">

                        <p className="font-roboto text-[16px] text-[#10101E] pt-2">{lawyerData.state},</p>
                        <p className="font-roboto text-[16px] text-[#10101E] pt-2">{lawyerData.zipcode}</p>
                      </div>

                    </div>

                  </div>


                  {lawyerData.languages && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">
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
                    {/* <p className="text-md font-semibold">Languages:</p> */}
                    <p>{lawyerData.languages}</p>
                  </div>}

                  {
                    lawyerData?.web_link && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">
                      <p>
                        <Link
                          to={`${lawyerData.web_link}`}
                          className="text-primary underline"
                        >
                          {lawyerData.web_link}
                        </Link>
                      </p>
                    </div>
                  }
                  {
                    lawyerData?.linkedin_url && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">


                      <p>
                        <Link
                          to={`${lawyerData?.linkedin_url}`}
                          className="text-primary underline"
                        >
                          {lawyerData?.linkedin_url}
                        </Link>
                      </p>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default AttorneyDetails;
