import React from 'react';

import { Button, Card, Divider, Space, Typography, Input, Image, message } from "antd";
import Icon from '@ant-design/icons';
import { LargeLogoIcon } from '../constant/svg';

import { signUp } from "../Auth/auth";


const Register = React.memo(props => {
    const {  Text, Link } = Typography;
    const [email, setEmail] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleChangeEmail = (e) => {
      setEmail(e.target.value);
    };
    const handleChangeFullName = (e) => {
      setFullName(e.target.value);
    };
    const handleChangeUsername = (e) => {
      setUsername(e.target.value);
    };
    const handleChangePassword = (e) => {
      setPassword(e.target.value);
    };
    const handleSignUp = () => {
      if(!email || !fullName || !username || !password) {
        message.error('Invalid information!')
      }
      const user = {
        username,
        password,
        email,
        fullName,
      };
      signUp(user);

      setFullName('')
      setPassword('')
      setEmail('')
      setUsername('')
    }
    return (
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <Space direction="vertical" style={{ marginTop: 32 }}>
          <Card style={{ width: 352 }}>
            <Space align="center" direction="vertical">
              <Icon style={{ margin: "8px 0" }} component={LargeLogoIcon} />
              <Text
                type="secondary"
                style={{
                  fontSize: "1.3em",
                  fontWeight: "600",
                  display: "block",
                  textAlign: "center",
                  marginBottom: "16px",
                }}
              >
                Sign up to see photos and videos from your friends.
              </Text>
            </Space>
            <Divider style={{ color: "#9d8e8e" }}>OR</Divider>
            {/* Form */}
            <Space
              style={{ width: "100%", marginBottom: "16px" }}
              size="small"
              direction="vertical"
            >
              <Input
                value={email}
                onChange={handleChangeEmail}
                style={{ backgroundColor: "#fafafa" }}
                placeholder="Email"
              />
              <Input
                value={fullName}
                onChange={handleChangeFullName}
                style={{ backgroundColor: "#fafafa" }}
                placeholder="Full Name"
              />
              <Input
                value={username}
                onChange={handleChangeUsername}
                style={{ backgroundColor: "#fafafa" }}
                placeholder="Username"
              />
              <Input
                type="password"
                value={password}
                onChange={handleChangePassword}
                style={{ backgroundColor: "#fafafa" }}
                placeholder="Password"
              />
            </Space>
            <Button
              onClick={handleSignUp}
              style={{ fontWeight: "600" }}
              type="primary"
              block
            >
              Sign up
            </Button>
            <Text
              type="secondary"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "16px",
              }}
            >
              By signing up, you agree to our <strong>Terms</strong> ,{" "}
              <strong>Data Policy</strong> and <strong>Cookies Policy</strong> .
            </Text>
          </Card>
          {/* Footer*/}
          <Card style={{ textAlign: "center" }}>
            <Text>
              Have an account? <Link href="/">Log in</Link>
            </Text>
          </Card>
          <Space
            style={{ textAlign: "center", width: "100%" }}
            direction="vertical"
          >
            <Text>Get the app.</Text>
            <Space style={{ margin: "0 auto", marginBottom: "16px" }}>
              <Image
                width={136}
                preview={false}
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
                alt=""
              />
              <Image
                width={136}
                preview={false}
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
                alt=""
              />
            </Space>
          </Space>
        </Space>
      </div>
    );
})

export default Register;