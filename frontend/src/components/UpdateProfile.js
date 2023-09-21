import { useState, useEffect } from "react";
import axios from "axios";
import {
  EuiForm,
  EuiModal,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from "@elastic/eui";

const UpdateProfile = ({ setOpenUpdate, user }) => {
  //   const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    first_name: user.first_name,
    last_name: user.last_name,
    location: user.location,
    interests: user.interests,
    availability: user.availability,
    info: user.info,
    goals: user.goals,
  });

  //   const userUpdate = {
  //     body: {
  //       first_name: this.user.first_name,
  //       last_name: user.last_name,
  //       email: user.email,
  //       location: user.location,
  //     },
  //   };

  const userId = user.id;

  //   useEffect(() => {
  //     const patchUser = async () => {
  //       try {
  //         const response = await axios.patch(`/users/${userId}`, userUpdate.body);
  //         if (response.status === 200) {
  //           console.log("User updated:", response.data);
  //         } else if (response.status === 404) {
  //           console.log("User not found");
  //         }
  //       } catch (error) {
  //         console.error("Error updating user:", error.message);
  //       }
  //     };

  //     patchUser();
  //   }, [userId]);

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    //this is where we would do the post/patch

    setOpenUpdate(false);
  };

  return (
    <EuiModal maxWidth="100%" onClose={() => setOpenUpdate(false)}>
      <div
        className="wrapper"
        style={{
          padding: "50px",
          gap: "20px",
        }}
      >
        <h1>Update Your Profile</h1>
        <EuiForm>
          <EuiFlexGroup gutterSize="m" direction="row">
            <EuiFlexItem style={{ width: "50%", gap: "10px", padding: "10px" }}>
              <label>Email</label>
              <input
                type="text"
                value={texts.email}
                name="email"
                onChange={handleChange}
              />
              <label>First Name</label>
              <input
                type="text"
                value={texts.first_name}
                name="password"
                onChange={handleChange}
              />
              <label>Last Name</label>
              <input
                type="text"
                value={texts.last_name}
                name="name"
                onChange={handleChange}
              />
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={texts.location}
                onChange={handleChange}
              />
              <label>Interests</label>
              <input
                type="text"
                name="interests"
                value={texts.interests}
                onChange={handleChange}
              />
            </EuiFlexItem>
            <EuiFlexItem style={{ width: "50%", gap: "10px", padding: "10px" }}>
              <label>Availibility</label>
              <input
                type="text"
                name="availability"
                value={texts.availability}
                onChange={handleChange}
              />
              <label>About</label>
              <textarea
                type="text"
                name="info"
                rows="5"
                cols="33"
                value={texts.info}
                onChange={handleChange}
              />
              <label>Goals</label>
              <textarea
                type="text"
                name="goals"
                rows="5"
                cols="33"
                value={texts.goals}
                onChange={handleChange}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiForm>
      </div>
      <div
        style={{
          alignSelf: "center",
          padding: "20px",
        }}
      >
        <EuiButton
          color="secondary"
          size="s"
          onClick={handleClick}
          style={{ alignSelf: "center", width: "50%" }}
        >
          Update
        </EuiButton>
      </div>
    </EuiModal>
  );
};

export default UpdateProfile;
