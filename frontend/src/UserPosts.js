import { EuiComment, EuiText, EuiAvatar, EuiCode } from "@elastic/eui";
import React, { Fragment } from "react";

const defaultBody = (
  <EuiText size="s">
    <p>
      This comment and the one below are using the default{" "}
      <EuiCode>timelineIcon</EuiCode>.
    </p>
  </EuiText>
);

const iconStringBody = (
  <EuiText size="s">
    <p>
      This comment passed the string &ldquo;tag&rdquo; to the{" "}
      <EuiCode>timelineIcon</EuiCode> prop.
    </p>
  </EuiText>
);

const customIconBody = (
  <EuiText size="s">
    <p>
      This comment has a custom element as its <EuiCode>timelineIcon</EuiCode>.
    </p>
  </EuiText>
);

const UserPosts = () => (
  <Fragment>
    <h1>#Posts</h1>
    <EuiComment
      username="janed"
      event="added a comment"
      timestamp="Jan 1, 2020"
    >
      {defaultBody}
    </EuiComment>
    <EuiComment
      username="juanab"
      event="added a comment"
      timestamp="Jan 3, 2020"
      timelineIcon={
        <EuiAvatar
          imageUrl="https://source.unsplash.com/64x64/?woman"
          size="l"
          name="Juana"
        />
      }
    >
      {customIconBody}
    </EuiComment>
  </Fragment>
);

export default UserPosts;
