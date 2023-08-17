import React from "react";
import Avatar, { ConfigProvider } from "react-avatar";

const GroupAvator = () => {
  <ConfigProvider colors={["red", "green", "blue"]}>
    <Avatar name="Wim Mostmans" />
  </ConfigProvider>;
};

export default GroupAvator;
