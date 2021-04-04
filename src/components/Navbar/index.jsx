import React from "react";

import Icon, { UserOutlined } from "@ant-design/icons";
import {
  HomeIcon,
  ChatIcon,
  CompassIcon,
  HeartIcon,
  SearchIcon,
  SmallLogoIcon,
  SmallUserIcon,
  SmallBookMarkIcon,
  SettingsIcon,
  SwitchIcon,
  PlusIcon,
} from "../../constant/svg";
import {
  Layout,
  Input,
  Space,
  Typography,
  Popover,
  Button,
  Avatar,
} from "antd";

import { avatar } from "../../constant/avatar";

import { signOut } from "../../Auth/auth";

import { getUserById } from "../../api";

import StatusForm from "../Posts/StatusForm";

const Navbar = React.memo((props) => {
  const { Header } = Layout;
  const { Link, Text } = Typography;
  const [openStatusForm, setOpenStatusForm] = React.useState(false);
  const [usersData, setUsersData] = React.useState({});
  const handleOpenStatusForm = () => {
    setOpenStatusForm(true);
  };
  const handleLogout = () => {
    signOut();
  };
  React.useEffect(() =>
    getUserById(window.localStorage.getItem("uid")).then((user) =>
      setUsersData(user[0])
    )
  ,[]);
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 11,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: "0 148px",
        borderBottom: "1px solid rgba(0,0,0,0.2)",
      }}
    >
      <Icon
        onClick={() => (window.location.href = "/")}
        component={SmallLogoIcon}
      />
      <Input
        style={{
          width: "200px",
        }}
        prefix={<Icon component={SearchIcon} />}
        placeholder="Search"
      />
      <Button
        onClick={handleOpenStatusForm}
        type="dashed"
        icon={<Icon component={PlusIcon} />}
      >
        Create post
      </Button>
      <StatusForm
        openStatusForm={openStatusForm}
        setOpenStatusForm={setOpenStatusForm}
      />
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          marginTop: "8px",
        }}
      >
        <Link href="/">
          <Icon component={HomeIcon} />
        </Link>
        <Link href="/chat">
          <Icon component={ChatIcon} />
        </Link>
        <Link href="/compass">
          <Icon component={CompassIcon} />
        </Link>
        <Popover
          placement="topRight"
          content={
            <Space
              direction="vertical"
              style={{ overflowY: "auto", width: 500, height: 350 }}
            >
              {avatar.map((item) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "64px",
                    }}
                  >
                    <Space>
                      <Avatar
                        style={{ width: 54, height: 54 }}
                        src={item.photo}
                      />
                      <Text>
                        <strong>{item.name.toLowerCase()}</strong> started
                        following you.
                      </Text>
                    </Space>
                    <Button type="primary">Follow</Button>
                  </div>
                );
              })}
            </Space>
          }
          trigger="click"
        >
          <Icon component={HeartIcon} />
        </Popover>
        <Popover
          title={
            <Space direction="vertical">
              <Button
                size="large"
                type="text"
                icon={<Icon component={SmallUserIcon} />}
                href="/profile"
              >
                Profile
              </Button>
              <Button
                size="large"
                type="text"
                icon={<Icon component={SmallBookMarkIcon} />}
              >
                Saved
              </Button>
              <Button
                size="large"
                type="text"
                icon={<Icon component={SettingsIcon} />}
              >
                Settings
              </Button>
              <Button
                size="large"
                type="text"
                icon={<Icon component={SwitchIcon} />}
              >
                Switch Accounts
              </Button>
            </Space>
          }
          content={
            <Button onClick={handleLogout} size="large" type="text">
              Log out
            </Button>
          }
          trigger="click"
        >
          <Avatar
            style={{
              width: "2em",
              height: "2em",
              marginBottom: "16px",
              cursor: "pointer",
            }}
            icon={<UserOutlined />}
            src={!usersData ? null : usersData.avatar}
            alt=""
          />
        </Popover>
      </Space>
    </Header>
  );
});

export default Navbar;
