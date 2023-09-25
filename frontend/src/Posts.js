import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiFlexGrid } from "@elastic/eui";
import "./App.css";
import { useSearchContext } from './components/SearchContext'


function Posts() {
  const [Posts, setPosts] = useState([]);
  const [Users, setUsers] = useState([]);

useEffect(() => {
 const fetchposts = async () => {
      const posts = await fetch(`http://localhost:8080/posts`)
      .then((res) => res.json())

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
                  <h3>{"Date Created: "}{post.date_created}</h3>
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
