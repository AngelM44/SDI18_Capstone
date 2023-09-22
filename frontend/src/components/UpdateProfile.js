import { useState } from "react";
import axios from "axios";
import {
  EuiForm,
  EuiModal,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiModalBody,
  EuiModalFooter,
} from "@elastic/eui";
import UserProfile from "./UserProfile";

const UpdateProfile = ({ setOpenUpdate, user }) => {
  const [profileUpdate, setProfileUpdate] = useState({
    interests: user.interests,
    availability: user.availability,
    info: user.info,
    goals: user.goals,
  });

  const [userUpdate, setUserUpdate] = useState({
    password: user.password,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    location: user.location,
  });

  const [error, setError] = useState(null);

  const handleUserChange = (e) => {
    setUserUpdate((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleProfileChange = (e) => {
    setProfileUpdate((prev) => ({
      ...prev,
      [e.target.name]: [e.target.value],
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `http://localhost:8080/users/${user.user_id}`,
        {
          location: `${userUpdate.location}`,
          password: `${userUpdate.password}`,
          first_name: `${userUpdate.first_name}`,
          last_name: `${userUpdate.last_name}`,
          email: `${userUpdate.email}`,
        }
      );
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unable to update profile");
      } else {
        setError("Error, please try again.");
      }
    }

    try {
      const res = axios.patch(`http://localhost:8080/profile/${user.user_id}`, {
        availability: `${profileUpdate.availability}`,
        interests: profileUpdate.interests,
        info: `${profileUpdate.info}`,
        goals: `${profileUpdate.goals}`,
      });
    } catch (err) {
      if (err.res && err.res.status === 401) {
        setError("Unable to update profile");
      } else {
        setError("Error, please try again.");
      }
    }

    setOpenUpdate(false);
    window.location.reload();
  };

  return (
    <EuiModal
      style={{ fontFamily: "inherit", background: "#CCCCFF" }}
      onClose={() => setOpenUpdate(false)}
    >
      {console.log(user)}
      <EuiModalBody>
        <div
          className="wrapper"
          style={{
            padding: "20px",
            gap: "20px",
          }}
        >
          <h1>Update Your Profile</h1>
          <EuiForm>
            <EuiFlexGroup gutterSize="m" direction="row">
              <EuiFlexItem
                style={{
                  height: "100%",
                  width: "50%",
                  gap: "10px",
                  padding: "10px",
                }}
              >
                <label>Email</label>
                <input
                  type="text"
                  value={userUpdate.email}
                  name="email"
                  onChange={handleUserChange}
                />
                <label>First Name</label>
                <input
                  type="text"
                  value={userUpdate.first_name}
                  name="password"
                  onChange={handleUserChange}
                />
                <label>Last Name</label>
                <input
                  type="text"
                  value={userUpdate.last_name}
                  name="name"
                  onChange={handleUserChange}
                />
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={userUpdate.location}
                  onChange={handleUserChange}
                />
                <label>Interests</label>
                <input
                  type="text"
                  name="interests"
                  value={profileUpdate.interests}
                  onChange={handleProfileChange}
                />
              </EuiFlexItem>
              <EuiFlexItem
                style={{
                  height: "100%",
                  width: "50%",
                  gap: "10px",
                  padding: "10px",
                }}
              >
                <label>Availibility</label>
                <input
                  type="text"
                  name="availability"
                  value={profileUpdate.availability}
                  onChange={handleProfileChange}
                />
                <label>About</label>
                <textarea
                  type="text"
                  name="info"
                  rows="5"
                  cols="33"
                  value={profileUpdate.info}
                  onChange={handleProfileChange}
                  style={{ fontFamily: "inherit", resize: "none" }}
                />
                <label>Goals</label>
                <textarea
                  type="text"
                  name="goals"
                  rows="5"
                  cols="33"
                  value={profileUpdate.goals}
                  onChange={handleProfileChange}
                  style={{ fontFamily: "inherit", resize: "none" }}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiForm>
          <EuiModalFooter
            style={{
              justifyContent: "center",
            }}
          >
            <EuiButton
              color="secondary"
              size="s"
              onClick={handleClick}
              style={{ width: "20%" }}
            >
              Update
            </EuiButton>
          </EuiModalFooter>
        </div>
      </EuiModalBody>
    </EuiModal>
  );
};

export default UpdateProfile;
