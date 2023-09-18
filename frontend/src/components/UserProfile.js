import React from "react";
import { EuiFlexGroup } from "@elastic/eui";
import UserProfilePanel from "./UserProfilePanel";
import UserInfo from "./UserInfo";
import UserProfileLoader from "./UserProfileLoader";

const UserProfile = () => {
  return (
    <EuiFlexGroup style={{ margin: "5px" }}>
      <div style={{ width: "30%" }}>
        <UserProfilePanel />
      </div>
      <div style={{ width: "70%" }}>
        <UserInfo />
      </div>
    </EuiFlexGroup>
  );
};

export default UserProfile;
