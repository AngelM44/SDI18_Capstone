

import React, { useState, useEffect } from "react";
import { EuiFlexGrid, EuiFlexItem } from "@elastic/eui";
import { useSearchContext } from "./components/SearchContext";
import StrengthBanner from "./StrengthBanner";
import ProfileCard from "./ProfileCard";
import "./Banner.css";

function Strength() {
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

        const profilesResponse = await Promise.all(
          users.map((user) =>
            fetch(`http://localhost:8080/profile/${user.id}`).then((response) =>
              response.json()
            )
          )
        );

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

        const StrengthPeople = dataWithInterests.filter(item => {
          return ["Weightlifting", "Crossfit", "Olympic Lifting", "Squats", "Deadlift"].some(interest => item.interests.includes(interest));
        });

        setCombinedData(StrengthPeople);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", minHeight: "100vh" }}>
      <StrengthBanner />
      <div className="cards-banner">
        <EuiFlexGrid className="custom-flex-grid" columns={4} gap="">
          {combinedData.map((user) => (
            <EuiFlexItem className="custom-flex-item" key={`${user.id}-${user.profile_id}`}>
              <ProfileCard user={user} />
            </EuiFlexItem>
          ))}
        </EuiFlexGrid>
      </div>
    </div>
  );
}

export default Strength;

