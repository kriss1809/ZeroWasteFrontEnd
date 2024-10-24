import React, { useEffect, useRef, useState } from "react";
import {
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  IonList,
  IonText,
} from "@ionic/react";
import "../theme/addItem.css";
import { useTheme } from "./ThemeContext";

const AddItem: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [productName, setProductName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [recommendedDays, setRecommendedDays] = useState("");
  const [error, setError] = useState("");
  const {darkMode} = useTheme();

  // Ref for the AddItem container
  const addItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addItemRef.current &&
        !addItemRef.current.contains(event.target as Node)
      ) {
        // Reset the form if clicked outside
        resetForm();
      }
    };

    // Add the click event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const resetForm = () => {
    setProductName("");
    setExpirationDate("");
    setOpeningDate("");
    setRecommendedDays("");
    setError("");
    setIsExpanded(false);
  };

  const handleSave = () => {
    if (!productName) {
      setError("Product name is required.");
      return;
    }

    if (!expirationDate) {
      setError("Expiration date is required.");
      return;
    }

    if (expirationDate && !isValidDate(expirationDate)) {
      setError("Invalid expiration date. Please use the format DD/MM/YYYY.");
      return;
    }

    if (openingDate && !isValidDate(openingDate)) {
      setError("Invalid opening date. Please use the format DD/MM/YYYY.");
      return;
    }

    // Handle saving the product details
    console.log({
      productName,
      expirationDate,
      openingDate,
      recommendedDays,
    });

    // Reset the form
    resetForm();
  };

  const isValidDate = (dateString: string): boolean => {
    const parts = dateString.split("-");
    if (parts.length !== 3) return false;

    const [year, month, day] = parts.map(Number);
    const date = new Date(year, month - 1, day); // Month is 0-indexed

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  return (
    <div ref={addItemRef} style={{ padding: "16px" }} className={darkMode ? "dark-mode" : ""}>
      <IonItem>
        <IonInput
          placeholder="Add a product"
          onFocus={() => setIsExpanded(true)}
          value={productName}
          onIonInput={(e) => setProductName(e.detail.value!)}
          style={{ flex: 1 }}
        />
        <IonButton
          className="green-button-gradient"
          onClick={() => setIsExpanded(true)}
        >
          +
        </IonButton>
      </IonItem>

      {isExpanded && (
        <IonList style={{ marginTop: "10px" }}>
          <IonItem>
            <IonLabel position="stacked">Expiration Date</IonLabel>
            <IonInput
              type="date"
              value={expirationDate}
              onIonInput={(e) => setExpirationDate(e.detail.value!)}
            />
          </IonItem>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IonItem style={{ flex: 1, marginRight: "8px" }}>
              <IonLabel position="stacked">Opening Date</IonLabel>
              <IonInput
                type="date"
                value={openingDate}
                onIonInput={(e) => setOpeningDate(e.detail.value!)}
              />
            </IonItem>

            <IonItem style={{ flex: 1 }}>
              <IonLabel position="stacked">Days to Consume</IonLabel>
              <IonInput
                type="number"
                value={recommendedDays}
                onIonInput={(e) => setRecommendedDays(e.detail.value!)}
              />
            </IonItem>
          </div>

          {error && (
            <IonText color="danger" style={{ marginTop: "10px" }}>
              {error}
            </IonText>
          )}
          <IonButton
            expand="full"
            className="green-button-gradient"
            onClick={handleSave}
            style={{ marginTop: "10px" }}
          >
            Save
          </IonButton>
        </IonList>
      )}
    </div>
  );
};

export default AddItem;
