import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiFlexGrid } from "@elastic/eui";
import "./App.css";

function Home() {
  const [combinedData, setCombinedData] = useState([]);

  const fetchInterestsForUser = async (interestIds) => {
    try {
      const fetchedInterests = await Promise.all(
        interestIds.map((interestId) =>
          fetch(`http://localhost:8080/interests/${interestId}`).then((res) =>
            res.json()
          )
        )
      );
      return fetchedInterests.map((interest) => interest.name);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("http://localhost:8080/users");
        const users = await usersResponse.json();

        const profilesResponse = await Promise.all(
          users.map((user) =>
            fetch(`http://localhost:8080/profile/${user.id}`).then((response) =>
              response.json()
            )
          )
        );

        const dataWithInterests = await Promise.all(
          users.map(async (user, index) => {
            const userProfile = profilesResponse[index];
            const userInterests = await fetchInterestsForUser(
              userProfile.interests || []
            );
            return {
              ...user,
              ...userProfile,
              interests: userInterests,
            };
          })
        );

        setCombinedData(dataWithInterests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", minHeight: "100vh" }}>
      <h1>Users</h1>
      <EuiFlexGrid className="custom-flex-grid" columns={4} gutterSize="s">
        {combinedData.map((user) => (
          <EuiFlexItem
            className="custom-flex-item"
            key={user.id}
            style={{ padding: "5px" }}
          >
            <Link
              to={`/profile/${user.id}`}
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
                image={
                  <div
                    style={{
                      height: "300px",
                      backgroundSize: "contain",
                      backgroundImage: `url(${
                        user.profile_pic ||
                        `https://source.unsplash.com/400x200/?person,portrait&${user.id}`
                      })`,
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                }
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
                  <h2>{`${user.first_name} ${user.last_name}`}</h2>
                  <div
                    style={{
                      textAlign: "left",
                      flexGrow: 1,
                      marginBottom: "15px",
                    }}
                  >
                    <strong>Email:</strong> {user.email} <br />
                    <strong>Location:</strong> {user.location} <br />
                    <strong>Interests:</strong> {user.interests.join(", ")}
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

export default Home;
