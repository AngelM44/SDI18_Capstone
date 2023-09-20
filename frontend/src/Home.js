
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  EuiButton,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiFlexGrid
} from "@elastic/eui";

function Home() {
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [interests, setInterests] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    // Fetch users
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        // Fetch profiles for all users
        return Promise.all(data.map(user =>
          fetch(`http://localhost:8080/profile/${user.id}`)
            .then(response => response.json())));
      })
      .then(profileData => setProfiles(profileData))
      .catch(error => console.error("Error fetching users and profiles:", error));
    // Fetch interests
    fetch("http://localhost:8080/interests")
      .then(response => response.json())
      .then(data => setInterests(data))
      .catch(error => console.error("Error fetching interests:", error));
  }, []);

  useEffect(() => {
    const data = users.map(user => {

      const userProfile = profiles.find(profile => profile.user_id === user.id);
      return {
        ...user,
        interests: ['basketball'], // For now since we can't fetch user_interests
        profile_pic: userProfile ? userProfile.profile_pic : null // Set default image if not found
      };
    });
    setCombinedData(data);
  }, [users, profiles, interests]);

  return (
    <>
      <h1>Users</h1>
      <EuiFlexGrid columns={4}>
        {combinedData.map(user => (
          <EuiFlexItem key={user.id}>
            <EuiCard
              textAlign="left"
              image={user.profile_pic ? user.profile_pic : "https://source.unsplash.com/400x200/?User"} // Use profile picture if available
              title={`${user.first_name} ${user.last_name}`}
              description={
                <>
                  Email: {user.email} <br />
                  Location: {user.location} <br />
                  Interests: {user.interests.join(", ")} {/* Hard Coded for now */}
                </>
              }
              footer={
                <EuiFlexGroup justifyContent="flexEnd">
                  <EuiFlexItem grow={false}>
                    <Link to={`/profile/${user.id}`}>
                      <EuiButton>View Profile</EuiButton>
                    </Link>
                  </EuiFlexItem>
                </EuiFlexGroup>
              }
            />
          </EuiFlexItem>
        ))}
      </EuiFlexGrid>
    </>
  );
}

export default Home;
