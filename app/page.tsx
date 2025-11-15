"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import {
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, theme, Typography } from "antd";

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
  getItem("Users", "2", <UserOutlined />),
];

import type { TableColumnsType, TableProps } from "antd";

interface DataType {
  key: React.Key;
  name: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Title",
    dataIndex: "name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Total",
    dataIndex: "total",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown"
  },
  {
    key: "2",
    name: "Jim Green"
  },
  {
    key: "3",
    name: "Joe Black",
  },
  {
    key: "4",
    name: "Disabled User"
  },
];
export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main >
        <Navbar />
      </main>
    </div>
  );
}
