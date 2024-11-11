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
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "../theme/login.css";
import { useTheme } from "../components/ThemeContext"; 
import { useAuth } from "../services/authProvider";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory(); 
  const { darkMode } = useTheme();
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      login(email, password).then((response) => {
        if (response) {
          setLoading(false);
          history.push("/home");
        } else {
          setLoading(false);
          console.log("Login failed");}
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className={darkMode ? "dark-mode" : ""}>
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
              <a
                href="/signup"
                style={{ color: "gray", textDecoration: "none" }}
              >
                Create account
              </a>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
