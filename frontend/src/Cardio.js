import React, { useState, useEffect } from "react";
import { EuiFlexGrid, EuiFlexItem } from "@elastic/eui";
import { useSearchContext } from "./components/SearchContext";
import CardioBanner from "./CardioBanner";
import ProfileCard from "./ProfileCard";
import "./Banner.css";

function Cardio() {
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

        const CardioPeople = dataWithInterests.filter((item) => {
          return [
            "Dance Classes",
            "Swimming",
            "Olympic Lifting",
            "High-Intensity Interval Training",
            "Running",
            "Crossfit",
          ].some((interest) => item.interests.includes(interest));
        });

        setCombinedData(CardioPeople);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <CardioBanner />
      <div className="cards-banner">
        <EuiFlexGrid className="custom-flex-grid" columns={4} gap="">
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

export default Cardio;
