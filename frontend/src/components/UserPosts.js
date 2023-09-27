import {
  EuiComment,
  EuiIcon,
  EuiFlexItem,
  EuiFlexGroup,
  EuiSpacer,
  EuiTitle,
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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPostData(data);
    const fetchposts = async () => {
      const posts = await fetch(`http://localhost:8080/posts`).then((res) =>
        res.json()
      );

      let filterposts = posts.filter((post) => {
        if (post.profile_id === data.user_id) {
          return post;
        }
      });
      setPosts(filterposts);
    };
    fetchposts();
  }, [data]);
  console.log("posts: ", posts);
  console.log("Data: ", postData);

  const handleUpdate = (updatedPost) => {
    setIsEditing(false);
    const newPostData = { ...postData, ...updatedPost };
    setPostData(newPostData);
  };

  const onNewPost = (responseData) => {
    const { post, profile } = responseData;
    setPostData((prevData) => ({ ...prevData, ...post, ...profile }));
    console.log("onNewPost Data: ", postData);
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const { user } = useUser();

  console.log("user: ", user);

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
      {user.id === parseInt(data.user_id) && (
        <>
          {/* New Post */}
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiIcon type="pencil" size="xl" />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiTitle>
                <h1>What's On Your Mind?</h1>
              </EuiTitle>
            </EuiFlexItem>
          </EuiFlexGroup>
          <Post
            data={{
              profile_id: data.user_id,
              first_name: data.first_name,
              last_name: data.last_name,
            }}
            onNewPost={onNewPost}
          />
        </>
      )}
      <div className={`custom-comment-container ${isEditing ? "editing" : ""}`}>
        {postData.body === null ? (
          <h1 style={{ paddingLeft: "30px" }}>Make Your First Post!</h1>
        ) : (
          <>
            <EuiFlexGroup alignItems="center">
              <EuiFlexItem grow={false}>
                <EuiIcon type="visText" size="xl" />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiTitle>
                  <h1>User Posts</h1>
                </EuiTitle>
              </EuiFlexItem>
            </EuiFlexGroup>
            {isEditing ? (
              <EditPost post={postData} onUpdate={handleUpdate} />
            ) : (
              posts.map((post) => (
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
                  {user.id === parseInt(data.user_id) && (
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
          </>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
