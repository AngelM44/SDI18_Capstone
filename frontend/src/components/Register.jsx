import React, { useState } from "react";
import axios from "axios";
import {
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiFieldPassword,
  EuiButton,
  EuiSpacer,
  EuiCallOut,
  EuiPage,
  EuiPageBody,
  EuiTitle,
} from "@elastic/eui";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { login } = useUser();
  const navigate = useNavigate();

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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setIsLoading(true);

    if (formData.dod_id.length !== 10) {
      setError("DOD ID must be 10 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        formData
      );
      setSuccessMessage("Successfully registered!");
      login(response.data);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data || "Error registering. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EuiPage style={{ ...styles.page, backgroundColor: "transparent" }}>
      <EuiPageBody style={{ ...styles.page, backgroundColor: "transparent" }}>
        <div style={styles.formContainer}>
          <EuiTitle size="l">
            <h2>Register</h2>
          </EuiTitle>
          <EuiSpacer size="l" />
          <EuiForm component="form" onSubmit={handleSubmit} style={styles.form}>
            <EuiFormRow style={styles.formRow} label="First Name">
              <EuiFieldText
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </EuiFormRow>
            <EuiFormRow style={styles.formRow} label="Last Name">
              <EuiFieldText
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </EuiFormRow>
            <EuiFormRow style={styles.formRow} label="DOD ID">
              <EuiFieldText
                name="dod_id"
                value={formData.dod_id}
                onChange={handleChange}
                required
              />
            </EuiFormRow>
            <EuiFormRow style={styles.formRow} label="Username">
              <EuiFieldText
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </EuiFormRow>
            <EuiFormRow style={styles.formRow} label="Password">
              <EuiFieldPassword
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </EuiFormRow>
            <EuiFormRow style={styles.formRow} label="Email">
              <EuiFieldText
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </EuiFormRow>
            <EuiFormRow style={styles.formRow} label="Location">
              <EuiFieldText
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </EuiFormRow>
            <EuiSpacer />
            <div style={styles.buttonContainer}>
              <EuiButton type="submit" isLoading={isLoading}>
                Register
              </EuiButton>
            </div>
            {successMessage && (
              <EuiCallOut title={successMessage} color="success" />
            )}
            {error && (
              <EuiCallOut title="Error" color="danger">
                {error}
              </EuiCallOut>
            )}
          </EuiForm>
        </div>
      </EuiPageBody>
    </EuiPage>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: "60px",
  },
  formContainer: {
    width: "80%",
    maxWidth: "600px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
  },
  formRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "20px",
  },
};

export default Register;
