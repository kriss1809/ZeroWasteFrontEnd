import { useTheme } from "./ThemeContext";
import {
  IonIcon,
  IonModal,
  IonHeader,
  IonContent,
  IonLabel,
  IonItem,
  IonImg,
  IonButton,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { useState } from "react";
import { useProductList } from "../services/ProductListProvider";

interface ModalProps {
  showUploadModal: boolean;
  setShowUploadModal: (showUploadModal: boolean) => void;
}

const UploadReceiptModal: React.FC<ModalProps> = ({
  showUploadModal,
  setShowUploadModal,
}) => {
  const { uploadReceipt } = useProductList();
  const { darkMode } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null); // New state to hold the file name
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name); // Set the file name
      setFile(file); // Set the file
      const reader = new FileReader();

      // Check if the uploaded file is an image
      if (file.type.startsWith("image/")) {
        reader.onloadend = () => {
          setSelectedImage(reader.result as string); // Set image for preview
        };
        reader.readAsDataURL(file);
      } else {
        setSelectedImage(null); // Reset image preview for non-image files
      }
    }
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <IonModal
        className={darkMode ? "dark-mode" : ""}
        isOpen={showUploadModal}
        onDidDismiss={() => setShowUploadModal(false)}
        style={{
          maxHeight: "50vh",
          width: "80vw",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
          border: `1px solid ${darkMode ? "white" : "black"}`,
        }}
      >
        <IonHeader
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
            padding: "0.5rem",
          }}
        >
          <div style={{ fontSize: "1rem", flexGrow: 1 }}>
            Upload your receipt
          </div>
          <div>
            <IonIcon
              icon={closeOutline}
              onClick={() => setShowUploadModal(false)}
              style={{
                fontSize: "2rem",
                marginLeft: "auto",
              }}
            />
          </div>
        </IonHeader>
        <IonContent>
          {/* Button for capturing a photo */}
          <IonItem>
            <IonLabel className="label-dark-mode">Take Photo</IonLabel>
            <IonButton
              slot="end"
              onClick={() => document.getElementById("cameraInput")?.click()}
              className="green-button-gradient"
            >
              Camera
            </IonButton>
          </IonItem>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="cameraInput"
          />

          {/* Button for uploading an image */}
          <IonItem>
            <IonLabel className="label-dark-mode">Upload Photo</IonLabel>
            <IonButton
              slot="end"
              onClick={() => document.getElementById("fileInput")?.click()}
              className="green-button-gradient"
            >
              Upload
            </IonButton>
          </IonItem>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />

          {fileName && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1rem 0",
              }}
            >
              <IonLabel>{`Selected file: ${fileName}`}</IonLabel>
            </div>
          )}

          {selectedImage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IonButton
                style={{
                  width: "50vw",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
                className="green-button-gradient"
                onClick={() => {
                  setShowUploadModal(false);
                  uploadReceipt(file!).then((response) => {
                    if (response) {
                      console.log("Receipt uploaded successfully");
                    }
                  });
                }}
              >
                Confirm
              </IonButton>
            </div>
          )}

          {/* Image Preview */}
          {selectedImage && (
            <IonImg
              src={selectedImage}
              style={{
                width: "80%",
                margin: "1rem auto",
              }}
            />
          )}
        </IonContent>
      </IonModal>
    </div>
  );
};

export default UploadReceiptModal;
