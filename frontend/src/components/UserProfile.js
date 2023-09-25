import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EuiFlexGroup, EuiPage, EuiIcon } from "@elastic/eui";
import UserProfilePanel from "./UserProfilePanel";
import UserInfo from "./UserInfo";
import UserProfileLoader from "./UserProfileLoader";
import UpdateProfile from "./UpdateProfile";

const UserProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleUserUpdate = (updatedUserData) => {
    setProfileData(updatedUserData);
  };

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
        style={{ height: "100vh", paddingLeft: "30px", paddingRight: "30px" }}
      >
        <EuiFlexGroup>
          <UserProfilePanel data={profileData} />
          <UserInfo data={profileData} />
          <div style={{ padding: "5px", opacity: ".6", cursor: "pointer" }}>
            <EuiIcon
              color="secondary"
              type="documentEdit"
              size="l"
              onClick={() => setOpenUpdate(true)}
            />
          </div>
          {openUpdate && (
            <UpdateProfile
              setOpenUpdate={setOpenUpdate}
              user={profileData}
              onUserUpdate={handleUserUpdate}
            />
          )}
        </EuiFlexGroup>
      </EuiPage>
    );
  }
};

export default UserProfile;
