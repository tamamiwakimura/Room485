"use client";
import React, { useState } from "react";
import {
  BookOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
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
  Card,
  Divider,
} from "antd";
import { useRouter, usePathname } from "next/navigation";
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
  getItem("Bills", "2", <BookOutlined />, [
    getItem("Athane", "3"),
    getItem("Nine", "4"),
    getItem("Jay", "5"),
  ]),
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

export default function Bill() {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentBill, setSelectedPaymentBill] =
    useState<DataType | null>(null);
  const [selectedBill, setSelectedBill] = useState<DataType | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const showModal = (record: DataType) => {
    setSelectedBill(record);
    setIsModalOpen(true);
  };

  const openPaymentModal = (record: DataType) => {
    setSelectedPaymentBill(record);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
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
      render: (_, record) =>
        record.status === "paid" ? (
          <Button
            color="blue"
            variant="solid"
            onClick={() => showModal(record)}
          >
            รายละเอียด
          </Button>
        ) : (
          <Button
            color="red"
            variant="solid"
            onClick={() => openPaymentModal(record)}
          >
            ชำระเงิน
          </Button>
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
          defaultSelectedKeys={[pathname]}
          onClick={(items) => router.push(items.key)}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "/bill",
              icon: <BookOutlined />,
              label: "Bills",
              children: [
                {
                  key: "/bill/Athane",
                  label: "Athane",
                },
                {
                  key: "/bill/Nine",
                  label: "Nine",
                },
                {
                  key: "/bill/Jay",
                  label: "Jay",
                },
              ],
            },
            {
              key: "",
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
            Bills
          </Title>
        </Header>
        <Content style={{ padding: "16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "Bills" }, { title: "Athane" }]}
          />

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
                <Tag color="green">Paid</Tag>
              ) : (
                <Tag color="red">Unfunded</Tag>
              )}
            </p>
          </div>
        )}
      </Modal>
      <Modal
        title="ชำระเงิน"
        open={isPaymentModalOpen}
        onCancel={closePaymentModal}
        footer={null}
      >
        {selectedPaymentBill && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Card>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <HomeOutlined style={{ fontSize: 22 }} />
                  <Typography style={{ fontWeight: "bold"}}>ค่าห้อง</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Typography style={{ fontWeight: "bold"}}>6000 บาท</Typography>
                  <Button type="primary">ชำระเงิน</Button>
                </div>
              </div>
            </Card>

            <Card
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: "#eee",
                    borderRadius: 6,
                  }}
                ></div>
                <span>ค่าน้ำ</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span style={{ color: "red" }}>ยังไม่ชำระ</span>
                <Button type="primary">ชำระเงิน</Button>
              </div>
            </Card>

            <Card
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: "#eee",
                    borderRadius: 6,
                  }}
                ></div>
                <span>ค่าไฟ</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span style={{ color: "red" }}>ยังไม่ชำระ</span>
                <Button type="primary">ชำระเงิน</Button>
              </div>
            </Card>

            <Divider />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              <span>รวม</span>
              <span>{selectedPaymentBill.total.toLocaleString()} บาท</span>
            </div>

            <Button type="primary" block style={{ height: 45 }}>
              ชำระเงินทั้งหมด
            </Button>
          </div>
        )}
      </Modal>
    </Layout>
  );
}
