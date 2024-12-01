import { useState } from "react";
import React from "react";
import {
  IonButton,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonContent,
  IonLoading,
  IonModal,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "../theme/login.css";
import { useTheme } from "../components/ThemeContext"; 
import { useAuth } from "../services/authProvider";
import { ForgotPassword } from "../services/apiClient";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory(); 
  const { darkMode } = useTheme();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  login(email, password)
    .then((response) => {
      if (response) {
        setLoading(false);
        history.push("/home");
      } else {
        setLoading(false);
        console.log("Login failed");
      }
    })
    .catch((error) => {
      setLoading(false);
      console.log("Error during login:", error);
    });
};

  const handleForgotPassword = () => {
    console.log("Forgot password");
    ForgotPassword(email).then((response) => {
      if (response) {
        console.log("Email sent");
      } else {
        console.log("Email not sent");
      }
    });
  }

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState<boolean>(false);

  return (
    <IonPage>
      <div
        className={`${darkMode ? "dark-mode" : ""}`}
      >
        <div className="center-content-vertically">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="img-logo"
            style={{ objectFit: "cover", maxWidth: "400px" }}
          />

          {/* Formularul de Login */}
          <form onSubmit={handleLogin}>
            {/* Email */}
            <IonItem style={{ marginTop: "10px", width: "75vw" }}>
              <IonLabel position="stacked" className="label-dark-mode">
                Email
              </IonLabel>
              <IonInput
                type="email"
                placeholder="Type your email"
                value={email}
                onIonInput={(e) => setEmail(e.detail.value!)}
                required
              />
            </IonItem>

            {/* Parola */}
            <IonItem style={{ marginTop: "10px", width: "75vw" }}>
              <IonLabel position="stacked" className="label-dark-mode">
                Password
              </IonLabel>
              <IonInput
                type="password"
                placeholder="Type your password"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value!)}
                required
              />
            </IonItem>

            <div style={{ textAlign: "right", marginTop: "5px" }}>
              <a
                onClick={() => setShowForgotPasswordModal(true)}
                style={{
                  color: "gray",
                  textDecoration: "none",
                  fontSize: "smaller",
                }}
              >
                I forgot my password
              </a>
            </div>

            <IonModal
              isOpen={showForgotPasswordModal}
              onDidDismiss={() => setShowForgotPasswordModal(false)}
              className="ion-modal-container"
            >
              <div
                className="modal-content"
                style={{ backgroundColor: darkMode ? "#2c2c2c" : "white" }}
              >
                <div>
                  <IonLabel
                    position="floating"
                    style={{ marginBottom: "20px" }}
                  >
                    Email
                  </IonLabel>
                  <IonInput
                    placeholder="Type your email"
                    value={email}
                    onIonInput={(e) => setEmail(e.detail.value!)}
                  />
                </div>

                <IonButton
                  expand="block"
                  className="green-button-gradient"
                  style={{ marginTop: "20px" }}
                  onClick={handleForgotPassword}
                >
                  Send Email
                </IonButton>
                <IonButton
                  expand="block"
                  color="danger"
                  onClick={() => setShowForgotPasswordModal(false)}
                  style={{ marginTop: "10px" }}
                >
                  Cancel
                </IonButton>
              </div>
            </IonModal>

            {/* Butonul de login */}
            <IonButton
              expand="block"
              className="green-button-gradient"
              type="submit" // Acum este buton de submit, declanșând evenimentul de form
              style={{
                marginTop: "40px",
                backgroundColor: "green",
                color: "white",
                width: "50vw",
              }}
            >
              Login
            </IonButton>
            {/* Loading spinner */}
            <IonLoading
              isOpen={loading}
              message="Please wait..."
              cssClass={darkMode ? "dark-mode" : ""}
            />
          </form>

          <div style={{ marginTop: "20px" }}>
            <span>Not a member? </span>
            <a href="/signup" style={{ color: "gray", textDecoration: "none" }}>
              Create account
            </a>
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default Login;
