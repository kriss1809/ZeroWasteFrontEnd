import React from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import "../theme/info.css"; 
import { useTheme } from "../components/ThemeContext";

const SuccessfullyCreatedAccount: React.FC = () => {

  const { darkMode } = useTheme();


  return (
    <IonPage>
      <IonContent>
        <div className={darkMode ? "dark-mode" : ""}>
          <div className="center-content">
            <h1 className="title">Account Successfully Created!</h1>
            <p>
              Your account has been successfully activated. You can now log in
              and start using the app.
            </p>
            <IonButton
              expand="block"
              routerLink="/login"
              className="green-button"
              style={{
                marginTop: "20px",
                backgroundColor: "green",
                color: "white",
                width: "90vw",
              }}
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

