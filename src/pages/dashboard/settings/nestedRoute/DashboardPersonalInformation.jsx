import { EnvironmentOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload, } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import useAdminProfileData from "../../../../hooks/useAdminProfile";
import { UploadCloud } from "lucide-react";




const DashboardPersonalInformation = () => {
  const axiosPublic = useAxiosPublic();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const [passwordForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ImageFileList, setImageFileList] = useState([]);
  const [adminProfileData, refetch] = useAdminProfileData();
  const { first_name, last_name, full_name, phone, email, avatar, address } = adminProfileData || {}


  useEffect(() => {
    if (adminProfileData) {
      form.setFieldsValue({
        ...adminProfileData,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        address: address,
      });
      if (adminProfileData?.avatar) {
        setImageFileList([
          {
            uid: "-1",
            name: "Existing Image",
            status: "done",
            url: adminProfileData.avatar,
          },
        ]);
      }
    }
  }, [adminProfileData, form]);













  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    passwordForm.submit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const token = Cookies.get("adminToken");

  const onFinish = async (values) => {
    setLoading(true)




    const formData = new FormData();

    if (ImageFileList.length > 0) {
      const uploadedFile = ImageFileList.find(file => file.originFileObj);

      if (uploadedFile) {
        formData.append("avatar", uploadedFile.originFileObj);
      }
    }


    formData.append("first_name", values["first_name"]);
    formData.append("last_name", values["last_name"]);
    formData.append("phone", values["phone"]);
    formData.append("address", values["address"]);





    // formData.forEach((value, key) => {
    //   console.log(`${key}:`, value);
    // })


    try {
      const response = await axiosPublic.post('/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json", "Content-Type": "multipart/form-data",
        },
      });
      console.log(response)
      if (response.data.success) {
        window.location.reload();
        toast.success('Profile updated successfully')
        form.resetFields();
        setFileList([]);
      } else {
        toast.error('The avatar must be less than 2MB.');
      }

      setIsModalOpen(false);
    } catch (errors) {
     if(errors){
     toast.error(errors?.message)
     }
    }finally{
       setLoading(false)
    }
  };





  const handleUpdatePassword = async (values) => {

    const passwordData = {
      old_password: values['old_password'],
      password: values['password'],
      password_confirmation: values['password_confirmation'],
    };

    console.log(passwordData)

    try {
      const response = await axiosPublic.post('/update-password', passwordData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });


      console.log(response.data)
      if (response.data.success) {
        toast.success('Password updated successfully')
        passwordForm.resetFields()
      } else {
        toast.error('Failled. please try again')
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error during password update');
      setIsModalOpen(false);
    }

    setIsModalOpen(false);
  };


  return (
    <div className="bg-white p-4 rounded-lg max-w-full">
      <div>
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">Settings</h1>
        <p className="fontro text-[#B6B6BA] text-[12px] pb-3">Admin can edit personal information</p>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>


        {/* upload image */}
        <div className="pb-4 w-full">
          <p className="text-[14px] font-roboto font-bold text-[#001018]">Upload profile photo</p>
          <div className="w-full ">
            <Form.Item
              className="md:col-span-2"
              name="image"
              rules={[
                {
                  required: ImageFileList?.length === 0,
                  message: "Image required",
                },
              ]}
            >
              <Upload
                beforeUpload={() => false}
                accept="image/*"
                maxCount={1}
                showUploadList={{ showPreviewIcon: true }}
                fileList={ImageFileList}
                onChange={({ fileList }) => setImageFileList(fileList)}
                listType="picture-card"
              >
                <div className="flex flex-col items-center">
                  <UploadCloud className="w-5 h-5 text-gray-400" />
                  <span className="mt-2">Choose File</span>
                </div>
              </Upload>
            </Form.Item>
            
            {/* <Form.Item
              className="md:col-span-2"
              name="image"
              rules={[
                {
                  required: ImageFileList?.length === 0,
                  message: "Image required",
                },
              ]}
            >
              <Upload
                beforeUpload={() => false}
                accept="image/*"
                maxCount={1}
                showUploadList={{ showPreviewIcon: true }}
                fileList={ImageFileList}
                onChange={({ fileList }) => setImageFileList(fileList)}
                listType="picture-card"
              >
                <div className="flex flex-col items-center">
                  <UploadCloud className="w-5 h-5 text-gray-400" />
                  <span className="mt-2">Choose File</span>
                </div>
              </Upload>
            </Form.Item> */}
          </div>
        </div>


        {/* first name & last name */}
        <div className="flex justify-between gap-3">
          <Form.Item
            name="first_name"
            // rules={[{ required: true, message: "Please enter your First name" }]}
            style={{ width: "50%" }}
          >
            <Input
              prefix={<UserOutlined />}
              type="text"
              placeholder="First name"
              style={{ border: "1px solid #B6B6BA", padding: "10px" }}

            />
          </Form.Item>

          <Form.Item
            name="last_name"
            // rules={[{ required: true, message: "Please enter your Last name" }]}
            style={{ width: "50%" }}
          >
            <Input
              prefix={<UserOutlined />}
              type="text"
              placeholder="Last name"
              style={{ border: "1px solid #B6B6BA", padding: "10px" }}
            />
          </Form.Item>
        </div>

        {/* contact number */}
        <div>
          <Form.Item
            name="phone"
          // rules={[{ required: true, message: "Please enter your contact number" }]}
          // style={{ width: "50%" }}
          >
            <Input
              prefix={<PhoneOutlined />}
              type="number"
              placeholder="Contact number"
              style={{ border: "1px solid #B6B6BA", padding: "10px" }}
            />
          </Form.Item>
        </div>

        {/* location */}
        <div>
          <Form.Item
            name="address"
          // rules={[{ required: true, message: "Please enter your Location" }]}
          // style={{ width: "50%" }}
          >
            <Input
              prefix={<EnvironmentOutlined />}
              type="text"
              placeholder="Location"
              style={{ border: "1px solid #B6B6BA", padding: "10px" }}
            />
          </Form.Item>
        </div>

        <Button
          htmlType="submit"
          block
          style={{ backgroundColor: "#1E73BE", color: "white", fontFamily: "Roboto", padding: "24px", fontSize: "16px", fontWeight: "bold" }}
        >
          {
            loading ? 'Loading......' : 'Save changes'
          }
        </Button>
      </Form>




      {/* update modal button */}
      <Button type="primary" onClick={showModal} style={{ backgroundColor: "#E9F1F9", color: "#1E73BE", fontFamily: "Roboto", padding: "24px", fontSize: "16px", fontWeight: "bold", width: "100%", margin: "30px 0px" }}>
        Update password form here
      </Button>







      {/* update password change modal */}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        width={600}
        okText="Update password"
        okButtonProps={{
          style: { width: "100%", backgroundColor: "#1b69ad", padding: "24px", color: "#FFFFF", borderRadius: "5px", fontSize: "16px", fontWeight: "bold", margin: "10px 0", }, // OK button style
        }}
        // cancel button display none
        cancelButtonProps={{
          style: { display: "none" },
        }}
      >
        {/* update password */}
        <Form form={passwordForm} layout="vertical" onFinish={handleUpdatePassword}>
          <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">Update password</h1>

          {/* Current password */}
          <div>
            <p className="font-roboto">Current password</p>
            <Form.Item
              name="old_password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Current password',
                },
              ]}
            >
              <Input.Password type="password" placeholder="Enter your current passowrd" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
            </Form.Item>
          </div>

          {/* New passowrd */}
          <div>
            <p className="font-roboto">new password</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password',
                },
              ]}
            >
              <Input.Password type="password" placeholder="Enter your new passowrd" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
            </Form.Item>
          </div>

          {/* Confirm passowrd */}
          <div>
            <p className="font-roboto">confirm password</p>
            <Form.Item
              name="password_confirmation"
              rules={[
                {
                  required: true,
                  message: 'Please input your confirm password',
                },
              ]}
            >
              <Input.Password type="password" placeholder="Enter your confirm passowrd" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default DashboardPersonalInformation;