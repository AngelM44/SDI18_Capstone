import {
  EuiText,
  EuiSpacer,
  EuiHorizontalRule,
  EuiPageBody,
} from "@elastic/eui";
import React from "react";
import UserInterests from "./UserInterests";
import UserPosts from "./UserPosts";

const UserInfo = ({ data }) => (
  <EuiPageBody>
    <EuiText>
      <h1>#About Me</h1>
      <p>{data.info}</p>
      <EuiHorizontalRule margin="m" size="l" />
      <h1>#Goals</h1>
      <p>{data.goals}</p>
    </EuiText>
    <EuiHorizontalRule margin="m" />
    <UserInterests data={data} />
    <EuiHorizontalRule margin="m" />
    <UserPosts data={data} />
    <EuiSpacer />
  </EuiPageBody>
);

export default UserInfo;
