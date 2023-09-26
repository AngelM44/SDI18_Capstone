import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiFlexGrid } from "@elastic/eui";
import "./App.css";
import { useSearchContext } from './components/SearchContext'
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

// <Stack spacing={2}>
//       <Pagination count={10} />
//       <Pagination count={10} color="primary" />
//       <Pagination count={10} color="secondary" />
//       <Pagination count={10} disabled />
//     </Stack>



function Posts() {
  const [Posts, setPosts] = useState([]);
  const [Users, setUsers] = useState([]);

useEffect(() => {
 const fetchposts = async () => {
      const posts = await fetch(`http://localhost:8080/posts`)
      .then((res) => res.json())


      posts.sort((a, b) => {
        const dateA = new Date(a.date_created);
        const dateB = new Date(b.date_created);
        return dateB - dateA;
      });

      setPosts(posts)

    }
  const fetchUsers = async () => {
    const users = await fetch(`http://localhost:8080/users`)
    .then((res) => res.json())

    setUsers(users)
  }

  fetchposts()
  fetchUsers()
})

const fetchProfileName = (id) => {
  //console.log('id', id)
  if (id >= 1 && id <= Users.length) {
    const user = Users[id - 1];
    return (`${user.first_name} ${user.last_name}`)
  }
}

  //console.log('posts: ', Posts)
  //console.log('users: ', Users)


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
    <div style={{ height: "100vh", width: "100vw", minHeight: "100vh" }} align={'center'}>
      <h1>Posts</h1>
      <EuiFlexGrid className="custom-flex-grid" columns={1} grow={true}>
        {Posts.map((post) => (
          <EuiFlexItem
            className="custom-flex-item"
            key={`${post.id}`}
            style={{ padding: "5px" }}
          >
            <Link

              style={{ textDecoration: "none", color: "inherit" }}
            >
              <EuiCard
                className="euiCard"
                style={{
                  marginTop: "10px",
                  minWidth: "1000px",
                  maxWidth: "800px",
                  minHeight: "200px",
                  backgroundColor: "#4267B2",
                  color: "white",
                  borderColor: "grey",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                textAlign="left"
                // image={
                //   <div
                //     style={{
                //       height: "300px",
                //       backgroundSize: "contain",
                //       backgroundImage: `url(${
                //         user.profile_pic ||
                //         `https://source.unsplash.com/400x200/?person,portrait&${user.id}`
                //       })`,
                //       backgroundPosition: "center center",
                //       backgroundRepeat: "no-repeat",
                //     }}
                //   ></div>
                //}
                paddingSize="l"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    marginTop: "80px",
                  }}
                >
                  <h3>{"Date Created: "}{formatTimeSinceLastPosted(post.date_created)}</h3>
                  <h2>{post.body}</h2>
                  <h4>{"User: "}{fetchProfileName(post.profile_id)}</h4>
                  <div
                    style={{
                      textAlign: "left",
                      flexGrow: 1,
                      marginBottom: "15px",
                    }}
                  >
                  </div>
                </div>
              </EuiCard>
            </Link>
          </EuiFlexItem>
        ))}
      </EuiFlexGrid>

    </div>

  );
}

export default Posts;
