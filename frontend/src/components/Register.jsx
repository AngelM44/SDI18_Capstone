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
      setError("DoD ID must be 10 characters long.");
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
    <div style={{ paddingTop: "30px" }}>
      <EuiPage style={{ ...styles.page, backgroundColor: "transparent" }}>
        <EuiPageBody style={{ ...styles.page, backgroundColor: "transparent" }}>
          <div style={styles.formContainer}>
            <EuiTitle size="l">
              <h2
                style={{
                  textShadow: "1px 1px 2px black",
                  color: "whitesmoke",
                  fontSize: "4rem",
                }}
              >
                Register
              </h2>
            </EuiTitle>
            <EuiSpacer size="l" />
            <EuiForm
              component="form"
              onSubmit={handleSubmit}
              style={styles.form}
            >
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
              <EuiFormRow style={styles.formRow} label="DoD ID">
                <EuiFieldText
                  name="dod_id"
                  value={formData.dod_id}
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
              <EuiFormRow style={styles.formRow} label="Email">
                <EuiFieldText
                  name="email"
                  value={formData.email}
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
              <div style={styles.buttonContainer}>
                <EuiButton
                  color="secondary"
                  type="submit"
                  isLoading={isLoading}
                >
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
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  formContainer: {
    color: "white",
    width: "100%",
    maxWidth: "1000px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(90deg, #4b6cb770, #18284870), url(https://images.pexels.com/photos/7099138/pexels-photo-7099138.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    textShadow: "1px 1px 2px black",
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
    display: "flex",
    justifyContent: "center",
    width: "100%",
    paddingBottom: "20px",
  },
};

export default Register;
