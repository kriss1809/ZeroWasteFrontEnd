import { useState, useEffect } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonModal, // Import pentru modal
  IonIcon,
  IonRouterLink,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import "../theme/profile.css";
import { getUserProfile } from "../services/apiClient";
import { User } from "../entitites/User";

const Profile: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notificationDays, setNotificationDays] = useState<number>(1);
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);

  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const [showDeleteAccountModal, setShowDeleteAccountModal] =
    useState<boolean>(false);
  const [deletePassword, setDeletePassword] = useState<string>("");

  const history = useHistory();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await getUserProfile();
      if (userProfile) {
        setEmail(userProfile.email);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInvite = () => {
    console.log("Invitație trimisă!");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    console.log("Logout...");
    history.push("/login");
  };

  const handleSaveNewPassword = () => {
    // Logică pentru a salva noua parolă
    console.log("Parola a fost schimbată");
    setShowChangePasswordModal(false);
  };

  const handleDeleteAccount = () => {
    // Logică pentru ștergerea contului
    console.log("Contul a fost șters");
    setShowDeleteAccountModal(false);
    history.push("/successfully-deleted-account");
  };

  const isSaveDisabled = newPassword !== confirmNewPassword;
  return (
    <IonPage>
      <IonContent>
        <div className="center-profile">
          <IonRouterLink
            onClick={handleLogout}
            color="danger"
            style={{
              display: "block",
              marginTop: "25px",
              marginLeft: "auto",
              marginRight: "5px",
              textAlign: "center",
              color: "red",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "36px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <IonIcon icon={logOutOutline} style={{ marginRight: "8px" }} />
          </IonRouterLink>
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
          <div className="check-in">
            <IonItem className="input">
              <IonLabel position="floating" style={{ marginBottom: "20px" }}>
                Email
              </IonLabel>
              <IonInput
                value={email}
                type="email"
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>
            <IonItem className="input">
              <IonLabel position="floating" style={{ marginBottom: "20px" }}>
                Password
              </IonLabel>
              <IonInput
                value={password}
                type="password"
                onIonChange={(e) => setPassword(e.detail.value!)}
              />

              <IonButton
                onClick={() => setShowChangePasswordModal(true)} // Deschide fereastra modală la click
                shape="round"
                slot="end"
                color="success"
                style={{
                  marginTop: "30px",
                  marginLeft: "10px",
                }}
              >
                Change password
              </IonButton>
            </IonItem>
          </div>

          <IonModal isOpen={showChangePasswordModal}>
            <div className="modal-content center-profile">
              <h2 style={{ textAlign: "center" }}>Change Password</h2>
              <IonItem>
                <IonLabel position="floating" style={{ marginBottom: "20px" }}>
                  Old Password
                </IonLabel>
                <IonInput
                  value={oldPassword}
                  type="password"
                  onIonChange={(e) => setOldPassword(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating" style={{ marginBottom: "20px" }}>
                  New Password
                </IonLabel>
                <IonInput
                  value={newPassword}
                  type="password"
                  onIonChange={(e) => setNewPassword(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating" style={{ marginBottom: "20px" }}>
                  Confirm New Password
                </IonLabel>
                <IonInput
                  value={confirmNewPassword}
                  type="password"
                  onIonChange={(e) => setConfirmNewPassword(e.detail.value!)}
                />
              </IonItem>

              <IonButton
                expand="block"
                color="success"
                disabled={isSaveDisabled}
                onClick={handleSaveNewPassword}
                style={{
                  marginTop: "20px",
                }}
              >
                Save
              </IonButton>
              <IonButton
                expand="block"
                color="danger"
                onClick={() => setShowChangePasswordModal(false)} // Închide fereastra modală
                style={{
                  marginTop: "10px",
                }}
              >
                Cancel
              </IonButton>
            </div>
          </IonModal>

          <div className="share">
            <div className="grid-item preferred">
              <IonItem>
                <IonLabel position="floating" style={{ marginBottom: "20px" }}>
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
            onClick={() => setShowDeleteAccountModal(true)}
            style={{
              display: "block",
              // marginTop: "40px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "50vw",
            }}
          >
            Delete Account
          </IonButton>
          {/* Modal pentru confirmarea ștergerii contului */}
          <IonModal isOpen={showDeleteAccountModal}>
            <div className="modal-content center-profile">
              <h2 style={{ textAlign: "center", color: "red" }}>
                Warning! Irreversible action
              </h2>
              <p style={{ textAlign: "center", marginBottom: "20px" }}>
                Please enter your password to confirm you want to delete your
                account. This action is irreversible!
              </p>
              <IonItem>
                <IonLabel position="floating" style={{ marginBottom: "20px" }}>
                  Password
                </IonLabel>
                <IonInput
                  value={deletePassword}
                  type="password"
                  onIonChange={(e) => setDeletePassword(e.detail.value!)}
                />
              </IonItem>
              <IonButton
                expand="block"
                color="danger"
                onClick={handleDeleteAccount}
                style={{
                  marginTop: "20px",
                }}
              >
                Yes, Delete My Account
              </IonButton>
              <IonButton
                expand="block"
                color="light"
                onClick={() => setShowDeleteAccountModal(false)}
                style={{
                  marginTop: "10px",
                }}
              >
                No, Keep My Account
              </IonButton>
            </div>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
