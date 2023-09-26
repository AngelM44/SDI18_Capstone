import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EuiFlexGrid, EuiFlexItem } from "@elastic/eui";
import { useSearchContext } from "./components/SearchContext";
import Banner from "./Banner";
import DescriptionBanner from "./DescriptionBanner";
import ProfileCard from "./ProfileCard"; // Make sure to correctly path to the ProfileCard

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

  // Modify the combined data ONLY if the searchValue is not ''
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
    <div>
      <Banner />
      <DescriptionBanner />

      <div className="cards-banner">
        <EuiFlexGrid className="custom-flex-grid" columns={4}>
          {combinedData.map((user) => (
            <EuiFlexItem
              className="custom-flex-item"
              key={`${user.id}-${user.profile_id}`}
            >
              <ProfileCard user={user} />
            </EuiFlexItem>
          ))}
        </EuiFlexGrid>
      </div>
    </div>
  );
}

export default Home;
