import { EuiComment, EuiAvatar, EuiButton, EuiIcon } from "@elastic/eui";
import React, { Fragment, useState, useEffect, useContext } from "react";
import EditPost from "../EditPost";
import Post from "../Post";
import "../Post.css";
import { useUser } from "./UserContext";

const UserPosts = ({ data }) => {
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

  const onNewPost = (newPost) => {
    setPostData(newPost);
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const { user } = useUser();

  return (
    <div>
      {user.id === parseInt(data.id) && (
        <>
          {/* New Post */}
          <h1>#What's on Your Mind</h1>
          <Post data={data} onNewPost={onNewPost} />
        </>
      )}

      <h1>#My Posts</h1>
      <div className={`custom-comment-container ${isEditing ? "editing" : ""}`}>
        {isEditing ? (
          <EditPost post={postData} onUpdate={handleUpdate} />
        ) : (
          <Fragment>
            <EuiComment
              username={`${postData.first_name} ${postData.last_name}`}
              event="posted at"
              timestamp={postData.date_created}
            >
              {postData.body}
            </EuiComment>
            {user.id === parseInt(data.id) && (
              <div className="edit-icon-container">
                <EuiIcon
                  type="pencil"
                  onClick={handleEditClick}
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
