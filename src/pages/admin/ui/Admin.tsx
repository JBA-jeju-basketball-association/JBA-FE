import React, { useState, useEffect } from "react";
import { Button, Layout, Menu, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PictureOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import style from "./Admin.module.css";
import { JwtDecoder } from "../../../shared/lib";
import { useUserStore } from "../../../shared/model";
import {
  AdminUser,
  AdminCompetition,
  AdminPost,
  AdminGallery,
} from "pages/admin";
import { useNavigate, useParams } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export const Admin = () => {
  const adminMenu: string[] = ["user", "competition", "post", "gallery"];
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>(adminMenu[0]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { AccessToken } = useUserStore();
  const navigate = useNavigate();
  const { menu } = useParams();

  useEffect(() => {
    if (menu !== undefined && adminMenu.includes(menu)) {
      setSelectedMenu(menu);
    }
  }, [menu]);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    navigate(`/admin/${menu}`);
  };

  return (
    <Layout className={style.Layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={style.logo}>
          <p>JBA-Admin</p>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedMenu]}
          items={[
            {
              key: "user",
              icon: <UserOutlined />,
              label: "회원 관리",
              onClick: () => handleMenuClick("user"),
            },
            {
              key: "competition",
              icon: <CalendarOutlined />,
              label: "대회 관리",
              onClick: () => handleMenuClick("competition"),
            },
            {
              key: "post",
              icon: <BookOutlined />,
              label: "게시물 관리",
              onClick: () => handleMenuClick("post"),
            },
            {
              key: "gallery",
              icon: <PictureOutlined />,
              label: "갤러리 관리",
              onClick: () => handleMenuClick("gallery"),
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
            justifyContent: "space-between",
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
          <div className={style.headerRight}>
            {AccessToken && (
              <div className={style.emailArea}>
                <p>{JwtDecoder(AccessToken).aud}</p>
              </div>
            )}
            <button
              className={style.backHomeBtn}
              onClick={() => (window.location.href = "/")}
            >
              돌아가기
            </button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {selectedMenu === "user" && <AdminUser />}
          {selectedMenu === "competition" && <AdminCompetition />}
          {selectedMenu === "post" && <AdminPost />}
          {selectedMenu === "gallery" && <AdminGallery />}
        </Content>
      </Layout>
    </Layout>
  );
};
