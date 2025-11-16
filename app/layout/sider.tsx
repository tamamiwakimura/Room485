"use client"

import React, { FC, useState } from 'react'
import {
  BookOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Layout,
  Menu,
  theme,
  Typography,
} from "antd";
import { useRouter, usePathname } from "next/navigation";

const { Title } = Typography;
const { Sider } = Layout;

interface SiderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

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

const SiderComponent: FC<SiderProps> = ({ collapsed, onCollapse}) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
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
  );
};

export default SiderComponent;
