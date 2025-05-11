import { useEffect, useState } from "react";
import { FaArrowLeft, FaHome, FaLinkedin } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import photo from "/attorney1.png";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdCorporateFare, MdFormatListNumberedRtl, MdTextsms } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import LoadindSpenier from "../../components/shared/LoadindSpenier";
import { MdOutlineLocationCity } from "react-icons/md";
import { TbBuildingEstate } from "react-icons/tb";
import { PiFileZipBold } from "react-icons/pi";
import { LinkedinOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import { LanguagesIcon, LocateIcon, MailIcon, PhoneIcon, Share, ShareIcon } from "lucide-react";
import { BsBackpackFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaShareFromSquare } from "react-icons/fa6";



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

  console.log('lawyerdata', lawyerData)

  // const handleShareProfile = () => {
  //   try {
  //     const profileUrl = `${window.location.href}`;
  //     const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&shareUrl=${profileUrl}`;
  //     window.open(linkedinUrl, "_blank");

  //     // Try to use Web Share API if supported
  //     if (navigator.share) {
  //       navigator
  //         .share({
  //           title: "Check out this profile",
  //           text: `Check out ${lawyerData?.first_name} ${lawyerData?.last_name}'s profile on LinkedIn.`,
  //           url: profileUrl,
  //         })
  //         .catch((error) => console.error("Error sharing via Web Share API:", error));
  //     } else {
  //       window.open(linkedinUrl, "_blank");
  //     }
  //   } catch (error) {
  //     console.error("Error sharing profile:", error);
  //     window.open(linkedinUrl, "_blank");
  //   }
  // };
  const handleShareProfile = () => {
    try {
      const profileUrl = `https://yourdomain.com/attorney-tm-details/${id}?is_favorite=false`;

      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;

      // Try to use Web Share API if supported
      if (navigator.share) {
        navigator
          .share({
            title: "Check out this profile",
            text: `Check out ${lawyerData?.first_name} ${lawyerData?.last_name}'s profile on LinkedIn.`,
            url: profileUrl,
          })
          .catch((error) => console.error("Error sharing via Web Share API:", error));
      } else {
        // Fallback: Open LinkedIn share in new tab
        window.open(linkedinUrl, "_blank");
      }
    } catch (error) {
      console.error("Error sharing profile:", error);
      window.open(linkedinUrl, "_blank");
    }
  };
  // const handleShared = () => {
  //   console.log('click')
  //   const shareUrl = `${window.location.origin}/attorney-tm-details/${id}`;

  //   navigator.clipboard.writeText(shareUrl)
  //     .then(() => {
  //       toast.success("Link copied to clipboard!");
  //     })
  //     .catch(() => {
  //       toast.error("Failed to copy link.");
  //     });

  // }
  return (
    <div className="container mx-auto px-4 py-8 md:py-20">
      <Helmet>
        <title>{lawyerData?.full_name}</title>

        <meta property="og:title" content={lawyerData?.full_name || "Attorney Profile"} />
        <meta
          property="og:description"
          content={`Explore the professional background of ${lawyerData?.full_name || "this attorney"}.`}
        />
        <meta property="og:image" content={lawyerData?.avatar || "fallback-image.jpg"} />
        <meta
          property="og:url"
          content={`http://137.59.180.219:3005/attorney-tm-details/${id}?is_favorite=false`}
        />
        <meta property="og:type" content="website" />

        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={lawyerData?.full_name || "Attorney Profile"} />
        <meta
          name="twitter:description"
          content={`Explore the professional background of ${lawyerData?.full_name || "this attorney"}.`}
        />
        <meta name="twitter:image" content={lawyerData?.avatar || "fallback-image.jpg"} />
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
                  {/* <button
                    onClick={() => handleShared()}
                    className=" text-[14px] md:text-lg font-semibold font-poppins pt-4 text-end">Share this profile</button> */}
                  {/* 
                  <div className="flex items-center gap-2">

                

                 
                    <a
                      href={`mailto:${lawyerData.email}?subject=${encodeURIComponent('Service Inquiry')}&body=${encodeURIComponent(locationLink)}`}
                    >
                      <CgMail className="text-2xl" />
                    </a>


                   
                    <a href={`https://wa.me/${lawyerData.phone}?text=${locationLink}`} target="_blank">
                      <IoLogoWhatsapp className="text-xl text-[#25d366]" />
                    </a>

                 
                    <a
                      href={`sms:${lawyerData.phone}?&body=${locationLink}`}
                      target="_blank"
                    >
                      <MdTextsms className="text-xl text-[#04b5f7]" />
                    </a>
                  </div> */}



                  <button onClick={handleShareProfile}>
                    <FaShareFromSquare className="text-[#0072B1]" size={36} />

                  </button>
                </div>
              </div>

              <div className="pb-[8px] border-b-2 border-gray-300 border-opacity-30 flex flex-row  gap-2">
                {lawyerData.full_name && <h1 className="text-[20px] font-bold font-roboto text-[#001018a1]">
                  {lawyerData.full_name}
                </h1>
                }
                <span>
                  {is_favoriteValue === "true" ? (
                    <svg
                      className="cursor-not-allowed "
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
                  ) : (
                    <svg
                      className="cursor-pointer "
                      onClick={() => handleFavoriteList(parseInt(id))}
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
                  )}
                </span>

              </div>


              <div className="pt-2">
                {/* <h2 className="font-roboto text-[16px] font-bold text-[#000000] pt-[24px]">
                  Contact details
                </h2> */}
                <div className=" pt-[8px]">
                  {lawyerData.phone && <div className="text-[16px] text-[#10101E] flex flex-row items-center gap-0 ">
                    <p><PhoneIcon size={20} /></p>
                    {/* <p className="text-md font-semibold">Phone:</p> */}
                    <p className="text-[#001018c4]">{lawyerData.phone}</p>
                  </div>
                  }

                  {lawyerData.email && <div className="text-[16px] text-[#10101E] flex flex-row items-center gap-1 ">
                    <p>  <MailIcon size={20} /> </p>
                    {/* <p className="text-md font-semibold">Email address:</p> */}
                    <p className="text-[#001018c4]">  {lawyerData.email}</p>
                  </div>}


                  {lawyerData.practice_area && <div className="text-[16px] text-[#10101E] flex flex-row items-center gap-1 ">
                    <p> <MdCorporateFare size={20} /> </p>
                    {/* <p className="text-md font-semibold">Law firm name:</p> */}
                    <p className="text-[#001018c4]"> {lawyerData.practice_area}</p>
                  </div>}


                  {
                    lawyerData && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-0 ">
                      <p> <CiLocationOn size={25} /> </p>


                      <p className="text-[#001018c4]">{lawyerData.address},{lawyerData.city},{lawyerData.state},{lawyerData.zipcode}</p>

                    </div>
                  }





                  {lawyerData.languages && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-1 ">
                    <p>
                      <LanguagesIcon className="text-[16px]" />
                    </p>
                    {/* <p className="text-md font-semibold">Languages:</p> */}
                    <p className="text-[#001018c4]">{lawyerData.languages}</p>
                  </div>}

                  {
                    lawyerData?.web_link && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-1 ">

                      <p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.856 5.45669L11.919 6.37669C11.8229 6.47007 11.7466 6.58177 11.6944 6.70518C11.6423 6.8286 11.6154 6.96121 11.6154 7.09519C11.6154 7.22917 11.6423 7.36178 11.6944 7.4852C11.7466 7.60861 11.8229 7.72031 11.919 7.81369C12.1146 8.00469 12.3771 8.11161 12.6505 8.11161C12.9239 8.11161 13.1864 8.00469 13.382 7.81369L14.366 6.84769C15.333 5.89769 16.908 5.71269 17.968 6.55969C18.2515 6.7833 18.484 7.06478 18.6501 7.38535C18.8162 7.70593 18.9121 8.05823 18.9313 8.41877C18.9505 8.77931 18.8926 9.13981 18.7615 9.47622C18.6304 9.81263 18.4291 10.1172 18.171 10.3697L15.268 13.2217C14.7738 13.704 14.1106 13.974 13.42 13.974C12.7294 13.974 12.0662 13.704 11.572 13.2217L10.462 12.1317L9.00001 13.5697L10.108 14.6587C11.93 16.4467 14.91 16.4467 16.73 14.6587L19.635 11.8067C20.0957 11.3543 20.455 10.8092 20.6892 10.2074C20.9234 9.60568 21.027 8.96106 20.9932 8.31625C20.9595 7.67144 20.7891 7.04116 20.4934 6.46715C20.1977 5.89315 19.7834 5.38852 19.278 4.98669C17.385 3.46969 14.583 3.76069 12.856 5.45669Z" fill="#10101E" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.144 19.5427L12.081 18.6227C12.1771 18.5293 12.2534 18.4176 12.3056 18.2942C12.3577 18.1708 12.3846 18.0382 12.3846 17.9042C12.3846 17.7702 12.3577 17.6376 12.3056 17.5142C12.2534 17.3908 12.1771 17.2791 12.081 17.1857C11.8855 16.995 11.6231 16.8883 11.35 16.8883C11.0769 16.8883 10.8145 16.995 10.619 17.1857L9.63401 18.1517C8.66701 19.1017 7.09201 19.2867 6.03201 18.4397C5.74853 18.2161 5.51599 17.9346 5.34988 17.614C5.18378 17.2935 5.08792 16.9411 5.06871 16.5806C5.0495 16.2201 5.10738 15.8596 5.23848 15.5232C5.36958 15.1868 5.5709 14.8822 5.82901 14.6297L8.73201 11.7777C9.22624 11.2954 9.88944 11.0254 10.58 11.0254C11.2706 11.0254 11.9338 11.2954 12.428 11.7777L13.538 12.8677L15 11.4297L13.892 10.3407C12.07 8.55269 9.09001 8.55269 7.27001 10.3407L4.36501 13.1927C3.9043 13.6451 3.54497 14.1902 3.31081 14.792C3.07666 15.3937 2.97303 16.0383 3.00678 16.6831C3.04053 17.3279 3.2109 17.9582 3.5066 18.5322C3.8023 19.1062 4.21658 19.6109 4.72201 20.0127C6.61501 21.5297 9.417 21.2387 11.144 19.5427Z" fill="#10101E" />
                        </svg>

                      </p>
                      <p>
                        <Link
                          target="_blank"
                          to={`${lawyerData.web_link}`}
                          className="text-[#001018c4] font-medium"
                        >
                          {lawyerData.web_link}
                        </Link>
                      </p>
                    </div>
                  }
                  {
                    lawyerData?.linkedin_url && <div className="text-[16px] text-[#10101E] lg:flex md:flex sm:flex flex-row items-center gap-3 ">

                      <p><FaLinkedin className="text-[#0072B1]" size={20} />
                      </p>
                      <p>
                        <Link
                          target="_blank"
                          to={`${lawyerData?.linkedin_url}`}
                          className="text-[#001018c4] font-medium"
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