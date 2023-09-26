import {
  EuiCard,
  EuiDescriptionList,
  EuiIcon,
  EuiFlexGroup,
} from "@elastic/eui";
import React, { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import "./UserProfilePanel.css";
import {
  FaGithubSquare,
  FaTwitter,
  FaLinkedin,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

const UserProfilePanel = ({ data }) => {
  const cardFooterContent = (
    <EuiDescriptionList
      type="responsiveColumn"
      listItems={[
        {
          title: (
            <EuiIcon
              title="Location"
              color="secondary"
              type="mapMarker"
              size="l"
            />
          ),
          description: `${data.location}`,
        },
        {
          title: (
            <EuiIcon
              title="Availability"
              color="secondary"
              type="clock"
              size="l"
            />
          ),
          description: `${data.availability}`,
        },
        {
          title: (
            <EuiIcon title="Email" color="secondary" type="email" size="l" />
          ),
          description: `${data.email}`,
        },
      ]}
    />
  );

  return (
    <>
      <EuiCard
        style={{
          marginTop: "10px",
          minWidth: "300px",
          maxWidth: "500px",
          maxHeight: "50%",
          minHeight: "630px",
        }}
        textAlign="left"
        // href="https://elastic.github.io/eui/"
        image={`${data.profile_pic}`}
        paddingSize="l"
        title={`${data.first_name} ${data.last_name}`}
        titleElement="h2"
        footer={
          <div style={{}}>
            {cardFooterContent}
            <div
              style={{
                display: "flex",
                gap: "10px",
                paddingTop: "20px",
              }}
            ></div>
            <EuiFlexGroup
              style={{
                width: "100%",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <FaGithubSquare size={"1.5rem"} />
              <FaInstagramSquare size={"1.5rem"} />
              <FaLinkedin size={"1.5rem"} />
              <FaTwitter size={"1.5rem"} />
              <FaYoutubeSquare size={"1.5rem"} />
            </EuiFlexGroup>
          </div>
        }
      />
    </>
  );
};

export default UserProfilePanel;
