import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiFlexGrid } from "@elastic/eui";
import "./App.css";
import { useSearchContext } from './components/SearchContext'


function Posts() {
  const [Posts, setPosts] = useState([]);

useEffect(() => {
 const fetchposts = async (interestIds) => {
      const posts = await fetch(`http://localhost:8080/posts`)
      .then((res) => res.json())

       setPosts(posts)
    }

  fetchposts()
})


  console.log('posts: ', Posts)


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
                  minWidth: "300px",
                  maxWidth: "400px",
                  minHeight: "450px",
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
                  <h4>{"User: "}{post.profile_id}</h4>
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
