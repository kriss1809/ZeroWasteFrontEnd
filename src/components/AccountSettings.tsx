import {
  IonLabel,
  IonButton,
  IonInput, IonModal
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUserProfile } from "../services/apiClient";

const AccountSettings: React.FC = () => {

    const history = useHistory();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [deleteAccount, setDeleteAccount] = useState<boolean>(false);

    const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

    const [showDeleteAccountModal, setShowDeleteAccountModal] =
    useState<boolean>(false);
    const [deletePassword, setDeletePassword] = useState<string>("");

    useEffect(() => {
      const fetchUserProfile = async () => {
        const userProfile = await getUserProfile();
        if (userProfile) {
          setEmail(userProfile.email);
        }
      };

      fetchUserProfile();
    }, []);

    const handleSaveNewPassword = () => {
      console.log("Parola a fost schimbată");
      setShowChangePasswordModal(false);
    };

    const handleDeleteAccount = () => {
      console.log("Contul a fost șters");
      setShowDeleteAccountModal(false);
      history.push("/successfully-deleted-account");
    };

    const isSaveDisabled = newPassword !== confirmNewPassword;

  return (
    <>
      <div className="check-in">
        <div className="input">
          <IonLabel position="floating" style={{ marginBottom: "20px" }}>
            Email
          </IonLabel>
          <IonInput
            value={email}
            type="email"
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </div>

        <IonButton
          onClick={() => setShowChangePasswordModal(true)} 
          className="green-button-gradient"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "90vw",
          }}
        >
          Change password
        </IonButton>
      </div>

      <IonModal isOpen={showChangePasswordModal}>
        <div className="modal-content center-profile">
          <h2 style={{ textAlign: "center" }}>Change Password</h2>
          <div>
            <IonLabel position="floating" style={{ marginBottom: "20px" }}>
              Old Password
            </IonLabel>
            <IonInput
              value={oldPassword}
              type="password"
              onIonChange={(e) => setOldPassword(e.detail.value!)}
            />
          </div>
          <div>
            <IonLabel position="floating" style={{ marginBottom: "20px" }}>
              New Password
            </IonLabel>
            <IonInput
              value={newPassword}
              type="password"
              onIonChange={(e) => setNewPassword(e.detail.value!)}
            />
          </div>
          <div>
            <IonLabel position="floating" style={{ marginBottom: "20px" }}>
              Confirm New Password
            </IonLabel>
            <IonInput
              value={confirmNewPassword}
              type="password"
              onIonChange={(e) => setConfirmNewPassword(e.detail.value!)}
            />
          </div>

          <IonButton
            expand="block"
            className="green-button-gradient"
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
            onClick={() => setShowChangePasswordModal(false)} 
            style={{
              marginTop: "10px",
            }}
          >
            Cancel
          </IonButton>
        </div>
      </IonModal>

      <IonButton
        color="danger"
        onClick={() => setShowDeleteAccountModal(true)}
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "90vw",
        }}
      >
        Delete Account
      </IonButton>
      <IonModal isOpen={showDeleteAccountModal}>
        <div className="modal-content center-profile">
          <h2 style={{ textAlign: "center", color: "red" }}>
            Warning! Irreversible action
          </h2>
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Please enter your password to confirm you want to delete your
            account. This action is irreversible!
          </p>
          <div>
            <IonLabel position="floating" style={{ marginBottom: "20px" }}>
              Password
            </IonLabel>
            <IonInput
              value={deletePassword}
              type="password"
              onIonChange={(e) => setDeletePassword(e.detail.value!)}
            />
          </div>
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
            className="green-button-gradient"
            onClick={() => setShowDeleteAccountModal(false)}
            style={{
              marginTop: "10px",
            }}
          >
            No, Keep My Account
          </IonButton>
        </div>
      </IonModal>
    </>
  );
};

export default AccountSettings;
