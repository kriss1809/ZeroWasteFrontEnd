import { IonLabel, IonButton, IonSelect, IonSelectOption, IonInput, IonToggle, IonText } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { IonPopover, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonCheckbox, IonIcon } from "@ionic/react";
import { clipboardOutline, copy } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { JoinProductList, UpdateAllergies, UpdateNotificationDay, UpdatePreferences, UpdatePreferredNotificationHour } from "../services/apiClient";

const ProfileSettings: React.FC = () => {
  const [preferredTime, setPreferredTime] = useState<string>("");
  const [notificationDays, setNotificationDays] = useState<number>(1);

  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const [showPopoverAllergies, setShowPopoverAllergies] = useState(false);
  const [showPopoverPreferences, setShowPopoverPreferences] = useState(false);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);

useEffect(() => {
  const fetchUserData = async () => {
    const waitForUser = new Promise<void>((resolve) => {
      const checkUser = setInterval(() => {
        if (sessionStorage.getItem("user")) {
          clearInterval(checkUser);
          resolve();
        }
      }, 10);
    });

    await waitForUser;

    const user = JSON.parse(sessionStorage.getItem("user")!);
    setAllergies(user.allergies || []);
    setPreferences(user.preferences || []);
    setNotificationDays(user.notification_day || 1);
    setPreferredTime(user.preferred_notification_hour || "");
  };

  fetchUserData();
}, []);

  const allergyOptions: { label: string; value: string }[] = [
    { label: "Celery", value: "celery" },
    { label: "Cereals containing gluten", value: "gluten" },
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

   const [shareCode, setShareCode] = useState<string | null>(null);
   const [showJoinInput, setShowJoinInput] = useState<boolean>(false);
   const [joinCode, setJoinCode] = useState<string>("");
   const [errorMessage, setErrorMessage] = useState<string>("");

   const history = useHistory();


    const handleShare = () => {
      // AICI CODUL PRIMIT DE LA SERVER
      const Code = sessionStorage.getItem("share_code");

      if (Code) {
        setShareCode(Code);
        setShowJoinInput(false); // Ascunde inputul de Join dacă era deschis
      } else {
        console.error("share_code nu este definit în sessionStorage");
        setErrorMessage("Nu s-a putut obține codul de partajare.");
      }

    };

    // Funcția care afișează inputul de "Join"
    const handleJoin = () => {
      setShareCode(null); // Ascunde inputul de Share dacă era deschis
      setShowJoinInput(true); // Afișează inputul de Join
    };

    // Funcția care copiază codul în clipboard și resetează la butoanele originale
    const copyToClipboard = () => {
      if (shareCode) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(shareCode)
            .then(() => {
              console.log("Cod copiat în clipboard!");
              setShareCode(null); // Resetează pentru a afișa din nou butoanele
            })
            .catch((error) => {
              console.error("Eroare la copierea codului:", error);
              setErrorMessage("Nu s-a putut copia codul. Încearcă din nou.");
            });
        } else {
          // Fallback: Folosește execCommand pentru copiere
          const textArea = document.createElement("textarea");
          textArea.value = shareCode;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand("copy");
            console.log("Cod copiat în clipboard folosind fallback!");
            setShareCode(null);
          } catch (err) {
            console.error("Fallback pentru copiere a eșuat:", err);
            setErrorMessage(
              "Funcția de copiere nu este suportată pe acest dispozitiv."
            );
          }
          document.body.removeChild(textArea);
        }
      } else {
        setErrorMessage("Codul nu este disponibil pentru copiere.");
      }
    };


    const validateJoinCode = () => {
      if (joinCode.length === 6) {
        JoinProductList(joinCode).then((response) => {
          console.log(response);
          history.push("/home");
        }); 
      } else {
        setErrorMessage(
          "Invalid code. Please try again."
        );
      }
    };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div className="grid-item items">
        {/* Afișează fie cele două butoane "Share list" și "Join list", fie inputul cu codul */}
        {shareCode === null && !showJoinInput ? (
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <IonButton
              className="green-button-gradient"
              onClick={handleShare}
              style={{ flex: 1 }}
            >
              Share list
            </IonButton>
            <IonButton
              className="green-button-gradient"
              onClick={handleJoin}
              style={{ flex: 1 }}
            >
              Join list
            </IonButton>
          </div>
        ) : shareCode !== null ? (
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <IonInput
              readonly
              value={shareCode}
              style={{
                textAlign: "center",
                flex: 1,
                marginRight: "10px",
              }}
            />
            <IonButton
              onClick={copyToClipboard}
              className="green-button-gradient"
            >
              COPY
            </IonButton>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              flexDirection: "column",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <IonInput
                placeholder="Enter code"
                value={joinCode}
                onIonInput={(e) => setJoinCode(e.detail.value!)}
                style={{
                  textAlign: "center",
                  flex: 1,
                  marginRight: "10px",
                }}
              />
              <IonButton
                onClick={validateJoinCode}
                className="green-button-gradient"
              >
                JOIN
              </IonButton>
            </div>
            {errorMessage && (
              <IonText color="danger" style={{ marginTop: "10px" }}>
                {errorMessage}
              </IonText>
            )}
          </div>
        )}
      </div>

      <div className="settings">
        <div className="grid-item">
          <IonLabel>Notify me</IonLabel>
          <IonSelect
            value={notificationDays}
            onIonChange={(e) => {
              setNotificationDays(e.detail.value!); 
              UpdateNotificationDay(e.detail.value!);
            }}
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
              onIonChange={(e) => {
                setPreferredTime(e.detail.value!); 
                UpdatePreferredNotificationHour(e.detail.value!);
              }}
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
            key={showPopoverAllergies ? "open" : "closed"}
            isOpen={showPopoverAllergies}
            onDidDismiss={() => {
              setShowPopoverAllergies(false);
              UpdateAllergies(allergies);
             }}
            className="custom-popover"
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
            key={showPopoverPreferences ? "open" : "closed"}
            isOpen={showPopoverPreferences}
            onDidDismiss={() => {
              setShowPopoverPreferences(false);
              UpdatePreferences(preferences);
             }}
            className="custom-popover"
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
