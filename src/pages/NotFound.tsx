import React from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import "../theme/info.css";

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="center-content">
        <h1 className="title">Page Not Found</h1>
        <p>The page you are looking for does not exist. Please check the URL or return to the home page.</p>
        <IonButton
          expand="block"
          routerLink="/login"
          className="green-button"
          style={{ marginTop: "20px", backgroundColor: "green", color: "white" }}
        >
          Go to Home
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
