import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiFlexGrid } from "@elastic/eui";
import "./App.css";
import { useSearchContext } from "./components/SearchContext";
import Banner from './Banner';
import DescriptionBanner from './DescriptionBanner';



function Home() {
  const [combinedData, setCombinedData] = useState([]);
  const { searchValue } = useSearchContext();

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
        console.log("Users:", users);

        const profilesResponse = await Promise.all(
          users.map((user) =>
            fetch(`http://localhost:8080/profile/${user.id}`).then((response) =>
              response.json()
            )
          )
        );
        console.log("Profiles:", profilesResponse);

        const dataWithInterests = await Promise.all(
          users.map(async (user) => {
            const userProfile =
              profilesResponse.find((profile) => profile.user_id === user.id) ||
              {};
            const userInterests = await fetchInterestsForUser(
              userProfile.interests || []
            );
            return {
              id: user.id,
              profile_id: userProfile.id,
              ...user,
              ...userProfile,
              interests: userInterests,
            };
          })
        );
        console.log("Combined Data:", dataWithInterests);

        setCombinedData(dataWithInterests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //modify the combined data ONLY if the searchValue is not ''
  if (searchValue !== "") {
    let searchedProfiles = combinedData.filter((user) => {
      return (
        user.first_name.includes(searchValue) ||
        user.last_name.includes(searchValue) ||
        user.interests.includes(searchValue)
      );
    });
    //setCombinedData(searchedProfiles)
  }

  return (
    <div style={{ height: "100vh", width: "100vw", minHeight: "100vh" }}>

      <Banner />
      <DescriptionBanner />

      <div className="cards-banner">
        <EuiFlexGrid className="custom-flex-grid" columns={4} gutterSize="s">
          {combinedData.map((user) => (
            <EuiFlexItem
              className="custom-flex-item"
              key={`${user.id}-${user.profile_id}`}
              style={{ padding: "5px" }}
            >
              <Link
                to={`/profile/${user.user_id}`}
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
                        backgroundImage: `url(${user.profile_pic ||
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
    </div>
  );
}

export default Home;
