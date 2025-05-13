import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Pagination, Table, Tag, Upload } from "antd";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import toast from "react-hot-toast";



const DashboardLegalResources = () => {
  const axiosPublic = useAxiosPublic();
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false)
  const [fileList, setFileList] = useState([])

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLegalResurces, setTotalLegalResurces] = useState(0);
  const [perPage, setPerPage] = useState(4);



  const handleUpload = ({ fileList }) => {
    if (fileList.length > 1) {
      message.error("You can only upload one image");
      return;
    }
    setFileList(fileList);
  }
  const token = Cookies.get("adminToken");






  const handleLegalResurce = async (values) => {
    // setloading(true)
    const formData = new FormData();

    // Append image file
    if (fileList && fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    formData.append("title", values.title);
    formData.append("description", values.description);





    // formData.forEach((value, key) => {
    //   console.log(`${key}:`, value);
    // })

    try {
      const response = await axiosPublic.post("/admin/store-legal-resource", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        toast.success('Legal resource created successfully')
        setData((prev) => [
          ...prev,
          {
            id: response?.data?.legal_resource?.id,
            image: response?.data?.legal_resource?.image,
            title: response?.data?.legal_resource?.title,
          }
        ])

        setFileList([]);
        form.resetFields();
      }
      else {
        toast.error('Failed. please try again')
      }


    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      // setloading(false)
    }
  };



  // get request 
  useEffect(() => {
    axiosPublic
      .get(`/admin/legal-resources/?per_page=${perPage}&page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data.legal_resources.data);
        setTotalLegalResurces(response.data.legal_resources.total);
      })
      .catch((error) => {
        console.error("Error fetching dashboard users:", error);
      });
  }, [token, perPage, currentPage, fileList]);


  const showDeleteModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };



  // delete request
  const handleDeleteLegalResurces = async () => {
    if (selectedRecord) {

      try {
        const response = await axiosPublic.delete(`/admin/delete-legal-resource/${selectedRecord.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (response.data.success) {
          toast.success('User deleted successfully')
        }
        else {
          toast.error("Deleted Failed")
        }

      } catch (error) {
        toast.error('Deleted Failed. please try again')
      }


      setData((prev) => prev.filter((item) => item.id !== selectedRecord.id));
      setTotalLegalResurces((prev) => prev - 1)

      if (data.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      setIsModalVisible(false);
      setSelectedRecord(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => <img src={image} alt="Legal Resource" style={{ width: "50px", height: "50px", objectFit: "cover" }} />,
      key: "image",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => {
        const words = text?.split(" ");
        const limitedText = words?.slice(0, 20)?.join(" ");
        return words?.length > 20 ? `${limitedText}...` : limitedText;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => showDeleteModal(record)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];



  return (
    <div className="bg-white p-4 rounded-lg max-w-full">
      <div>
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">Legal resources</h1>
        <p className="fontro text-[#B6B6BA] text-[12px] pb-3">Admin can add legal resources</p>
      </div>



      <Form form={form} onFinish={handleLegalResurce}>
        {/* upload image */}
        <div className="flex justify-center border border-[#B6B6BA] rounded-md mb-4 pt-5">
          <Form.Item
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList || []}
            rules={[
              {
                required: true,
                message: "Please upload an image",
              },
            ]}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              onChange={handleUpload}
              fileList={fileList}>

              {fileList.length >= 1 ? null : (
                <div style={{ textAlign: "center" }}>
                  <UploadOutlined style={{ fontSize: 24, }} />
                  <div>Upload photo</div>
                </div>
              )}

            </Upload>
          </Form.Item>
        </div>


        {/* title */}
        <div className="">
          <p className="font-roboto text-[#41414D] text-[14px]">Title</p>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter your title" }]}
          >
            <Input
              type="text"
              placeholder="Enter title"
              style={{ border: "1px solid #B6B6BA", padding: "10px" }}

            />
          </Form.Item>
        </div>

        {/* description */}
        <div className="">
          <p className="font-roboto text-[#41414D] text-[14px]">Description</p>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please enter your description" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter description"
              style={{ border: "1px solid #B6B6BA", padding: "10px" }}
            />
          </Form.Item>
        </div>

        <Button
          htmlType="submit"
          block
          style={{ backgroundColor: "#1E73BE", color: "white", fontFamily: "Roboto", padding: "24px", fontSize: "16px", fontWeight: "bold" }}
          loading={loading}
        >
          Add
        </Button>
      </Form>


      <div className="py-[40px]">
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">Preview update content:</h1>
      </div>

      {/* table components */}
      <div className="overflow-x-auto pt-3">
        <Table columns={columns} dataSource={data} pagination={false} rowKey="id" />
      </div>

      {/* pagination component */}
      {/* <Pagination
        current={currentPage}
        total={totalLegalResurces}
        pageSize={perPage}
        onChange={handlePageChange}
        showSizeChanger={false}
        align="end"
        className="my-4"
      /> */}
      <Pagination
        current={currentPage}
        pageSize={perPage}
        total={data?.data?.total || 0}
        onChange={(page, pageSize) => {
          setCurrentPage(page)
          setPerPage(pageSize)
        }}
        align="end"
        className="my-4"
      />


      <Modal
        title="Confirm Delete"
        open={isModalVisible}
        onOk={handleDeleteLegalResurces}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p className="text-lg text-gray-800">Are you sure you want to delete this legeal resurce?</p>
      </Modal>
    </div>
  )
}

export default DashboardLegalResources
