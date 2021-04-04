import React from 'react';

import { Space, Image, Card, Typography, Input, Button, Divider, message } from "antd";
import Icon from '@ant-design/icons';
import { FacebookIcon, LargeLogoIcon } from '../constant/svg';

import { signIn, signInWithProvider } from "../Auth/auth";

const Login = React.memo(props => {
    const { Text, Link } = Typography;
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleChangeEmail = e => {
      setEmail(e.target.value);
    }
    const handleChangePassword = e => {
      setPassword(e.target.value);
    }
    const handleLogIn = () => {
      if(!email || !password) {
        message.error('Invalid email or password!')
      }
      const user = {
        email,
        password
      }
      signIn(user);
    }
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fafafa",
        }}
      >
        <Space size={-8}>
          <Image
            width={424}
            src="https://thecybersafetylady.com.au/wp-content/uploads/2018/10/Screen-Shot-2018-10-05-at-2.09.37-pm-600x900.png"
            alt=""
            preview={false}
          />
          <Space direction="vertical">
            <Card style={{ width: 352, textAlign: "center" }}>
              <Icon style={{ margin: "32px 0" }} component={LargeLogoIcon} />
              <Space style={{ width: "100%" }} direction="vertical">
                <Input
                  value={email}
                  onChange={handleChangeEmail}
                  style={{ width: "90%", backgroundColor: "#fafafa" }}
                  placeholder="Email"
                />
                <Input
                  type="password"
                  value={password}
                  onChange={handleChangePassword}
                  style={{
                    width: "90%",
                    backgroundColor: "#fafafa",
                    marginBottom: "8px",
                  }}
                  placeholder="Password"
                />
                <Button
                  style={{ borderRadius: "4px", width: "90%" }}
                  type="primary"
                  block
                  onClick={handleLogIn}
                >
                  Log in
                </Button>
                <Divider style={{ color: "#8e8f8f" }}>OR</Divider>
                <Button
                  style={{ color: "#3b5998", fontWeight: "600" }}
                  icon={<Icon component={FacebookIcon} />}
                  type="text"
                  onClick={() => signInWithProvider()}
                >
                  Log in with Facebook
                </Button>
                <Button style={{ color: "#3b5998" }} type="text">
                  Forgot password?
                </Button>
              </Space>
            </Card>
            {/* Footer */}
            <Card size="small" style={{ textAlign: "center" }}>
              <Text>
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  type="text"
                  style={{ color: "#2f96f6", fontWeight: "600" }}
                >
                  Sign up
                </Link>
              </Text>
            </Card>
            <Space
              style={{ textAlign: "center", width: "100%" }}
              direction="vertical"
            >
              <Text>Get the app.</Text>
              <Space style={{ margin: "0 auto" }}>
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
        </Space>
      </div>
    );
})

export default Login;