import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlexGrid,
  EuiAvatar,
  EuiIcon,
} from "@elastic/eui";

import { useSearchContext } from "./components/SearchContext";
import Banner from "./Banner";
import DescriptionBanner from "./DescriptionBanner";

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
        <EuiFlexGrid className="custom-flex-grid" columns={4} gap="">
          {combinedData.map((user) => (
            <EuiFlexItem
              className="custom-flex-item"
              key={`${user.id}-${user.profile_id}`}
            >
              <Link
                to={`/profile/${user.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <EuiCard
                  className="euiCard-profile"
                  title={
                    <h2
                      style={{
                        fontSize: "3rem",
                        color: "white",
                        lineHeight: "3rem",
                      }}
                    >{`${user.first_name} ${user.last_name}`}</h2>
                  }
                  style={{
                    width: "100%",
                    height: "500px",
                    color: "white",
                    borderColor: "grey",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    padding: "5px",
                  }}
                  image={
                    <EuiAvatar
                      style={{
                        height: "250px",
                        width: "250px",
                      }}
                      name="Profile Pic"
                      imageUrl={
                        user.profile_pic ||
                        `https://source.unsplash.com/400x200/?person,portrait&${user.id}`
                      }
                    />
                  }
                >
                  <EuiIcon color="secondary" type="mapMarker" size="l" />
                  {user.location} <br />
                  <strong>Interests:</strong> {user.interests.join(", ")}
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
