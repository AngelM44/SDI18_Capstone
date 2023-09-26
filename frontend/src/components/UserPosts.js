import {
  EuiComment,
  EuiAvatar,
  EuiButton,
  EuiIcon,
  EuiCommentList,
} from "@elastic/eui";
import React, { Fragment, useState, useEffect, useContext } from "react";
import EditPost from "../EditPost";
import Post from "../Post";
import "../Post.css";
import { useUser } from "./UserContext";

const UserPosts = ({ data }) => {
  console.log("UserPosts data:", data);

  const [isEditing, setIsEditing] = useState(false);
  const [postData, setPostData] = useState(data);
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    setPostData(data);
    const fetchposts = async () => {
      const posts = await fetch(`http://localhost:8080/posts`).then((res) =>
        res.json()
      );

      let filterposts = posts.filter((post) => {
        if (post.profile_id == data.user_id) {
          return post;
        }
      });
      setPosts(filterposts);
    };
    fetchposts();
  }, [data]);
  console.log("posts: ", Posts);
  console.log("Data: ", postData);

  const handleUpdate = (updatedPost) => {
    setIsEditing(false);
    const newPostData = { ...postData, ...updatedPost };
    setPostData(newPostData);
  };

  const onNewPost = (responseData) => {
    const { post, profile } = responseData;
    setPostData((prevData) => ({ ...prevData, ...post, ...profile }));
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const { user } = useUser();

  function formatTimeSinceLastPosted(date_created) {
    const now = new Date();
    const createdDate = new Date(date_created);

    const timeDifferenceMilliseconds = now - createdDate;
    const timeDifferenceSeconds = timeDifferenceMilliseconds / 1000;
    const timeDifferenceMinutes = timeDifferenceSeconds / 60;
    const timeDifferenceHours = timeDifferenceMinutes / 60;
    const timeDifferenceDays = timeDifferenceHours / 24;
    const timeDifferenceWeeks = timeDifferenceDays / 7;
    const timeDifferenceMonths = timeDifferenceDays / 30; // Using a rough estimate for months

    if (timeDifferenceHours < 48) {
      return Math.round(timeDifferenceHours) + " hours ago";
    } else if (timeDifferenceDays < 7) {
      return Math.round(timeDifferenceDays) + " days ago";
    } else if (timeDifferenceWeeks < 4) {
      return Math.round(timeDifferenceWeeks) + " weeks ago";
    } else {
      return Math.round(timeDifferenceMonths) + " months ago";
    }
  }

  return (
    <div>
      {user.id === parseInt(data.id) && (
        <>
          {/* New Post */}
          <h1>#What's on Your Mind</h1>
          <Post
            data={{
              profile_id: data.profile_id,
              first_name: data.first_name,
              last_name: data.last_name,
            }}
            onNewPost={onNewPost}
          />
        </>
      )}
      <h1>#My Posts</h1>
      <div className={`custom-comment-container ${isEditing ? "editing" : ""}`}>
        {isEditing ? (
          <EditPost post={postData} onUpdate={handleUpdate} />
        ) : (
          Posts.map((post) => (
            <Fragment>
              <EuiComment
                timelineAvatar={<span></span>}
                username={`${data.first_name || data.first_name} ${
                  data.last_name || data.last_name
                }`}
                event="posted"
                timestamp={
                  formatTimeSinceLastPosted(post.date_created) ||
                  formatTimeSinceLastPosted(post.date_created)
                }
              >
                {post.body || post.body}
              </EuiComment>
              {user.id === parseInt(post.id) && (
                <div className="edit-icon-container">
                  <EuiIcon
                    type="pencil"
                    onClick={handleEditClick}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default UserPosts;
