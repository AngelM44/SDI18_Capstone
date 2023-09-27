import React, { Fragment, useState, useEffect } from "react";
import {
  EuiComment,
  EuiIcon,
  EuiFlexItem,
  EuiFlexGroup,
  EuiTitle,
} from "@elastic/eui";
import EditPost from "../EditPost";
import Post from "../Post";
import "../Post.css";
import { useUser } from "./UserContext";
import axios from "axios";

const UserPosts = ({ data }) => {
  const [editingPostId, setEditingPostId] = useState(null);
  const [postData, setPostData] = useState(data);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPostData(data);
    const fetchposts = async () => {
      const posts = await fetch(`http://localhost:8080/posts`).then((res) =>
        res.json()
      );
      let filterposts = posts.filter(
        (post) => post.profile_id === data.user_id
      );
      setPosts(filterposts);
    };
    fetchposts();
  }, [data]);

  const handleUpdate = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setEditingPostId(null);
  };

  const onNewPost = (responseData) => {
    const { post } = responseData;
    setPosts((prevPosts) => [post, ...prevPosts]);
    responseData.date_created = new Date();
    if (postData.body === null) {
      setPostData(post);
    }
    console.log("onNewPost Data: ", postData);
  };

  const handleEditClick = (postId) => {
    setEditingPostId(postId);
  };

  const { user } = useUser();

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/posts/${postId}`
        );

        if (response.status === 200) {
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
          );
        } else {
          console.error("Failed to delete post:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };
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
      <div
        className={`custom-comment-container ${editingPostId ? "editing" : ""}`}
      >
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
            {posts.map((post) => (
              <EuiFlexItem style={{ width: "97%" }} key={post.id}>
                {editingPostId === post.id ? (
                  <EditPost post={post} onUpdate={handleUpdate} />
                ) : (
                  <EuiComment
                    timelineAvatar={<span></span>}
                    username={`${data.first_name || data.first_name} ${
                      data.last_name || data.last_name
                    }`}
                    event="posted"
                    timestamp={formatTimeSinceLastPosted(post.date_created)}
                  >
                    {post.body && post.body}
                    {user.id === parseInt(data.user_id) && (
                      <span className="edit-icon-container">
                        <EuiIcon
                          type="pencil"
                          title="Edit Post"
                          onClick={() => handleEditClick(post.id)}
                          style={{ cursor: "pointer" }}
                        />
                        <EuiIcon
                          type="trash"
                          title="Delete Post"
                          onClick={() => handleDelete(post.id)}
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                        />
                      </span>
                    )}
                  </EuiComment>
                )}
              </EuiFlexItem>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
