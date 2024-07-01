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
  //현재 선택된 메뉴 패스파라미터에서 받아옴

  useEffect(() => {
    if (menu !== undefined && adminMenu.includes(menu)) {
      //해당 메뉴가 존재하고 adminMenu에 포함되어 있을 때
      setSelectedMenu(menu);
      //해당 메뉴로 선택
    }
  }, [menu]);
  //수정 작업 후 관리자페이지로 돌아올 때 해당 메뉴로 이동

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    navigate(`/admin/${menu}`);
  };
  //메뉴 클릭 시 해당 메뉴로 이동

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
