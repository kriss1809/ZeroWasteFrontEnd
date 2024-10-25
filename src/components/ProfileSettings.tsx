import { IonLabel, IonButton, IonSelect, IonSelectOption, IonInput, IonToggle } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";

const ProfileSettings: React.FC = () => {
    const [preferredTime, setPreferredTime] = useState<string>("");
    const [notificationDays, setNotificationDays] = useState<number>(1);

    const handleInvite = () => {
      console.log("Invitație trimisă!");
    };

    const { darkMode, toggleDarkMode } = useTheme();

    useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);


  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div className="grid-item items">
        <IonButton
          className="green-button-gradient"
          onClick={handleInvite}
          style={{
            display: "block",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "90vw",
          }}
        >
          Send Invite
        </IonButton>
      </div>

      <div className="share">
        <div className="grid-item notification">
          <IonLabel>Notify me</IonLabel>
          <IonSelect
            value={notificationDays}
            onIonChange={(e) => setNotificationDays(e.detail.value!)}
            interface="popover"
          >
            <IonSelectOption value={1} className="label-dark-mode">
              1 day before
            </IonSelectOption>
            <IonSelectOption value={2} className="label-dark-mode">
              2 days before
            </IonSelectOption>
            <IonSelectOption value={3} className="label-dark-mode">
              3 days before
            </IonSelectOption>
          </IonSelect>
        </div>

        <div className="grid-item preferred">
          <div>
            <IonLabel position="floating" style={{ marginBottom: "20px" }}>
              Notification Hour
            </IonLabel>
            <IonInput
              value={preferredTime}
              type="time"
              onIonChange={(e) => setPreferredTime(e.detail.value!)}
            />
          </div>
        </div>
      </div>

      <div className="dark-mode-toggle">
        <IonLabel>Dark Mode</IonLabel>
        <IonToggle checked={darkMode} onIonChange={toggleDarkMode} />
      </div>
    </div>
  );
};

export default ProfileSettings;
