import React, { useState, useEffect } from "react";
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
  const [interests, setInterests] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));

    fetch("http://localhost:8080/interests")
      .then((response) => response.json())
      .then((data) => setInterests(data))
      .catch((error) => console.error("Error fetching interests:", error));

    fetch("http://localhost:8080/user-interests")
      .then((response) => response.json())
      .then((data) => setUserInterests(data))
      .catch((error) => console.error("Error fetching user-interests:", error));
  }, []);

  useEffect(() => {
    const data = users.map((user) => {
      const userInterestsForUser = userInterests.filter(
        (ui) => ui.user_id === user.id
      );
      const interestsForUser = userInterestsForUser.map((ui) =>
        interests.find((interest) => interest.id === ui.interest_id)
      );
      return {
        ...user,
        interests: interestsForUser,
      };
    });
    setCombinedData(data);
  }, [users, interests, userInterests]);

  return (
    <>
      <EuiFlexGrid columns={4}>
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            image={
              <div>
                <img
                  src="https://source.unsplash.com/400x200/?Nature"
                  alt="Nature"
                />
              </div>
            }
            title="Elastic in Nature"
            description="Example of a card's description. Stick to one or two sentences."
            footer={
              <EuiFlexGroup justifyContent="flexEnd">
                <EuiFlexItem grow={false}>
                  <EuiButton>Go for it</EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            }
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            image="https://source.unsplash.com/400x200/?Water"
            title="Elastic in Water"
            description="Example of a card's description. Stick to one or two sentences."
            isDisabled
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            href="https://elastic.github.io/eui/"
            image="https://source.unsplash.com/400x200/?City"
            icon={<EuiIcon size="xxl" type="logoBeats" />}
            title={"Beats in the City"}
            description="This card has an href and should be a link."
          />
        </EuiFlexItem>
        {combinedData.map((user) => (
          <EuiFlexItem>
            <EuiCard
              key={user.id}
              textAlign="left"
              href={`http://localhost:8080/${user.id}`}
              image={`${user.image}`}
              icon={<EuiIcon size="xxl" type="logoBeats" />}
              title={user.first_name}
              description={user.last_name}
            />
            {console.log(user)}
          </EuiFlexItem>
        ))}
      </EuiFlexGrid>
      <div>
        <h1>Users</h1>
        <ul>
          {combinedData.map((user) => (
            <li key={user.id}>
              <strong>
                {user.first_name} {user.last_name}
              </strong>{" "}
              <br />
              Email: {user.email} <br />
              Location: {user.location} <br />
              Interests:{" "}
              {user.interests.map((interest) => interest.name).join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
