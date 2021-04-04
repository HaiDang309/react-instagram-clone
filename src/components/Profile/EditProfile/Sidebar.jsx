import React from 'react';

import { Button, Tabs } from "antd";

const Sidebar = React.memo(props => {
    return (
      <Tabs tabPosition="left" defaultActiveKey="1">
        <Tabs.TabPane tab="Edit Profile" key="1" />
        <Tabs.TabPane tab="Change Password" key="2"/>
        <Tabs.TabPane tab="Apps and Websites" key="3"/>
        <Tabs.TabPane tab="Email and SMS" key="4"/>
        <Tabs.TabPane tab="Push Notifications" key="5"/>
        <Tabs.TabPane tab="Manage Contacts" key="6"/>
        <Tabs.TabPane tab="Privacy and Security" key="7"/>
        <Tabs.TabPane tab="Login Activity" key="8"/>
        <Tabs.TabPane tab="Emails from Instagram" key="9"/>
      </Tabs>
    );
})

export default Sidebar;