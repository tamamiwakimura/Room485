"use client"

import { FC, ReactNode, useState } from 'react'
import { Layout as AntLayout, Grid } from 'antd'
import SiderComponent from './sider'
import HeaderComponent from './header'
import Footer from './footer'

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapse = (isCollapsed: boolean) => {
    setCollapsed(isCollapsed);
  };

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <SiderComponent collapsed = {collapsed} onCollapse={toggleCollapse} />
      <AntLayout>
        <HeaderComponent collapsed = {collapsed} onCollapse={toggleCollapse} />
        <Footer />
      </AntLayout>
    </AntLayout>
  )
}

export default Layout