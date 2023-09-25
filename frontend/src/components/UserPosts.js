

import { EuiComment, EuiAvatar, EuiButton, EuiIcon } from "@elastic/eui";
import React, { Fragment, useState, useEffect } from "react";
import EditPost from "../EditPost";
import Post from "../Post";
import "../Post.css";

const UserPosts = ({ data }) => {
  console.log("UserPosts data:", data);

  const [isEditing, setIsEditing] = useState(false);
  const [postData, setPostData] = useState(data);

  useEffect(() => {
    setPostData(data);
  }, [data]);

  const handleUpdate = (updatedPost) => {
    setIsEditing(false);
    const newPostData = { ...postData, ...updatedPost };
    setPostData(newPostData);
  };

  const onNewPost = (responseData) => {
    const { post, profile } = responseData;
    setPostData(prevData => ({ ...prevData, ...post, ...profile }));
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    setIsEditing(true);
  };

  return (
    <div>
      <h1>#What's on Your Mind</h1>
      <Post data={{ profile_id: data.profile_id, first_name: data.first_name, last_name: data.last_name }} onNewPost={onNewPost} />


      <h1>#My Posts</h1>
      <div className={`custom-comment-container ${isEditing ? "editing" : ""}`}>
        {isEditing ? (
          <EditPost post={postData} onUpdate={handleUpdate} />
        ) : (
          <Fragment>
            <EuiComment
              username={`${postData.first_name || data.first_name} ${postData.last_name || data.last_name}`}
              event="posted at"
              timestamp={postData.date_created || data.date_created}
            >
              {postData.body || data.body}
            </EuiComment>
            <div className="edit-icon-container">
              <EuiIcon
                type="pencil"
                onClick={handleEditClick}
                style={{ cursor: "pointer" }}
              />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default UserPosts;

