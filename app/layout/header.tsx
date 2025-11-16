"use client"

import { Button, Layout, theme, Typography } from 'antd';
import { useRouter } from 'next/router';
import { FC } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;


interface HeaderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const HeaderComponent: FC<HeaderProps> = ({ collapsed, onCollapse }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
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
        onClick={() => onCollapse(!collapsed)}
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
  )
}

export default HeaderComponent