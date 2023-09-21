import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EuiFlexGroup, EuiPage } from "@elastic/eui";
import UserProfilePanel from "./UserProfilePanel";
import UserInfo from "./UserInfo";
import UserProfileLoader from "./UserProfileLoader";
import UserInterests from "./UserInterests";

const UserProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState([]);
  // const [selected, setSelected] = useState(false);
  // const { reservation, setReservation } = useVehicleContext();

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
          {/* <UserInterests data={profileData} /> */}
        </EuiFlexGroup>
      </EuiPage>
    );
  }
};

export default UserProfile;
