import { useState } from "react";
import React from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonList,
  IonCheckbox,
} from "@ionic/react";
import "../theme/profile.css";

const Profile: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<string>("");
  // const [shareOptions, setShareOptions] = useState<{ [key: string]: boolean }>({
  //   option1: false,
  //   option2: false,
  //   option3: false,
  // });
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);

  return (
    <IonPage>
      <IonContent>
        <div className="center-profile">
          <IonItem className="input">
            <IonLabel position="floating" style={{ marginBottom: "8px" }}>
              Email
            </IonLabel>
            <IonInput
              value={email}
              type="email"
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>
          <IonItem className="input">
            <IonLabel position="floating" style={{ marginBottom: "8px" }}>
              Password
            </IonLabel>
            <IonInput
              value={password}
              type="password"
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
          <IonButton
            shape="round"
            color="success"
            style={{
              marginTop: "40px",
              marginLeft: "auto",
              marginRight: "0",
              marginBottom: "40px",
              color: "white",
              width: "50vw",
            }}
          >
            Change password
          </IonButton>
          <div className="share">
            <div className="grid-item preferred">
              <IonItem>
                <IonLabel position="floating" style={{ marginBottom: "8px" }}>
                  Notification
                </IonLabel>
                <IonInput
                  value={preferredTime}
                  type="time"
                  onIonChange={(e) => setPreferredTime(e.detail.value!)}
                />
              </IonItem>
            </div>

            <div className="grid-item items">
              <IonLabel>Share list</IonLabel>
              <IonList>
                <IonItem>Option 1</IonItem>
                <IonItem>Option 2</IonItem>
                <IonItem>Option 3</IonItem>
              </IonList>
            </div>
          </div>
          <IonButton
            shape="round"
            color="success"
            style={{
              display: "block",
              marginTop: "40px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "50vw",
            }}
          >
            Delete button
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
