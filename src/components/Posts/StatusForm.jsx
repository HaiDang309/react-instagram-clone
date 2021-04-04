import React from "react";

import { Modal, Input, Space, Avatar, Image, Button, message } from "antd";
import Icon, { UserOutlined } from "@ant-design/icons";
import { PhotoIcon } from "../../constant/svg";

import firebase from "../../Services/firebase";

import { getUserById } from "../../api";

const Comments = React.memo((props) => {
  const { TextArea } = Input;
  const { openStatusForm, setOpenStatusForm } = props;
  const db = firebase.firestore();
  const [caption, setCaption] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [usersData, setUsersData] = React.useState({});
  React.useEffect(() =>
    getUserById(window.localStorage.getItem("uid")).then((data) =>
      setUsersData(data[0])
    )
  );
  const handleCloseStatusForm = () => {
    setOpenStatusForm(false);
  };
  const loadImg = function (event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function () {
        setImgUrl(reader.result);
      };
    }
    reader.readAsDataURL(event.target.files[0]);
  };
  const handlePublish = () => {
    const pid = new Date().valueOf().toString();
    db.collection("posts")
      .doc(pid)
      .set({
        pid: pid,
        uid: window.localStorage.getItem("uid"),
        photo: imgUrl,
        avatar: usersData.avatar,
        time: "",
        username: usersData.username,
      })
      .then(() => {
        message.success("Successfully published!");
        setOpenStatusForm(false);
      })
      .catch((err) => {
        message.error(err);
      });
  };
  return (
    <Modal
      footer={
        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
              <label style={{cursor: "pointer"}} for="photo">
                <Icon component={PhotoIcon} />
              </label>
            <form enctype="multipart/form-data">
              <Input
                multiple
                onChange={(e) => loadImg(e)}
                style={{ display: "none" }}
                id="photo"
                name="photo"
                type="file"
              />
            </form>
          </div>

          <Button
            disabled={!caption && imgUrl.length === 0}
            onClick={handlePublish}
            type="primary"
          >
            Publish
          </Button>
        </Space>
      }
      closable
      visible={openStatusForm}
      width={720}
      onCancel={handleCloseStatusForm}
    >
      <Space size={48} style={{ position: "relative", width: "100%" }}>
        <Avatar
          icon={<UserOutlined />}
          style={{ position: "absolute", top: 0, width: 48, height: 48 }}
          src={!usersData ? null : usersData.avatar}
        />
        <TextArea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{ fontSize: 24 }}
          bordered={false}
          placeholder="What do you think?"
          autoSize={{ minRows: 3 }}
        />
      </Space>
      <Space>
        <Image src={imgUrl} alt="" key={Math.random()} />
      </Space>
    </Modal>
  );
});

export default Comments;
