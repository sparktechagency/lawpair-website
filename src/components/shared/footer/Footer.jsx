import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#10101e] ">
      <div className="">
        <h1 className="text-[#FFFFFF] font-crimson text-center pt-[45px] pb-[33px] text-[36px] font-bold">
          LawPair
        </h1>

        <div className="font-roboto text-[#FFFFFF]  pb-[27px] text-center space-y-3 md:space-y-0 md:space-x-[30px] flex flex-col md:flex-row justify-center items-center ">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/disclaimer">Disclaimer</a>
          <a href="/legal-resources">Legal Resources</a>
        </div>

        <div className="space-x-[30px] text-[#FFFFFF] flex justify-center pb-[40px]">
          <a href="https://www.facebook.com/profile.php?id=61573168173369">
            <FaFacebook className=" text-[20px] md:text-[36px]" />
          </a>
          <a href="https://www.instagram.com/@lawpair/">
            <FaInstagram className=" text-[20px] md:text-[36px]" />
          </a>
          <a href="https://www.linkedin.com/company/lawpair">
            <FaLinkedin className=" text-[20px] md:text-[36px]" />
          </a>
          <a href="https://x.com/@LawPairApp">
            <FaXTwitter className=" text-[20px] md:text-[36px]" />
          </a>
        </div>

        <hr className="border-[#B6B6BA]" />

        <div className="pt-[12px]">
          <p className="max-w-[1610px] mx-auto text-wrap px-4 lg:px-0 font-roboto text-center text-[12px] text-[#B6B6BA] leading-[32px]">
            {" "}
            Copyright © 2025, LawPair Asset Holder LLC. The information provided
            on this website is not and should not be considered legal advice. No
            attorney-client relationship is formed by or through use of this
            website. The attorney listings on this site may constitute attorney
            advertising. Use of this website constitutes acceptance of the
            LawPair Terms of Use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
