"use client";

import React, { useState } from "react";
import {
  BookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Button,
  Layout,
  Menu,
  Table,
  theme,
  Typography,
  Tag,
  Modal,
  Breadcrumb,
} from "antd";
import Tabbar from "./layout/sider";
import Footer from "./layout/footer";
const { Title } = Typography;
const { Header, Content, Sider } = Layout;

import type { TableColumnsType, TableProps } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  date: string;
  total: number;
  status: "paid" | "unpaid";
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<DataType | null>(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const showModal = (record: DataType) => {
    setSelectedBill(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (value) => `${value.toLocaleString()} ฿`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) =>
        status === "paid" ? (
          <Tag color="green">ชำระแล้ว</Tag>
        ) : (
          <Tag color="red">ยังไม่ชำระ</Tag>
        ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          type="text"
          onClick={() => showModal(record)}
        />
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "บิลประจำเดือน มกราคม",
      date: "10/11/68",
      total: 1300,
      status: "paid",
    },
    {
      key: "2",
      name: "บิลประจำเดือน กุมภาพันธ์",
      date: "12/12/68",
      total: 1200,
      status: "unpaid",
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Modal
        title="รายละเอียดบิล"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedBill && (
          <div>
            <p>
              <b>ชื่อบิล:</b> {selectedBill.name}
            </p>
            <p>
              <b>วันที่:</b> {selectedBill.date}
            </p>
            <p>
              <b>จำนวนเงิน:</b> {selectedBill.total.toLocaleString()} ฿
            </p>
            <p>
              <b>สถานะ:</b>{" "}
              {selectedBill.status === "paid" ? (
                <Tag color="green">ชำระแล้ว</Tag>
              ) : (
                <Tag color="red">ยังไม่ชำระ</Tag>
              )}
            </p>
          </div>
        )}
      </Modal>
      <Footer />
    </Layout>
  );
}