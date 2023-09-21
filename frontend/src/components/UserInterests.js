import React, { useState, useEffect } from "react";
import { EuiBadge, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

const UserInterests = ({ data }) => {
  const [interestNames, setInterestNames] = useState([]);

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
      <h1>#Interests</h1>
      <EuiFlexGroup wrap responsive={false} gutterSize="xs">
        {interestNames.map((interestName, index) => (
          <EuiFlexItem key={index} grow={false}>
            <EuiBadge color="#BADA55">{interestName}</EuiBadge>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </div>
  );
};

export default UserInterests;
