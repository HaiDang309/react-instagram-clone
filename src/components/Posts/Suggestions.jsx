import { UserOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";

import { avatar } from "../../constant/avatar";

import { getUserById } from "../../api";

const Suggestions = React.memo((props) => {
  const footer = [
    "About",
    "Help",
    "Press",
    "API",
    "Jobs",
    "Privacy",
    "Terms",
    "Locations",
    "Top Accounts",
    "Hashtags",
    "Language",
  ];
  const [usersData, setUsersData] = React.useState({});
  React.useEffect(() =>
    getUserById(window.localStorage.getItem("uid")).then((data) =>
      setUsersData(data[0])
    )
  );
  return (
    <Space
      direction="vertical"
      style={{ marginTop: 32, width: "100%" }}
      size={16}
    >
      {/* Row 1 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Space size={16}>
          <Avatar size={56} src={!usersData ? null : usersData.avatar} alt="" icon={<UserOutlined />} />
          <Space direction="vertical" size={-4}>
            <Typography.Text strong>{!usersData ? null : usersData.username}</Typography.Text>
            <Typography.Text type="secondary">{!usersData ? null : usersData.fullName}</Typography.Text>
          </Space>
        </Space>
        <Typography.Link type="link">Switch</Typography.Link>
      </div>
      {/* Row 2 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Text strong type="secondary">
          Suggestions For You
        </Typography.Text>
        <Typography.Text strong>See all</Typography.Text>
      </div>
      {/* Lists */}
      {avatar.slice(0, 5).map((item) => {
        return (
          <div
            key={Math.random()}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Space size={16}>
              <Avatar size={32} src={item.photo} icon={<UserOutlined />} />
              <Space direction="vertical" size={-4}>
                <Typography.Text strong>
                  {item.name.toLowerCase().split(" ").join("_")}
                </Typography.Text>
                <Typography.Text style={{ fontSize: 12 }} type="secondary">
                  Follows you
                </Typography.Text>
              </Space>
            </Space>
            <Typography.Link strong type="link">
              Follow
            </Typography.Link>
          </div>
        );
      })}
      <Typography.Text
        style={{ fontSize: 12, width: "100%", wordBreak: "keep-all" }}
        type="secondary"
      >
        {footer.join(" - ")}
      </Typography.Text>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        © 2021 INSTAGRAM FROM FACEBOOK
      </Typography.Text>
    </Space>
  );
});

export default Suggestions;
