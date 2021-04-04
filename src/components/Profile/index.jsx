import React from "react";

import Navbar from "../Navbar";
import PostsStorage from "./PostsStorage";
import IGTV from "./IGTV";
import Saved from "./Saved";
import Tagged from "./Tagged";

import { Layout, Space, Avatar, Typography, Button, Tabs } from "antd";
import Icon, { UserOutlined } from "@ant-design/icons";
import {
  LargeSettingsIcon,
  SmallBookMarkIcon,
  GridIcon,
  SmallTVIcon,
  TaggedIcon,
} from "../../constant/svg";

import { getAllPosts, getUserById } from "../../api";

const Profile = React.memo((props) => {
  const { Content } = Layout;
  const { Text } = Typography;
  const [postsData, setPostsData] = React.useState([]);
  const [usersData, setUsersData] = React.useState({});
  const uid = window.localStorage.getItem("uid");
  React.useEffect(() => {
    getAllPosts(uid).then((posts) => setPostsData(posts));
    getUserById(uid).then((users) => setUsersData(users[0]));
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      <Content
        style={{
          padding: "0 160px",
          marginTop: 64,
          backgroundColor: "#fafafa",
          height: "100vh",
        }}
      >
        <Space style={{ padding: "24px 64px" }} size={88}>
          <Avatar
            icon={<UserOutlined />}
            src={!usersData ? null : usersData.avatar}
            size={150}
          />
          <Space size={16} direction="vertical" style={{ height: 150 }}>
            {/* First row */}
            <Space size={16}>
              <Text style={{ fontSize: "2em", fontWeight: "200" }}>
                {!usersData ? null : usersData.username}
              </Text>
              <Button href="/profile/edit">Edit Profile</Button>
              <Icon component={LargeSettingsIcon} />
            </Space>
            {/* Second row */}
            <Space size={24} style={{ fontSize: "16px" }}>
              <Text>
                <strong>{postsData.length}</strong> posts
              </Text>
              <Text>
                <strong>{!usersData ? null : usersData.follower}</strong> followers
              </Text>
              <Text>
                <strong>{!usersData ? null : usersData.following}</strong> following
              </Text>
            </Space>
            {/* Third row */}
            <Space direction="vertical" size={-2}>
              <Text strong style={{ fontSize: "16px" }}>
                {!usersData ? null : usersData.fullName}
              </Text>
              <Text style={{ fontSize: "18px" }}>{!usersData ? null : usersData.bio}</Text>
            </Space>
          </Space>
        </Space>
        <Tabs tabBarGutter={64} centered defaultActiveKey="1">
          <Tabs.TabPane tab="POSTS" key="1" icon={<GridIcon />}>
            <PostsStorage />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="IGTV"
            key="2"
            icon={<SmallTVIcon />}
          >
            <IGTV />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Saved" key="3" icon={<SmallBookMarkIcon />}>
            <Saved />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Tagged"
            key="4"
            icon={<TaggedIcon />}
          > 
            <Tagged />
          </Tabs.TabPane>
        </Tabs>
      </Content>
    </React.Fragment>
  );
});

export default Profile;
