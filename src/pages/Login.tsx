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
  IonInput
} from "@ionic/react";
import "../theme/login.css";

const Login: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
      <IonPage>
        <div className="center-content-vertically">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            style={{ objectFit: "cover", maxWidth: "400px" }}
          />

          {/* Email */}
          <IonItem style={{ marginTop: "10px", width: "75vw" }}>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              placeholder="Type your email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>

          {/* Password */}
          <IonItem style={{ marginTop: "10px", width: "75vw" }}>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              placeholder="Type yout password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>

          <IonButton
            expand="block"
            className="green-button"
            routerLink="/home"
            style={{
              marginTop: "40px",
              backgroundColor: "green",
              color: "white",
              width: "50vw",
            }}
          >
            Login
          </IonButton>
        </div>
      </IonPage>
    );
};

export default Login;
