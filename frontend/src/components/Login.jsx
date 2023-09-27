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
    <div style={{ paddingTop: "30px" }}>
      <EuiPage style={{ ...styles.page, backgroundColor: "transparent" }}>
        <EuiPageBody
          style={{
            ...styles.page,
            backgroundColor: "transparent",
          }}
        >
          <div style={styles.formContainer}>
            <EuiTitle size="l">
              <h2 style={{ fontSize: "4rem" }}>Login</h2>
            </EuiTitle>
            <EuiSpacer size="s" />
            <EuiForm
              component="form"
              onSubmit={handleSubmit}
              style={styles.form}
            >
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

              <div style={styles.buttonContainer}>
                <EuiButton type="submit" color="secondary">
                  Login
                </EuiButton>
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
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "800px",
  },
  formContainer: {
    width: "80%",
    height: "80%",
    maxWidth: "600px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(90deg, #4b6cb770, #18284870), url(https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "40px",
  },
  formRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: "10px",
  },
  buttonContainer: {
    paddingBottom: "20px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
};

export default Login;
