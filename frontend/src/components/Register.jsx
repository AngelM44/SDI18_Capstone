import React, { useState } from "react";
import axios from "axios";
import {
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiButton,
  EuiSpacer,
  EuiCallOut,
  EuiPage,
  EuiPageBody,
  EuiTitle,
} from "@elastic/eui";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dod_id: "",
    username: "",
    password: "",
    email: "",
    location: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (formData.dod_id.length !== 10) {
      setError("DOD ID must be 10 characters long.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/register", formData);
      setSuccessMessage("Successfully registered!");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          if (err.response.data === "duplicate username") {
            setError("Username already exists. Choose a different one.");
          } else {
            setError("Error registering. Please try again.");
          }
        }
      } else {
        setError("Error registering. Please try again.");
      }
    }
  };

  return (
    <EuiPage>
      <EuiPageBody>
        <EuiTitle size="l">
          <h2>Register</h2>
        </EuiTitle>
        <EuiSpacer size="l" />
        <EuiForm component="form" onSubmit={handleSubmit}>
          <EuiFormRow label="First Name">
            <EuiFieldText
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </EuiFormRow>
          <EuiFormRow label="Last Name">
            <EuiFieldText
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </EuiFormRow>
          <EuiFormRow label="DOD ID">
            <EuiFieldText
              name="dod_id"
              value={formData.dod_id}
              onChange={handleChange}
              required
            />
          </EuiFormRow>
          <EuiFormRow label="Username">
            <EuiFieldText
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </EuiFormRow>
          <EuiFormRow label="Password">
            <EuiFieldText
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </EuiFormRow>
          <EuiFormRow label="Email">
            <EuiFieldText
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </EuiFormRow>
          <EuiFormRow label="Location">
            <EuiFieldText
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </EuiFormRow>
          <EuiSpacer />
          <EuiButton type="submit">Register</EuiButton>
          {successMessage && (
            <EuiCallOut title={successMessage} color="success" />
          )}
          {error && (
            <EuiCallOut title="Error" color="danger">
              {error}
            </EuiCallOut>
          )}
        </EuiForm>
      </EuiPageBody>
    </EuiPage>
  );
}

export default Register;
