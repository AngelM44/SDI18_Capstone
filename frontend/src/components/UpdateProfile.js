import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  EuiForm,
  EuiModal,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiModalBody,
  EuiModalFooter,
  EuiFieldText,
  EuiTextArea,
  EuiSelect,
} from "@elastic/eui";

const UpdateProfile = ({ setOpenUpdate, user, onUserUpdate }) => {
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [newInterest, setNewInterest] = useState({
    name: "",
    skill_level: "beginner",
    category: "",
  });
  const [profileUpdate, setProfileUpdate] = useState({
    availability: user.availability,
    info: user.info,
    goals: user.goals,
  });
  const [userUpdate, setUserUpdate] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    location: user.location,
  });
  const [error, setError] = useState(null);

  const skillLevels = [
    { value: "beginner", text: "Beginner" },
    { value: "intermediate", text: "Intermediate" },
    { value: "advanced", text: "Advanced" },
  ];

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await axios.get("http://localhost:8080/interests");
        setInterests(response.data);
        const userInterests = response.data.filter((interest) =>
          user.interests.includes(interest.id)
        );
        setSelectedInterests(userInterests);
      } catch (err) {
        console.error("Error fetching interests:", err);
      }
    };
    fetchInterests();
  }, [user.interests]);

  const handleUserChange = (e) => {
    setUserUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileChange = (e) => {
    setProfileUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNewInterestChange = (e) => {
    setNewInterest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddInterest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/interests",
        newInterest
      );
      const addedInterest = response.data;
      setInterests([...interests, addedInterest]);
      setSelectedInterests([...selectedInterests, addedInterest]);
      setNewInterest({ name: "", skill_level: "beginner", category: "" });
    } catch (err) {
      console.error("Error adding new interest:", err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.patch(
        `http://localhost:8080/users/${user.user_id}`,
        userUpdate
      );
      const profileResponse = await axios.patch(
        `http://localhost:8080/profile/${user.user_id}`,
        {
          ...profileUpdate,
          interests: selectedInterests.map((interest) => interest.id),
        }
      );

      const updatedUserData = {
        ...user,
        ...userResponse.data,
        ...profileResponse.data,
      };

      setOpenUpdate(false);
      onUserUpdate(updatedUserData);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Error, please try again.");
    }
  };

  return (
    <EuiModal onClose={() => setOpenUpdate(false)}>
      <EuiModalBody>
        <div style={{ padding: "20px", gap: "20px" }}>
          <h1>Update Your Profile</h1>
          <EuiForm>
            <EuiFlexGroup gutterSize="m" direction="row">
              <EuiFlexItem className="formSection">
                <EuiFieldText
                  label="First Name"
                  value={userUpdate.first_name}
                  name="first_name"
                  onChange={handleUserChange}
                  fullWidth={true}
                />
                <EuiFieldText
                  label="Last Name"
                  value={userUpdate.last_name}
                  name="last_name"
                  onChange={handleUserChange}
                  fullWidth={true}
                />
                <EuiFieldText
                  label="Location"
                  value={userUpdate.location}
                  name="location"
                  onChange={handleUserChange}
                  fullWidth={true}
                />
                <label>Current Interests</label>
                <ul>
                  {selectedInterests.map((interest) => (
                    <li key={interest.id}>{interest.name}</li>
                  ))}
                </ul>
                <label>Add New Interest</label>
                <EuiFieldText
                  placeholder="Enter a new interest"
                  value={newInterest.name}
                  name="name"
                  onChange={handleNewInterestChange}
                  fullWidth={true}
                />
                <EuiSelect
                  label="Skill Level"
                  options={skillLevels}
                  value={newInterest.skill_level}
                  onChange={(e) =>
                    handleNewInterestChange({
                      target: { name: "skill_level", value: e.target.value },
                    })
                  }
                  fullWidth={true}
                />
                <EuiFieldText
                  label="Category"
                  placeholder="Enter a category"
                  value={newInterest.category}
                  name="category"
                  onChange={handleNewInterestChange}
                  fullWidth={true}
                />
                <EuiButton onClick={handleAddInterest}>Add Interest</EuiButton>
              </EuiFlexItem>
              <EuiFlexItem className="formSection">
                <EuiFieldText
                  label="Availability"
                  value={profileUpdate.availability}
                  name="availability"
                  onChange={handleProfileChange}
                  fullWidth={true}
                />
                <EuiTextArea
                  label="About"
                  value={profileUpdate.info}
                  name="info"
                  onChange={handleProfileChange}
                  fullWidth={true}
                />
                <EuiTextArea
                  label="Goals"
                  value={profileUpdate.goals}
                  name="goals"
                  onChange={handleProfileChange}
                  fullWidth={true}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiForm>
          <EuiModalFooter style={{ justifyContent: "center" }}>
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
