import React from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import "../theme/info.css";
import { useTheme } from "../components/ThemeContext";

const NotFound: React.FC = () => {
  
  const { darkMode } = useTheme();

  return (
    <IonPage>
      <IonContent>
        <div className={darkMode ? "dark-mode" : ""}>
          <div className="center-content">
            <h1 className="title">Page Not Found</h1>
            <p style={{width: "90vw", textAlign: "justify"}}>
              The page you are looking for does not exist. Please check the URL
              or return to the home page.
            </p>
            <IonButton
              expand="block"
              routerLink="/home"
              className="green-button"
              style={{
                marginTop: "20px",
                backgroundColor: "green",
                color: "white",
                width: "90vw"
              }}
            >
              Go to Home
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
