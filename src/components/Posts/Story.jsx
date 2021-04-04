import React from "react";

import { Card, Avatar, Space, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { avatar } from "../../constant/avatar";

const Story = React.memo((props) => {
  const offset = React.useRef(0);
  const handleLeft = () => {
    if(offset.current === 0) {
      return;
    }
    console.log('left',offset.current);
    offset.current += 256;
    const slideAvatar = document.querySelector("#slide-avatar");
    slideAvatar.style.transform = `translateX(${offset.current}px)`;
  };
  const handleRight = () => {
    console.log('right',offset.current)
    offset.current -= 256;
    const slideAvatar = document.querySelector("#slide-avatar");
    slideAvatar.style.transform = `translateX(${offset.current}px)`
  };
  return (
    <Card
      size="small"
      style={{
        marginTop: 24,
        width: 600,
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <Button
        size="small"
        style={{ position: "absolute", left: "8px", top: "2em", zIndex: 10 }}
        type="circle"
        icon={<LeftOutlined />}
        onClick={handleLeft}
      />
      <Button
        size="small"
        style={{ position: "absolute", right: "8px", top: "2em", zIndex: 10 }}
        type="circle"
        icon={<RightOutlined />}
        onClick={handleRight}
      />
      <Space
        id="slide-avatar"
        style={{ transform: "inherit", transition: "all 1s", paddingRight: 16 }}
      >
        {avatar.map((item) => {
          return (
            <Avatar
              style={{ border: "2px solid #2e89ff" }}
              src={item.photo}
              key={Math.random() / Math.random()}
              size={66}
            />
          );
        })}
      </Space>
    </Card>
  );
});

export default Story;
