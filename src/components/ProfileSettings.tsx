import { IonLabel, IonButton, IonSelect, IonSelectOption, IonInput, IonToggle } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { IonPopover, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonCheckbox } from "@ionic/react";

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


    const [showPopoverAllergies, setShowPopoverAllergies] = useState(false);
    const [showPopoverPreferences, setShowPopoverPreferences] = useState(false);
    const [allergies, setAllergies] = useState<string[]>([]);
    const [preferences, setPreferences] = useState<string[]>([]);

     const allergyOptions: { label: string; value: string }[] = [
      { label: "Celery", value: "celery" },
      { label: "Cereals containing gluten", value: "cereals" },
      { label: "Crustaceans", value: "crustaceans" },
      { label: "Eggs", value: "eggs" },
      { label: "Fish", value: "fish" },
      { label: "Lupin", value: "lupin" },
      { label: "Milk", value: "milk" },
      { label: "Molluscs", value: "molluscs" },
      { label: "Mustard", value: "mustard" },
      { label: "Peanuts", value: "peanuts" },
      { label: "Sesame", value: "sesame" },
      { label: "Soybeans", value: "soybeans" },
      { label: "Sulphur dioxide and sulphites", value: "sulphur" },
     ];

     const preferenceOptions: { label: string; value: string }[] = [
       { label: "Dairy-Free", value: "dairy-free" },
       { label: "Gluten-Free", value: "gluten-free" },
       { label: "Vegan", value: "vegan" },
       { label: "Vegetarian", value: "vegetarian" },
     ];

     // Funcții pentru togglarea alergiilor
     const toggleAllergy = (value: string) => {
       setAllergies((prev) =>
         prev.includes(value)
           ? prev.filter((item) => item !== value)
           : [...prev, value]
       );
     };

     // Funcții pentru togglarea preferințelor
     const togglePreference = (value: string) => {
       setPreferences((prev) =>
         prev.includes(value)
           ? prev.filter((item) => item !== value)
           : [...prev, value]
       );
     };



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

      <div className="settings">
        <div className="grid-item">
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

        <div className="grid-item">
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

      <div className="settings">
        <div className="grid-item">
          <IonButton
            onClick={() => setShowPopoverAllergies(true)}
            className="green-button-gradient"
            style={{ flex: 1, margin: "0" }}
          >
            Allergies
          </IonButton>

          <IonPopover
            isOpen={showPopoverAllergies}
            onDidDismiss={() => setShowPopoverAllergies(false)}
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle className="label-dark-mode">
                  Select Allergies
                </IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                {allergyOptions.map((option) => (
                  <IonItem
                    key={option.value}
                    onClick={() => toggleAllergy(option.value)}
                  >
                    <IonCheckbox
                      slot="start"
                      checked={allergies.includes(option.value)}
                      onIonChange={() => toggleAllergy(option.value)}
                    />
                    <IonLabel className="label-dark-mode">
                      {option.label}
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonContent>
          </IonPopover>
        </div>

        <div className="grid-item">
          <IonButton
            onClick={() => setShowPopoverPreferences(true)}
            className="green-button-gradient"
            style={{ flex: 1, margin: "0" }}
          >
            Preferences
          </IonButton>

          <IonPopover
            isOpen={showPopoverPreferences}
            onDidDismiss={() => setShowPopoverPreferences(false)}
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle className="label-dark-mode">
                  Select Preferences
                </IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                {preferenceOptions.map((option) => (
                  <IonItem
                    key={option.value}
                    onClick={() => togglePreference(option.value)}
                  >
                    <IonCheckbox
                      slot="start"
                      checked={preferences.includes(option.value)}
                      onIonChange={() => togglePreference(option.value)}
                    />
                    <IonLabel className="label-dark-mode">
                      {option.label}
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonContent>
          </IonPopover>
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
