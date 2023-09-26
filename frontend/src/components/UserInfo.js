import {
  EuiText,
  EuiSpacer,
  EuiHorizontalRule,
  EuiPageBody,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiIcon,
} from "@elastic/eui";
import React from "react";
import UserInterests from "./UserInterests";
import UserPosts from "./UserPosts";

const UserInfo = ({ data }) => (
  <EuiPageBody>
    <EuiPanel paddingSize="l" hasShadow>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiIcon type="user" size="xl" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle>
            <h1>About Me</h1>
          </EuiTitle>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiText>
        <p>{data.info}</p>
      </EuiText>
      <EuiHorizontalRule margin="m" />
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiIcon type="sparkles" size="xl" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle>
            <h1>Goals</h1>
          </EuiTitle>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiText>
        <p>{data.goals}</p>
      </EuiText>
    </EuiPanel>
    <EuiSpacer size="m" />
    <UserInterests data={data} />
    <EuiHorizontalRule margin="m" />
    <UserPosts data={data} />
    <EuiSpacer size="m" />
  </EuiPageBody>
);

export default UserInfo;
