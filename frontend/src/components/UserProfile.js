import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EuiFlexGroup } from "@elastic/eui";
import UserProfilePanel from "./UserProfilePanel";
import UserInfo from "./UserInfo";
import UserProfileLoader from "./UserProfileLoader";

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
      <EuiFlexGroup style={{ marginLeft: "5px", marginRight: "5px" }}>
        {/* {console.log(profileData)} */}
        <div style={{ width: "30%" }}>
          <UserProfilePanel data={profileData} />
        </div>
        <div style={{ width: "70%" }}>
          <UserInfo data={profileData} />
        </div>
      </EuiFlexGroup>
    );
  }
};

export default UserProfile;
