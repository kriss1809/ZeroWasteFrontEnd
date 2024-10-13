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
  IonInput
} from "@ionic/react";


const Signup: React.FC = () => {

    return (
        <IonPage>
         <IonButton 
            expand="block"
            className="green-button"
            routerLink="/login"
            style={{
              marginTop: "40px",
              backgroundColor: "green",
              color: "white",
              width: "50vw"
            }} 
          >
            Sign Up
          </IonButton>
        </IonPage>
    );
};
export default Signup;
