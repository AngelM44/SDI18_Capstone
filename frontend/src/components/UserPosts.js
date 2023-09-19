import { EuiComment, EuiAvatar } from "@elastic/eui";
import React, { Fragment } from "react";

const UserPosts = ({ data }) => (
  <Fragment>
    <h1>#Posts</h1>
    <EuiComment
      username={`${data.first_name} ${data.last_name}`}
      event="posted at"
      timestamp={`${data.date_created}`}
    >
      {`${data.body}`}
    </EuiComment>
  </Fragment>
);

export default UserPosts;
