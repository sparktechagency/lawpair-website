import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Table, Modal, Pagination, message } from "antd";
import Upload from "antd/es/upload/Upload";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";


const AddCategories = () => {
  const [updateCategorieId, setUpdateCategorieId] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [updateData, setUpdateData] = useState({})

  const [fileList, setFileList] = useState([]);
  const [categorieData, setCategorieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const perPage = 4;



  const token = Cookies.get("adminToken");


  // single categorie data get
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosPublic.get(`/admin/categories/${updateCategorieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept": "application/json"
          // ✅ Send token in Authorization header
        }
      })
      setUpdateData(res.data?.category)
    }
    fetchData()
  }, [updateCategorieId])



  const columns = [
    {
      key: "1",
      title: "Image",
      dataIndex: "image_icon",
      render: (image_icon, record) => (
        <img
          src={image_icon}
          alt="Category"
          className="w-12 h-12 object-cover rounded-md max-w-full max-h-full"
        />
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (name) => (
        <span>{name?.length > 20 ? `${name?.slice(0, 20)}...` : name}</span>
      ),
    },
    {
      key: "2",
      title: "Description",
      dataIndex: "description",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (text) => (
        <span>{text?.length > 20 ? `${text?.slice(0, 20)}...` : text}</span>
      ),
    },
    {
      key: "4",
      title: "Action",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (record) => (
        <div className="flex gap-2 items-center">
          <Button type="primary" danger onClick={() => showDeleteModal(record)}>
            <DeleteOutlined />
          </Button>
          <Button type="primary" onClick={() => showUpdateModal(record)} className="hidden">
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const showDeleteModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  // update modal 
  const categorieUpdateForm = (values) => {
    console.log(updateCategorieId)
    console.log(values)
  }
  const showUpdateModal = (record) => {
    setUpdateCategorieId(record?.id)
    setUpdateModalOpen(true)
  }

  const handleOkUpdateModal = () => {
    updateForm.submit()
  }
  const handleCancelUpdateModal = () => {
    setUpdateModalOpen(false)
  }

  // delete request
  const handleDeleteCategorie = async () => {
    if (selectedRecord) {
      try {
        const response = await axiosPublic.delete(
          `/admin/delete-category/${selectedRecord.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.data.success) {
          toast.success("Category deleted successfully");
          setCategorieData((prev) =>
            prev.filter((item) => item.id !== selectedRecord.id)
          );
          setTotalCategories((prev) => prev - 1);
        } else {
          toast.error("Failed to delete category.");
        }
      } catch (error) {
        toast.error("Error deleting category. Please try again.");
      }

      setIsModalVisible(false);
      setSelectedRecord(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpload = ({ fileList }) => {
    if (fileList?.length > 1) {
      message.error("You can only upload one image");
      return;
    }
    setFileList(fileList);
  };

  // post request
  const handleCategorie = async (values) => {
    const formData = new FormData();

    if (fileList && fileList.length > 0) {
      formData.append("image_icon", fileList[0].originFileObj);
    }

    formData.append("name", values.name);
    formData.append("description", values.description);

    try {
      const response = await axiosPublic.post(
        "/admin/store-category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Update the categorieData directly
        setCategorieData((prevData) => [
          ...prevData,
          {
            id: response.data.category.id,
            image_icon: response.data.category.image_icon,
            name: response.data.category.name,
            description: response.data.category.description,
          },
        ]);
        setTotalCategories((prev) => prev + 1);
        form.resetFields();
        setFileList([]);
      } else {
        toast.error("Category upload failed.");
      }
    } catch (error) {
      toast.error("Please upload an png or svg image");
    }
  };

  // get request
  useEffect(() => {
    axiosPublic
      .get(`/admin/categories?per_page=${perPage}&page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setCategorieData(response.data.categories.data);
        setTotalCategories(response.data.categories.total);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [token, currentPage, fileList]);







  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-4 rounded-lg max-w-full">
      <div>
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">
          Add Categories
        </h1>
        <p className="fontro text-[#B6B6BA] text-[12px] pb-3">
          Admin can add categories
        </p>
      </div>

      {/* Form */}
      <div className="pt-3">
        <Form form={form} onFinish={handleCategorie}>
          {/* Upload Image */}
          <div className="flex justify-center border border-[#B6B6BA] rounded-md mb-2 pt-5">
            <Form.Item
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList || []}
              rules={[
                {
                  required: true,
                  message: "Please upload an png or svg image",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                onChange={handleUpload}
                fileList={fileList}
              >
                {fileList?.length >= 1 ? null : (
                  <div style={{ textAlign: "center" }}>
                    <UploadOutlined style={{ fontSize: 24 }} />
                    <div>Upload photo</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>

          {/* Category Name */}
          <div className="pt-4">
            <p className="font-roboto text-[#41414D] text-[14px]">
              Category Name
            </p>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please enter your category name" },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter title"
                className="border border-[#b6b6ba83] px-3 py-2 w-full"
              />
            </Form.Item>
          </div>

          <div className="pt-4">
            <p className="font-roboto text-[#41414D] text-[14px]">
              Description
            </p>
            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Please enter your description" },
              ]}
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
            style={{
              backgroundColor: "#1E73BE",
              color: "white",
              fontFamily: "Roboto",
              padding: "24px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Add
          </Button>
        </Form>
      </div>

      {/* Preview Section */}
      <h1 className="font-roboto text-[20px] md:text-3xl font-bold text-[#10101E] pt-6">
        Preview Update Content:{" "}
      </h1>

      <div className="overflow-x-auto pt-3">
        <Table
          columns={columns}
          dataSource={categorieData}
          pagination={false}
          className="w-full"
        />

        <Pagination
          current={currentPage}
          total={totalCategories}
          pageSize={perPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          align="end"
          className="my-4"
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={isModalVisible}
        onOk={handleDeleteCategorie}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p className="text-lg text-gray-800">
          Are you sure you want to delete this category?
        </p>
      </Modal>

      {/* update Modal */}
      <Modal
        open={updatModalOpen}
        onOk={handleOkUpdateModal}
        onCancel={handleCancelUpdateModal}
        footer={
          <div className="font-roboto  pt-[24px]">
            <Button
              className=""
              htmlType="submit"
              onClick={handleOkUpdateModal}
              style={{ backgroundColor: "#1b69ad", color: "white", padding: "25px" }}
            >
              Update Categorie
            </Button>
          </div>
        }
      >
        <div className="pt-20">
          <Form form={updateForm} onFinish={categorieUpdateForm}>
            <div className="flex justify-center border border-[#B6B6BA] rounded-md mb-2 pt-5">
              <Form.Item
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList || []}
                rules={[
                  {
                    required: true,
                    message: "Please upload an png or svg image",
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  onChange={handleUpload}
                  fileList={fileList}
                >
                  {fileList.length >= 1 ? null : (
                    <div style={{ textAlign: "center" }}>
                      <UploadOutlined style={{ fontSize: 24 }} />
                      <div>Upload photo</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </div>

            <div className="pt-6">
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please enter your category name" },
                ]}
              >
                <Input
                  type="Updatetext"
                  placeholder="Enter title"
                  className="border border-[#b6b6ba83] px-3 py-2 w-full"
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="description"
                rules={[
                  { required: true, message: "Please enter your description" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter description"
                  style={{ border: "1px solid #B6B6BA", padding: "10px" }}
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AddCategories;
