import React from "react";

import Post from "./Post";
import Story from "./Story";
import Navbar from "../Navbar";
import Suggestions from './Suggestions';

import { Space, Layout, Image, Card, Skeleton, Avatar, Typography } from "antd";

import { getAllPosts, getUserById } from "../../api";

const Home = React.memo((props) => {
  const { Content } = Layout;
  const [postsData, setPostsData] = React.useState([]);
  const [usersData, setUsersData] = React.useState({});
  const uid = window.localStorage.getItem("uid");
  React.useEffect(() => {
    getAllPosts(uid).then((data) => setPostsData(data));
    getUserById(uid).then((data) => setUsersData(data[0]));
  }, []);
  return (
    <>
      <Navbar />
      <Content
        style={{
          padding: "0 148px",
          marginTop: 64,
          backgroundColor: "#fafafa",
          overflowY: "auto",
          display: "flex",
          justifyContent: "flex-start",
          gap: 24,
        }}
      >
        <Space direction="vertical" style={{ height: "100vh" }}>
          <Story />

          {!postsData ? (
            <Skeleton />
          ) : (
            postsData
              .sort((a, b) => parseInt(b.pid) - parseInt(a.pid))
              .map((post) => {
                return (
                  <Post
                    key={Math.random() / Math.random()}
                    pid={post.pid}
                    photo={post.photo}
                    username={usersData.username}
                    avatar={usersData.avatar}
                  />
                );
              })
          )}
          <Card
            size="small"
            title={
              <Space size={16}>
                <Avatar
                  src="https://png.pngtree.com/png-vector/20190301/ourlarge/pngtree-vector-administration-icon-png-image_747092.jpg"
                  size={32}
                />
                <Typography.Text style={{ fontWeight: "500" }}>
                  Admin
                </Typography.Text>
              </Space>
            }
            style={{ width: 600, marginBottom: 32 }}
            cover={
              <Image
                src="https://images.unsplash.com/photo-1600577916048-804c9191e36c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VsY29tZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                alt=""
              />
            }
          />
        </Space>
        <Suggestions />
      </Content>
    </>
  );
});

export default Home;
