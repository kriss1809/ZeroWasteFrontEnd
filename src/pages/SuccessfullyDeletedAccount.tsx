import React from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import "../theme/info.css";

const SuccessfullyDeletedAccount: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="center-content">
        <h1 className="title">Account Deleted</h1>
        <p>Your account has been successfully deleted. We’re sorry to see you go. If you ever change your mind, you can create a new account anytime.</p>
        <IonButton
          expand="block"
          routerLink="/signup"
          className="green-button"
          style={{ marginTop: "20px", backgroundColor: "green", color: "white" }}
        >
          Sign Up
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SuccessfullyDeletedAccount;
