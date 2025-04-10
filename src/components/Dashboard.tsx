import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  SolutionOutlined,
  SettingOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
// import Clock from '@src/components/Clock'
const { Header, Footer, Sider, Content } = Layout;

// Props Interface
interface DashboardProps {
  menuItems: string[];
  footerContent: string;
  headerContent: string;
  setHeaderContent: React.Dispatch<React.SetStateAction<string>>;
  menuPages: React.ReactNode[];
}





const menuIcons = [
  <DashboardOutlined key={"dashboard"} />,
  <SolutionOutlined key={"student"} />,
  <TeamOutlined key={'supervisor'} />,
  <SettingOutlined key={"settings"} />,
  <LogoutOutlined key={"logout"} />,
];

const Dashboard: React.FC<DashboardProps> = ({
  menuItems,
  footerContent,
  headerContent,
  setHeaderContent,
  menuPages,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  // Ensure `window.innerWidth` is accessed only on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCollapsed(window.innerWidth < 600);
    }
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
        collapsedWidth={80}
        style={{
          height: "100vh",
          background: "#3fa3da",
          transition: "all 0.3s ease-in-out",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 64,
            borderBottom: "1px solid #f0f0f0",
            padding: "0 16px",
            background: "#3fa3da",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "18px", color: "white" }}
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems.map((item, index) => ({
            key: item.toLowerCase(),
            icon: menuIcons[index],
            label: item,
            onClick: () => {
              setHeaderContent(item);
              setPageIndex(index);
            },
          }))}
          style={{ background: "transparent", marginTop: "8px" }}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: "margin 0.3s ease" }}>
        {/* Header */}
        <Header
          style={{
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", // Center horizontally
            height: "64px", // Ensure full height usage
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        > 
          {headerContent}
        </Header>

        {/* Content Area */}
        <Content
          style={{
            margin: "24px 16px",
            padding: "24px",
            minHeight: "calc(100vh - 160px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          {menuPages[pageIndex]}
        </Content>
      

        {/* Footer */}
        <Footer
          style={{
            textAlign: "center",
            background: "#F3F4F6",
            padding: "12px 20px",
            fontSize: "14px",
          }}
        >
          {footerContent}
          {/* <Clock /> */}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
