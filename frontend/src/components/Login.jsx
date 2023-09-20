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
import { useUser } from "./UserContext";
import { useNavigate } from "react-router";

function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

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
      login(response.data);
      navigate("/home");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid credentials");
      } else {
        setError("Error logging in. Please try again.");
      }
    }
  };

  return (
    <EuiPage style={{ ...styles.page, backgroundColor: "transparent" }}>
      <EuiPageBody style={{ ...styles.page, backgroundColor: "transparent" }}>
        <div style={styles.formContainer}>
          <EuiTitle size="l">
            <h2>Login</h2>
          </EuiTitle>
          <EuiSpacer size="l" />
          <EuiForm component="form" onSubmit={handleSubmit} style={styles.form}>
            <EuiFormRow style={styles.formRow} label="Username">
              <EuiFieldText
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </EuiFormRow>
            <EuiFormRow style={styles.formRow} label="Password">
              <EuiFieldText
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </EuiFormRow>
            <EuiSpacer />
            <div style={styles.buttonContainer}>
              <EuiButton type="submit">Login</EuiButton>
            </div>
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
    marginTop: "60px",
  },
  formContainer: {
    width: "80%",
    maxWidth: "600px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
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

export default Login;
