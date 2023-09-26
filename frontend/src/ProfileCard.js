import React from "react";
import { EuiCard, EuiAvatar, EuiIcon } from "@elastic/eui";
import { Link } from "react-router-dom";

function ProfileCard({ user }) {
  return (
    <Link
      to={`/profile/${user.user_id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <EuiCard
        className="euiCard-profile"
        title={
          <h2
            style={{
              fontSize: "3rem",
              color: "white",
              lineHeight: "3rem",
            }}
          >
            {`${user.first_name} ${user.last_name}`}
          </h2>
        }
        style={{
          width: "100%",
          height: "500px",
          color: "white",
          borderColor: "grey",
          borderWidth: "1px",
          borderStyle: "solid",
          padding: "5px",
        }}
        image={
          <EuiAvatar
            style={{
              height: "250px",
              width: "250px",
            }}
            name="Profile Pic"
            imageUrl={
              user.profile_pic || `../profile_pics/profile-pic${user.id}.png`
            }
          />
        }
      >
        <EuiIcon color="secondary" type="mapMarker" size="l" />
        {user.location} <br />
        <strong>Interests:</strong> {user.interests.join(", ")}
      </EuiCard>
    </Link>
  );
}

export default ProfileCard;
