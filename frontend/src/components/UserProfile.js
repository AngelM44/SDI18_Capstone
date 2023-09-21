import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EuiFlexGroup, EuiPage, EuiButton } from "@elastic/eui";
import UserProfilePanel from "./UserProfilePanel";
import UserInfo from "./UserInfo";
import UserProfileLoader from "./UserProfileLoader";
import UserInterests from "./UserInterests";
import UpdateProfile from "./UpdateProfile";

const UserProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/profile/${id}`)
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (profileData.id === undefined) {
    return <UserProfileLoader />;
  } else {
    return (
      <EuiPage
        style={{ height: "100vh", paddingLeft: "5px", paddingRight: "5px" }}
      >
        <EuiFlexGroup>
          <UserProfilePanel data={profileData} />
          <UserInfo data={profileData} />
          <EuiButton
            color="secondary"
            size="xs"
            paddingSize="m"
            onClick={() => setOpenUpdate(true)}
            iconType="documentEdit"
          >
            Update
          </EuiButton>
          {/* <UserInterests data={profileData} /> */}
          {openUpdate && (
            <UpdateProfile setOpenUpdate={setOpenUpdate} user={profileData} />
          )}
        </EuiFlexGroup>
      </EuiPage>
    );
  }
};

export default UserProfile;
