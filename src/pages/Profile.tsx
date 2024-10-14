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
  IonSelect,
  IonSelectOption,
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
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notificationDays, setNotificationDays] = useState<number>(1);
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);

  const handleInvite = () => {
    // Aici poți adăuga logica pentru a gestiona invitația
    console.log("Invitație trimisă!");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleChangePassword = () => {
    console.log("the password has been changed");
  };

  return (
    <IonPage>
      <IonContent>
        <div className="center-profile">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="profile-photo"
            style={{
              objectFit: "cover",
              maxWidth: "150px",
              marginTop: "40px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
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
            <IonButton
              onClick={handleChangePassword}
              shape="round"
              slot="end"
              color="success"
              // fill = "outline"
              style={{
                // display: "block",
                // marginTop: "20px",
                // marginLeft: "auto",
                // marginRight: "auto",
                // width: "50vw",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              Change password
            </IonButton>
          </IonItem>
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
              <IonButton
                shape="round"
                color="success"
                onClick={handleInvite}
                style={{
                  display: "block",
                  marginTop: "10px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "50vw",
                }}
              >
                Send Invite
              </IonButton>
            </div>
          </div>
          <div className="grid-item notification">
            <IonLabel>Notify me</IonLabel>
            <IonSelect
              value={notificationDays}
              onIonChange={(e) => setNotificationDays(e.detail.value!)}
              interface="action-sheet" // Opțiune de a folosi un action sheet pentru selectare
            >
              <IonSelectOption value={1}>1 day before</IonSelectOption>
              <IonSelectOption value={2}>2 days before</IonSelectOption>
              <IonSelectOption value={3}>3 days before</IonSelectOption>
            </IonSelect>
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
            Delete Account
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
