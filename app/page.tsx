"use client";

import React, { useState } from "react";
import {
  BookOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Breadcrumb,
  Button,
  Layout,
  Menu,
  Table,
  theme,
  Typography,
  Tag,
  Modal,
} from "antd";
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("Bills", "2", <BookOutlined />),
  getItem("Users", "3", <UserOutlined />),
];

import type { TableColumnsType, TableProps } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  date: string;
  total: number;
  status: "paid" | "unpaid";
}

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
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
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Title
          level={5}
          style={{ textAlign: "center", paddingTop: "8px", color: "#fff" }}
        >
          Room485
        </Title>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "2",
              icon: <BookOutlined />,
              label: "Bills",
            },
            {
              key: "3",
              icon: <UserOutlined />,
              label: "Users",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Title level={4} style={{ paddingTop: 8 }}>
            Home
          </Title>
        </Header>
        <Content style={{ padding: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Table<DataType> columns={columns} dataSource={data} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Room485 website ©{new Date().getFullYear()} Created by ATJ
        </Footer>
      </Layout>
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
    </Layout>
  );
}
