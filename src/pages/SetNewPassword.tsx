import React from "react";
import { IonPage, IonContent, IonButton, IonItem, IonLabel,IonInput, IonText } from "@ionic/react";
import "../theme/info.css";
import { useTheme } from "../components/ThemeContext";
import { useState } from "react";
import { useLocation } from "react-router";
import { ResetPassword } from "../services/apiClient";

const setNewPassword: React.FC = () => {
  const { darkMode } = useTheme();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const uid = searchParams.get('uid');

   const [password, setPassword] = useState<string>("");
   const [confirmPassword, setConfirmPassword] = useState<string>("");
   const [error, setError] = useState<string>("");

   const handleConfirmPasswordChange = (value: string) => {
     setConfirmPassword(value);
     if (value !== password) {
       setError("Passwords do not match!");
     } else {
       setError(""); // Dacă parolele coincid, se șterge mesajul de eroare
     }
  };
  
  const handleSubmit = () => {
    // Verifică dacă parolele coincid
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    // Trimite datele la server
    if (!token || !uid) {
      setError("Invalid token or user ID");
      return;
    }
    ResetPassword(password, confirmPassword, token, Number(uid));
  }


  return (
    <IonPage>
      <IonContent className="content-container">
        <div className={darkMode ? "dark-mode" : ""}>
          <div
            className="content"
            style={{ backgroundColor: darkMode ? "#2c2c2c" : "white" }}
          >
            <h1 className="title">Choose a new password for your account</h1>

            {/* Password */}
            <IonItem style={{ marginTop: "10px" }}>
              <IonLabel position="stacked" className="label-dark-mode">
                Password
              </IonLabel>
              <IonInput
                type="password"
                placeholder="Type your password"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>

            {/* Confirm Password */}
            <IonItem style={{ marginTop: "10px" }}>
              <IonLabel position="stacked" className="label-dark-mode">
                Confirm Password
              </IonLabel>
              <IonInput
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onIonInput={(e) => handleConfirmPasswordChange(e.detail.value!)}
              />
            </IonItem>
            {error && (
              <IonText color="danger" style={{ marginTop: "10px" }}>
                {error}
              </IonText>
            )}

            <IonButton
              expand="block"
              routerLink="/login"
              className="green-button"
              style={{ marginTop: "10px" }}
              onClick={handleSubmit}
            >
              Set New Password
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default setNewPassword;
