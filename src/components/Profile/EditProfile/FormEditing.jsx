import React from "react";

import { Button, Input, Space, Typography, Form, Avatar, Select, message } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { UserOutlined } from "@ant-design/icons";

import firebase from '../../../Services/firebase';

import { getUserById } from '../../../api';

const FormEditing = React.memo((props) => {
  const [name, setName] = React.useState('');
  const [userName, setUsername] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [avatar, setAvatar] = React.useState('');
  const uid = window.localStorage.getItem('uid');
  const db = firebase.firestore();
  React.useEffect(() => {
    getUserById(uid)
    .then((data) => {
        const usersData = data[0];
        setBio(!usersData ? null : usersData.bio);
        setName(!usersData ? null : usersData.fullName);
        setGender(!usersData ? null : usersData.gender);
        setUsername(!usersData ? null : usersData.username);
        setEmail(!usersData ? null : usersData.email);
        setAvatar(!usersData ? null : usersData.avatar);
        setPhone(!usersData ? null : usersData.phoneNumber);
        setWebsite(!usersData ? null : usersData.website);
        setGender(!usersData ? null : usersData.gender)
    })
  },[])
  const loadImg = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function () {
        setAvatar(reader.result);
      };
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  const handleSaveInfo = () => {
      db.collection('users')
      .doc(uid)
      .update({
        fullName: name,
        username: userName,
        website: website,
        bio: bio,
        email: email,
        phoneNumber: phone,
        gender: gender,
        avatar: avatar
      })
      .then(() => message.success("Successfully saved!"))
      .catch(err => message.error(err.message));
  }
  return (
    <Space direction="vertical" style={{ width: 624 }}>
      <div style={{ textAlign: "center" }}>
        <Space align="center" style={{ marginBottom: 16 }}>
          <label for="avatar">
            <Avatar
              style={{
                boxShadow:
                  "8px 8px 24px rgba(0,0,0,0.1), -8px 8px 24px rgba(0,0,0,0.1)",
              }}
              icon={<UserOutlined />}
              src={avatar}
              alt=""
              size={38}
            />
          </label>
          <form>
            <input
              onChange={(e) => loadImg(e)}
              style={{ display: "none" }}
              id="avatar"
              type="file"
            />
          </form>

          <Space align="start" size={-4} direction="vertical">
            <Typography.Text style={{ fontSize: "1.5em" }}>
              {userName}
            </Typography.Text>
            <label for="avatar">
              <Typography.Link>Change Profile Photo</Typography.Link>
            </label>
          </Space>
        </Space>
      </div>
      {/* Info */}
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item
          help={
            <div style={{ textAlign: "left", marginTop: 8, fontSize: 12 }}>
              <p>
                Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name.
              </p>
              <p>You can only change your name twice within 14 days.</p>
            </div>
          }
          label="Name"
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          help={
            <div
              style={{
                textAlign: "left",
                margin: "8px 0 16px 0",
                fontSize: 12,
              }}
            >
              In most cases, you'll be able to change your username back to
              hai_dang1928 for another 14 days.{" "}
              <Typography.Link>Learn More</Typography.Link>
            </div>
          }
          label="Username"
        >
          <Input
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Website">
          <Input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website"
          />
        </Form.Item>
        <Form.Item
          help={
            <div
              style={{
                textAlign: "left",
                fontSize: 12,
                marginTop: 16,
                marginBottom: 8,
              }}
            >
              <strong>Personal Information</strong> <br /> Provide your personal
              information, even if the account is used for a business, a pet or
              something else. This won't be a part of your public profile.
            </div>
          }
          label="Bio"
        >
          <Input.TextArea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Phone Number">
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>
        <Form.Item label="Gender">
          <Select defaultValue="Male" onChange={(value) => setGender(value)}>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Prefer not to say">Prefer not to say</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={
            <div>
              Similar Account <br /> Suggestions
            </div>
          }
        >
          <Space>
            <Checkbox checked/>
            <div style={{ textAlign: "left" }}>
              Include your account when recommending similar accounts people
              might want to follow.
            </div>
          </Space>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={handleSaveInfo} type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
});

export default FormEditing;
