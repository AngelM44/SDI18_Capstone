import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EuiFlexItem, EuiFlexGrid, EuiComment, EuiAvatar } from "@elastic/eui";
import "./App.css";
import { useSearchContext } from "./components/SearchContext";
import UserProfileLoader from "./components/UserProfileLoader";
// import { post } from "../../backend/routes/profile";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchposts = async () => {
      const posts = await fetch(`http://localhost:8080/posts`).then((res) =>
        res.json()
      );

      setPosts(posts);
    };
    const fetchUsers = async () => {
      const users = await fetch(`http://localhost:8080/users`).then((res) =>
        res.json()
      );

      setUsers(users);
    };

    const fetchProfile = async (id) => {
      const profiles = await fetch(`http://localhost:8080/profile`).then(
        (res) => res.json()
      );

      setProfiles(profiles);
    };

    fetchProfile();
    fetchposts();
    fetchUsers();
  }, []);

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

  const fetchProfileName = (id) => {
    //console.log('id', id)
    if (id >= 1 && id <= users.length) {
      const user = users.filter((user) => user.id === id);
      return `${user[0].first_name} ${user[0].last_name}`;
    }
  };

  const fetchProfilePic = (id) => {
    //console.log('id', id)
    if (id >= 1 && id <= profiles.length) {
      const profile = profiles.filter((profile) => profile.id === id);
      return profile[0].profile_pic;
    }
  };

  //console.log('posts: ', Posts)
  //console.log('users: ', Users)

  if (posts.length === 0 || profiles.length === 0 || users.length === 0) {
    return UserProfileLoader;
  } else {
    return (
      <div align={"center"}>
        <h1 style={{ fontSize: "4rem" }}>Community Posts</h1>
        <EuiFlexGrid className="custom-flex-grid" columns={1} grow={true}>
          {posts.map((post) => (
            <EuiFlexItem
              className="custom-flex-item"
              key={`${post.id}`}
              style={{ padding: "5px" }}
            >
              {console.log(fetchProfilePic(post.profile_id))}
              <Link
                to={`/profile/${post.profile_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <EuiComment
                  align="left"
                  timelineAvatar={
                    <EuiAvatar
                      style={{ marginTop: "25px" }}
                      imageUrl={fetchProfilePic(post.profile_id)}
                      size="xl"
                      name={fetchProfileName(post.profile_id)}
                    />
                  }
                  username={fetchProfileName(post.profile_id)}
                  event="posted"
                  timestamp={
                    formatTimeSinceLastPosted(post.date_created) ||
                    formatTimeSinceLastPosted(post.date_created)
                  }
                >
                  {post.body || post.body}
                </EuiComment>
              </Link>
            </EuiFlexItem>
          ))}
        </EuiFlexGrid>
      </div>
    );
  }
}

export default Posts;
