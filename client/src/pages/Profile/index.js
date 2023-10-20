import React from "react";
import { Tabs } from "antd";
import Projects from "./Projects";

function Profile() {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Projects" key="1">
        {/* Render the "Projects" component when the "Projects" tab is active */}
        <Projects />
      </Tabs.TabPane>
      <Tabs.TabPane tab="General" key="2">
        {/* Placeholder content for the "General" tab */}
        General
      </Tabs.TabPane>
    </Tabs>
  );
}

export default Profile;
