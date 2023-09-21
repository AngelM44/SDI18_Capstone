import { useState, Fragment } from "react";
import {
  EuiFieldText,
  EuiForm,
  EuiModal,
  EuiModalBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
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
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL

    setOpenUpdate(false);
  };

  return (
    <EuiModal maxWidth="70%" onClose={() => setOpenUpdate(false)}>
      <div
        className="wrapper"
        style={{
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          position: "relative",
        }}
      >
        <h1>Update Your Profile</h1>
        <EuiForm>
          <EuiFlexGroup gutterSize="m" direction="column">
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
            <EuiButton
              color="secondary"
              size="s"
              onClick={handleClick}
              style={{ alignSelf: "center", width: "50%" }}
            >
              Update
            </EuiButton>
          </EuiFlexGroup>
        </EuiForm>
      </div>
    </EuiModal>
  );
};

export default UpdateProfile;
