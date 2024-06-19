import {Button, Layout, Menu, theme} from 'antd';
import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PictureOutlined,
    UserOutlined,
    BookOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import style from "./Admin.module.css"
import {JwtDecoder} from "../../../shared/lib";
import {useUserStore} from "../../../shared/model";
import {AdminUser} from "./AdminUser";
import {AdminCompetition} from "./AdminCompetition";
import {AdminPost} from "./AdminPost";
import {AdminGallery} from "./AdminGallery";
const { Header, Sider, Content } = Layout;

export const Admin = () => {
    const adminMenu:string[] = ["user", "competition", "post", "gallery", ]
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<string>(adminMenu[0]);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const {AccessToken} = useUserStore();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={style.logo} ><p>JBA-Admin</p></div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: '회원 관리',
                            onClick: () => setSelectedMenu(adminMenu[0])
                        },
                        {
                            key: '2',
                            icon: <CalendarOutlined />,
                            label: '대회 관리',
                            onClick: () => setSelectedMenu(adminMenu[1])
                        },
                        {
                            key: '3',
                            icon: <BookOutlined />,
                            label: '게시물 관리',
                            onClick: () => setSelectedMenu(adminMenu[2])
                        },
                        {
                            key: '4',
                            icon: <PictureOutlined />,
                            label: '갤러리 관리',
                            onClick: () => setSelectedMenu(adminMenu[3])
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer, display: "flex", justifyContent:"space-between"}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className={style.headerRight}>
                        {AccessToken && <div className={style.emailArea}><p>{JwtDecoder(AccessToken).aud}</p></div>}
                        <button
                            className={style.backHomeBtn}
                            onClick={() => window.location.href = "/"}
                        >돌아가기
                        </button>
                    </div>
                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {selectedMenu === adminMenu[0] ? <AdminUser /> :
                        selectedMenu === adminMenu[1] ? <AdminCompetition /> :
                            selectedMenu === adminMenu[2] ? <AdminPost /> :
                                selectedMenu === adminMenu[3] ? <AdminGallery /> : null
                    }
                </Content>
            </Layout>
        </Layout>
    );
};
