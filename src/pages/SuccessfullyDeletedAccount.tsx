import React from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import "../theme/info.css";
import { useTheme } from "../components/ThemeContext";

const SuccessfullyDeletedAccount: React.FC = () => {

  const { darkMode } = useTheme();

  return (
    <IonPage>
      <IonContent className="center-content">
        <div className={darkMode ? "dark-mode" : ""}>
          <div className="center-content">
            <h1 className="title">Account Deleted</h1>
            <p>
              Your account has been successfully deleted. We’re sorry to see you
              go. If you ever change your mind, you can create a new account
              anytime.
            </p>
            <IonButton
              expand="block"
              routerLink="/signup"
              className="green-button"
              style={{
                marginTop: "20px",
                backgroundColor: "green",
                color: "white",
                width: "90vw",
              }}
            >
              Sign Up
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SuccessfullyDeletedAccount;
