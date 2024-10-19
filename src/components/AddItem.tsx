import React, { useEffect, useState } from "react";
import {
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  IonList,
  IonText,
} from "@ionic/react";

const AddItem: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [productName, setProductName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [recommendedDays, setRecommendedDays] = useState("");
  const [error, setError] = useState("");

  
    useEffect(() => {
        console.log(productName, expirationDate, openingDate, recommendedDays);
    }, [productName, expirationDate, openingDate, recommendedDays]);

  const handleSave = () => {
    // Use setTimeout to delay validation
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
    setProductName("");
    setExpirationDate("");
    setOpeningDate("");
    setRecommendedDays("");
    setError("");
    setIsExpanded(false);
     
  };


  const isValidDate = (dateString: string): boolean => {
    // Split the date to validate
    const parts = dateString.split("-");
    if (parts.length !== 3) return false;

    const [year, month, day] = parts.map(Number);
    const date = new Date(year, month - 1, day); // Month is 0-indexed

    // Validate the date
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  return (
    <div style={{ padding: "16px" }}>
      <IonItem>
        <IonInput
          placeholder="Add a product"
          onFocus={() => setIsExpanded(true)} // Expand on focus
          value={productName}
          onIonInput={(e) => setProductName(e.detail.value!)} // Use onIonInput for immediate updates
          style={{ flex: 1 }}
        />
        <IonButton onClick={() => setIsExpanded(true)}>+</IonButton>
      </IonItem>

      {isExpanded && (
        <IonList style={{ marginTop: "10px" }}>
          <IonItem>
            <IonLabel position="stacked">Expiration Date</IonLabel>
            <IonInput
              type="date"
              value={expirationDate}
              onIonInput={(e) => setExpirationDate(e.detail.value!)} // Set value directly
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Opening Date</IonLabel>
            <IonInput
              type="date"
              value={openingDate}
              onIonInput={(e) => setOpeningDate(e.detail.value!)} // Set value directly
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Recommended Days to Consume</IonLabel>
            <IonInput
              type="number"
              value={recommendedDays}
              onIonInput={(e) => setRecommendedDays(e.detail.value!)} // Use e.detail.value
            />
          </IonItem>
          {error && (
            <IonText color="danger" style={{ marginTop: "10px" }}>
              {error}
            </IonText>
          )}
          <IonButton
            expand="full"
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
