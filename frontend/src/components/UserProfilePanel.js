import {
  EuiCard,
  EuiDescriptionList,
  EuiIcon,
  EuiFlexGroup,
  EuiPage,
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
    <EuiPage minHeight="fit-content" style={{ background: "transparent" }}>
      <EuiCard
        style={{
          minWidth: "300px",
          maxWidth: "400px",
          height: "700px",
        }}
        textAlign="left"
        image={
          data.profile_pic || `../profile_pics/profile-pic${data.user_id}.png`
        }
        paddingSize="xl"
        title={`${data.first_name} ${data.last_name}`}
        titleElement="h2"
        footer={
          <div>
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
    </EuiPage>
  );
};

export default UserProfilePanel;
