import React from "react";
import { EuiFlexGroup, EuiFlexItem, EuiFlexGrid } from "@elastic/eui";
import ProfilePic from "./ProfilePic";
import UserInfo from "./UserInfo";
import ProfileLoader from "./ProfileLoader";

const UserProfile = () => {
  return (
    <EuiFlexGroup>
      <div style={{ width: "30%" }}>
        <ProfilePic />
      </div>
      <div style={{ width: "70%" }}>
        <UserInfo />
      </div>
    </EuiFlexGroup>
  );
};

export default UserProfile;
