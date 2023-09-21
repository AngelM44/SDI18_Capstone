
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
import './App.css';

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
    <div style={{
      height: '100vh',
      width: '100vw',
      minHeight: '100vh',
      // color: 'white'
    }}>
      <h1>Users</h1>
      <EuiFlexGrid className="custom-flex-grid" columns={4} gutterSize="s">
        {combinedData.map(user => (
          <EuiFlexItem className="custom-flex-item" key={user.id} style={{ padding: "5px" }}>
            <Link to={`/profile/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

              <EuiCard className="euiCard"
                style={{
                  marginTop: "10px",
                  minWidth: "300px",
                  maxWidth: "400px",
                  minHeight: "450px",
                  backgroundColor: '#4267B2',
                  color: 'white',
                  borderColor: 'grey',
                  borderWidth: '1px',
                  borderStyle: 'solid'

                }}
                textAlign="left"
                image={
                  <div style={{
                    height: '300px',
                    backgroundSize: 'contain',
                    backgroundImage: `url(${user.profile_pic ? user.profile_pic : "https://source.unsplash.com/400x200/?User"})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat'
                  }}></div>
                }
                paddingSize="l"
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  marginTop: '80px'
                }}>
                  <h2>{`${user.first_name} ${user.last_name}`}</h2>
                  <div style={{ textAlign: 'left', flexGrow: 1, marginBottom: '15px' }}>
                    <strong>Email:</strong> {user.email} <br />
                    <strong>Location:</strong> {user.location} <br />
                    <strong>Interests:</strong> {user.interests.join(', ')}
                  </div>
                  <div style={{ textAlign: 'right' }}>
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
