import { Button } from "antd";
import React from "react";
import { FiArrowDownRight, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const CustomNotFound = ({ offBack }) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-[400px]">
        <h1 className="lg:text-6xl md:text-1xl text-base font-bold text-gray-200 uppercase text-center">
          data not found
        </h1>
        {!offBack && (
          <div className="flex gap-2 items-center justify-center">
            <FiArrowLeft size={20} color="#1b69ad" />

            <Link className="text-primary" to={"/"}>
              Go Back
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomNotFound;
