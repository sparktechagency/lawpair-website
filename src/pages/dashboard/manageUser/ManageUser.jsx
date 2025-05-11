
import React, { useEffect, useState } from "react";
import { Table, Input, Button, Modal, Tag, Pagination } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ManageUser = () => {
  const axiosPublic = useAxiosPublic();
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const perPage = 8;

  const token = Cookies.get("adminToken");

  useEffect(() => {
    axiosPublic
      .get(`/admin/users?per_page=${perPage}&page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.users.total)
        setData(response.data.users.data);
        setTotalUsers(response.data.users.total);
      })
      .catch((error) => {
        console.error("Error fetching dashboard users:", error);
      });
  }, [token, currentPage, searchText]);

  const filteredData = data.filter(
    (item) =>
      (item.first_name && item.first_name.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.role && item.role.toLowerCase().includes(searchText.toLowerCase()))
  );

  const showDeleteModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleDeleteUser = async () => {
    if (selectedRecord) {

      try {
        const response = await axiosPublic.delete(`/admin/user/${selectedRecord.id}`, {
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
      setTotalUsers((prev) => prev - 1)

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
      title: "Name",
      dataIndex: "first_name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          style={{
            borderRadius: "999px",
            padding: "3px 15px",
            fontSize: "14px",
            fontWeight: "400",
            color: "white",
            border: "0px solid",
            backgroundColor: role === "Lawyer" ? "#96ddca" : "#ebd298",
          }}
        >
          {role}
        </Tag>
      ),
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
      <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">
        Manage Users
      </h1>
      <p className="fontro text-[#B6B6BA] text-[12px] pb-3">
        Admins can manage users by promoting, demoting, or removing them.
      </p>
      <Input.Search
        placeholder="Search by name or email"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: "100%" }}
        size="large"
      />
      <div className="overflow-x-auto pt-3">
        <Table columns={columns} dataSource={filteredData} pagination={false} rowKey="id" />
      </div>


      {/* pagination component */}
      <Pagination
        current={currentPage}
        total={totalUsers}
        pageSize={perPage}
        onChange={handlePageChange}
        showSizeChanger={false}
        align="end"
        className="my-4"
      />



      <Modal
        title="Confirm Delete"
        open={isModalVisible}
        onOk={handleDeleteUser}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p className="text-lg text-gray-800">Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default ManageUser;
