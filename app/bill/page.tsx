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

interface PeopleType {
  id: number;
  name: string;
  amount: number;
}

interface DataType {
  key: React.Key;
  name: string;
  date: string;
  people: PeopleType[];
  status: "paid" | "unpaid";
}

export default function Bill() {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      render: (_, record) =>
        `${record.people.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} ฿`,
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

        <Button
          color="blue"
          variant="solid"
          onClick={() => showModal(record)}
        >
          รายละเอียด
        </Button>
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "บิลประจำเดือน มกราคม",
      date: "10/11/68",
      people: [
        { id: 1, name: "Jay", amount: 6000 },
        { id: 2, name: "Tin", amount: 6000 },
        { id: 3, name: "Athane", amount: 6000 },
      ],
      status: "paid",
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
            items={[{ title: "Bills" }]}
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
            <div style={{ display: "flex", gap: 4 }}>
              <Typography style={{ fontWeight: "bold" }}>ชื่อบิล: </Typography> {selectedBill.name}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <Typography style={{ fontWeight: "bold" }}>วันที่:</Typography> {selectedBill.date}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <Typography style={{ fontWeight: "bold" }}>สถานะ: </Typography>{" "}
              {selectedBill.status === "paid" ? (
                <Tag color="green">ชำระแล้ว</Tag>
              ) : (
                <Tag color="red">ยังไม่ชำระ</Tag>
              )}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <Typography style={{ fontWeight: "bold" }}>จำนวนเงินรวม: </Typography> 
              {selectedBill.people.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} ฿
            </div>
            <div style={{ display: "flex", flexDirection: "column", paddingLeft: 8 }}>
              {selectedBill.people.map((p) => (
                <Typography key={p.id}>{p.name}: {p.amount} ฿</Typography>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
}
