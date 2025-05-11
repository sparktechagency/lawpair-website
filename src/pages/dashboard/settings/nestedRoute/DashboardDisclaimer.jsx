import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button } from "antd";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import useDisclimerData from "../../../../hooks/useDisclimerData";

const DashboardDisclaimer = () => {
  const axiosPublic = useAxiosPublic();
  const [disclimerData, refetch] = useDisclimerData();
  const [content, setContent] = useState("");
  const editor = useRef(null);

  const adminToken = Cookies.get("adminToken");
  const handleUpdate = async () => {
    const disclaimerInfo = {
      disclaimer: content,
    };

    try {
      const response = await axiosPublic.post(
        "/admin/update-disclaimer",
        disclaimerInfo,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Disclaimer Content updated successfully");
      } else {
        toast.error("Failed. please try again");
      }
    } catch (error) {
      toast.error("Failed to update content", error);
    }
  };

  useEffect(() => {
    if (disclimerData?.disclaimer) {
      setContent(disclimerData?.disclaimer);
    }
  }, [disclimerData?.disclaimer]);

  return (
    <div className="bg-white p-4 rounded-lg max-w-full">
      <div>
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">
          Disclaimer
        </h1>
        <p className="fontro text-[#B6B6BA] text-[12px] pb-3">
          Admin can edit disclaimer
        </p>

        <div className="w-full mt-6">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => {
              console.log("Editor Content:", newContent);
              setContent(newContent);
            }}
          />
        </div>

        <Button
          htmlType="submit"
          block
          style={{
            backgroundColor: "#1E73BE",
            color: "white",
            fontFamily: "Roboto",
            padding: "24px",
            fontSize: "16px",
            fontWeight: "bold",
            margin: "10px 0px",
          }}
          onClick={handleUpdate}
        >
          Update
        </Button>

        {/* Preview updated content */}
        <div className="mt-4">
          <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">
            Preview update content:
          </h1>
          <p className="fontro text-[#B6B6BA] text-[12px] pb-3">
            Admin write about disclaimer
          </p>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardDisclaimer;
