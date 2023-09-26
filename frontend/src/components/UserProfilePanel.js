import { EuiCard, EuiDescriptionList, EuiIcon, EuiButton } from "@elastic/eui";
import React, { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import "./UserProfilePanel.css";

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
          minHeight: "600px",
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
            >
              <a href={`mailto:${data.email}`}>
                <EuiIcon type="logoTwitter" size="xl" />
              </a>
              <span>
                <EuiIcon type="logoSlack" size="xl" />
              </span>
            </div>
          </div>
        }
        // description={cardFooterContent}
      />
    </>
  );
};

export default UserProfilePanel;
