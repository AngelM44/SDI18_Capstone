import React, { useState, useEffect } from "react";
import {
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiTitle,
  EuiSpacer,
} from "@elastic/eui";

const UserInterests = ({ data }) => {
  const [interestNames, setInterestNames] = useState([]);

  function generateRandomColor() {
    const hexDigits = "0123456789ABCDEF";
    let randColor = "#";
    for (let i = 0; i < 6; i++) {
      randColor += hexDigits[Math.floor(Math.random() * 16)];
    }
    return randColor;
  }

  useEffect(() => {
    if (data.interests) {
      Promise.all(
        data.interests.map((interestId) =>
          fetch(`http://localhost:8080/interests/${interestId}`).then((res) =>
            res.json()
          )
        )
      )
        .then((fetchedInterests) => {
          setInterestNames(fetchedInterests.map((interest) => interest.name));
        })
        .catch((error) => console.error(error));
    }
  }, [data.interests]);

  return (
    <div textAlign="left">
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiIcon type="heart" size="xl" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle>
            <h1>Interests</h1>
          </EuiTitle>
          <EuiSpacer size="m" />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup wrap responsive={false} gutterSize="xs">
        {interestNames.map((interestName, index) => (
          <EuiFlexItem key={index} grow={false}>
            <EuiBadge
              style={{ fontSize: "1rem", padding: "5px" }}
              color={generateRandomColor()}
            >
              {interestName}
            </EuiBadge>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </div>
  );
};

export default UserInterests;
