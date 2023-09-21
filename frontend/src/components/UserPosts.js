import { EuiComment, EuiAvatar } from "@elastic/eui";
import React, { Fragment, useState, useEffect } from "react";
import EditPost from '../EditPost';
import Post from '../Post';

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

  return (
    <div>
      {/* New Post */}
      <Post onNewPost={onNewPost} />

      {/* Existing Post */}
      {
        isEditing ? (
          <EditPost post={postData} onUpdate={handleUpdate} />
        ) : (
          <Fragment>
            <h1>#Posts</h1>
            <EuiComment
              username={`${postData.first_name} ${postData.last_name}`}
              event="posted at"
              timestamp={postData.date_created}
            >
              {postData.body}
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </EuiComment>
          </Fragment>
        )
      }
    </div>
  );
};

export default UserPosts;
