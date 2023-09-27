import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [interestCat, setInterestCat] = useState([]);

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
          setInterestCat(fetchedInterests.map((category) => category.category));
        })
        .catch((error) => console.error(error));
    }
  }, [data.interests]);

  const interestCatName = (index) => {
    let catName = interestCat[index];
    return `/${catName}`;
  };

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
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      <EuiFlexGroup wrap responsive={false} gutterSize="xs">
        {interestNames.map((interestName, index) => (
          <EuiFlexItem key={index} grow={false}>
            {console.log(index)}
            <Link
              to={interestCatName(index)}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <EuiBadge
                style={{ cursor: "pointer", fontSize: "1rem", padding: "5px" }}
                color={generateRandomColor()}
              >
                {interestName}
              </EuiBadge>
            </Link>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </div>
  );
};

export default UserInterests;
