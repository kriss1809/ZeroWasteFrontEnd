import { useState } from "react";
import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonText
} from "@ionic/react";
import "../theme/login.css";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Funcție care verifică dacă parolele coincid
  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (value !== password) {
      setError("Passwords do not match!");
    } else {
      setError(""); // Dacă parolele coincid, se șterge mesajul de eroare
    }
  };

  return (
    <IonPage>
      <div className="center-content-vertically">
        <img
          src="/images/logo.png"
          alt="Logo"
          style={{ objectFit: "cover", maxWidth: "400px" }}
        />

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
          />
        </IonItem>

        {/* Password */}
        <IonItem style={{ marginTop: "10px", width: "75vw" }}>
          <IonLabel position="stacked" className="label-font">
            Password
          </IonLabel>
          <IonInput
            type="password"
            placeholder="Type your password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>

        {/* Confirm Password */}
        <IonItem style={{ marginTop: "10px", width: "75vw" }}>
          <IonLabel position="stacked" className="label-font">
            Confirm Password
          </IonLabel>
          <IonInput
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onIonChange={(e) => handleConfirmPasswordChange(e.detail.value!)}
          />
        </IonItem>

        {/* Mesaj de eroare */}
        {error && (
          <IonText color="danger" style={{ marginTop: "10px" }}>
            {error}
          </IonText>
        )}

        <IonButton
          expand="block"
          className="green-button"
          routerLink="/signup"
          style={{
            marginTop: "40px",
            backgroundColor: "green",
            color: "white",
            width: "50vw",
          }}
          disabled={error !== ""} // Dezactivezi butonul dacă parolele nu coincid
        >
          Create account!
        </IonButton>

        <div style={{ marginTop: "20px", marginBottom: "20px"}}>
          <span>Already have an account? </span>
          <a href="/login" style={{ color: "gray", textDecoration: "none"}}>
            Login here!
          </a>
        </div>
      </div>
    </IonPage>
  );
};

export default Signup;
