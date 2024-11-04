import { useTheme } from "./ThemeContext";
import { closeOutline } from "ionicons/icons";
import { IonContent, IonList, IonItem, IonLabel, IonListHeader, IonModal, IonIcon } from "@ionic/react";
import { useState } from "react";

interface ModalProps {
  showCollaboratorsModal: boolean;
  setShowCollaboratorsModal: (showCollaboratorsModal: boolean) => void;
}

const CollaboratorsModal: React.FC<ModalProps> = ({ showCollaboratorsModal, setShowCollaboratorsModal }) => {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "dark-mode" : ""}>
    <IonModal
      isOpen={showCollaboratorsModal}
      onDidDismiss={() => setShowCollaboratorsModal(false)}
      style={{
        maxHeight: "50vh",
        width: "80vw",
        margin: "auto",
        justifyContent: "center",
        alignitems: "center",
        border: `1px solid ${darkMode ? "white" : "black"}`,
      }}
    >
      <IonContent>
        <IonList>
          <IonListHeader
            className="label-dark-mode"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `1px solid ${darkMode ? "white" : "black"}`,
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "inherit",
            }}
          >
            <div style={{ fontSize: "1rem", flexGrow: 1 }}>Collaborators</div>
            <div>
              <IonIcon
                icon={closeOutline}
                onClick={() => setShowCollaboratorsModal(false)}
                style={{
                  fontSize: "2rem",
                  marginLeft: "auto",
                  paddingRight: "1rem",
                }}
              />
            </div>
          </IonListHeader>
          <IonItem>
            <IonLabel className="label-dark-mode">Item 1</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
    </div>
  );
};

export default CollaboratorsModal;
