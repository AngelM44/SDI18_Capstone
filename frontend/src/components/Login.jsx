import React, { useState } from "react";
import axios from "axios";
import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiTitle,
  EuiCallOut,
  EuiPage,
  EuiPageBody,
} from "@elastic/eui";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        formData
      );
      console.log("Logged in:", response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid credentials");
      } else {
        setError("Error logging in. Please try again.");
      }
    }
  };

  return (
    <EuiPage>
      <EuiPageBody>
        <EuiTitle size="l">
          <h2>Login</h2>
        </EuiTitle>
        <EuiSpacer size="l" />
        <EuiForm component="form" onSubmit={handleSubmit}>
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
          <EuiSpacer />
          <EuiButton type="submit">Login</EuiButton>
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

export default Login;
