import { useState } from "react";
import React from "react";
import {
  IonButton,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonContent,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "../theme/login.css";
import { loginUser } from "../services/apiClient"; // presupunem că loginUser e definit corect
import { useTheme } from "../components/ThemeContext"; 

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory(); // Pentru redirecționare programatică
  const { darkMode} = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      if (response) {
        // Redirecționează către home după login reușit
        console.log(response);
        history.push("/home");
      } else {
        // Tratează eroarea, poate afisezi un mesaj
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <IonPage className={darkMode ? "dark-mode" : ""}>
      <IonContent className="ion-padding">
        <div className="center-content-vertically">
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ objectFit: "cover", maxWidth: "400px" }}
          />

          {/* Formularul de Login */}
          <form onSubmit={handleLogin}>
            {/* Email */}
            <IonItem style={{ marginTop: "10px", width: "75vw" }}>
              <IonLabel position="stacked" className="label-font">
                Email
              </IonLabel>
              <IonInput
                type="email"
                placeholder="Type your email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
              />
            </IonItem>

            {/* Parola */}
            <IonItem style={{ marginTop: "10px", width: "75vw" }}>
              <IonLabel position="stacked" className="label-font">
                Password
              </IonLabel>
              <IonInput
                type="password"
                placeholder="Type your password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
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
          </form>

          <div style={{ marginTop: "20px" }}>
            <span>Not a member? </span>
            <a href="/signup" style={{ color: "gray", textDecoration: "none" }}>
              Create account
            </a>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
