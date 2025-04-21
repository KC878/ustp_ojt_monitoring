"use client"; // Only needed if you're in an app router

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
import Profile from "./Profile";
import LogoutPage from "@src/app/pages/logout/page";
import { useAuth } from "@src/store/useAuth";
import Clock from './Clock';

const { Header, Footer, Sider, Content } = Layout;

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
  <TeamOutlined key={"supervisor"} />,
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
  const [mounted, setMounted] = useState(false); // Prevent hydration mismatch
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { showLogoutPage } = useAuth();


  useEffect(() => {
    setMounted(true); // Mark the component as mounted

    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name") || "";
      const storedEmail = localStorage.getItem("email") || "";
      setName(storedName);
      setEmail(storedEmail);
      setCollapsed(window.innerWidth < 600);
    }
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const popoverContent = mounted && (
    <div className="compact-content" style={{ padding: 8, fontSize: 13 }}>
      <p style={{ margin: "2px 0" }}>{name}</p>
      <p style={{ margin: "2px 0" }}>{email}</p>
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        size="small"
        style={{
          marginTop: 8,
          width: "100%",
          height: 30,
          color: "white",
        }}
        onClick={() => {
          const setShowLogoutPage = useAuth.getState().setShowLogoutPage;
          setShowLogoutPage(true);
        }}
      />
    </div>
  );

  if (!mounted) return null; // Avoid rendering until mounted to prevent hydration issues

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {showLogoutPage && <LogoutPage />}

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={160}
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

      <Layout
        style={{
          marginLeft: collapsed ? 62 : 140,
          transition: "margin 0.3s ease",
        }}
      >
        <Header
          style={{
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            height: "64px",
            padding: "0 24px",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "22px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          > 
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                left: 24,
                fontSize: 14,
                color: '#888'
              }}
            >
              <Clock />
            </div>
            
          </div>

          <div
            style={{
              position: "absolute",
              right: 24,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            <Profile name={name} popoverContent={popoverContent} />
            <span
              style={{ fontSize: "11px", marginTop: "2px", color: "#555" }}
            >
              {name}
            </span>
          </div>
        </Header>

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

        <Footer
          style={{
            background: "#F3F4F6",
            padding: "12px 20px",
            fontSize: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              width: "100%",
            }}
          >
            {/* Centered footer content */}
            <div style={{ textAlign: "center", flex: 1 }}>{footerContent}</div>

            {/* Clock on the right */}
            <div
              style={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <Clock />
            </div>
          </div>
        </Footer>

      </Layout>
    </Layout>
  );
};

export default Dashboard;
