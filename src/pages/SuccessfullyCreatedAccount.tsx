import React from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import "../theme/info.css"; 
import { useTheme } from "../components/ThemeContext";

const SuccessfullyCreatedAccount: React.FC = () => {

  const { darkMode } = useTheme();


  return (
    <IonPage>
      <IonContent className="content-container">
        <div className={darkMode ? "dark-mode" : ""}>
          <div
            className="content"
            style={{ backgroundColor: darkMode ? "#2c2c2c" : "white" }}
          >
            <h1 className="title">Account Successfully Created!</h1>
            <p>
              Your account has been successfully activated. You can now log in
              and start using the app.
            </p>
            <IonButton
              expand="block"
              routerLink="/login"
              className="green-button"
            >
              Log in
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SuccessfullyCreatedAccount;
