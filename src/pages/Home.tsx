// Home.tsx
import React, { useState } from "react";
import { IonHeader, IonPage, IonContent, IonButton, IonIcon, IonModal, IonList, IonItem, IonLabel, IonListHeader } from "@ionic/react";
import Menu from "../components/Menu";
import AddItem from "../components/AddItem";
import ItemCard from "../components/ItemCard";
import { useTheme } from "../components/ThemeContext";
import { peopleOutline, receiptOutline, closeOutline } from "ionicons/icons";
import CollaboratorsModal from "../components/CollaboratorsModal";
import UploadReceiptModal from "../components/UploadReceiptModal";
import { search } from "ionicons/icons";
import {  IonCol, IonInput } from "@ionic/react";
import { Product } from "../entities/Product";
import { useProductList } from "../services/ProductListProvider";

const Home: React.FC = () => {
  const { darkMode } = useTheme();
  const { products } = useProductList();
  const [selectedItem, setSelectedItem] = useState< Product | null>(null);

  const handleCancelEdit = () => {
    setSelectedItem(null); 
  };


  const [showUploadModal, setshowUploadModal] = useState(false);
  const [showCollaboratorsModal, setshowCollaboratorsModal] = useState(false); 


  const handleEditItem = (
    id: number,
    name: string,
    best_before: string,
    opened: string,
    consumption_days: string
  ) => {
    setSelectedItem({id, name, best_before, opened, consumption_days });
  };

  return (
    <IonPage>
      <IonHeader
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          borderBottom: "1px solid #e5e5e5",
          fontSize: "8vw",
        }}
      >
        <div onClick={() => setshowUploadModal(true)}>
          <IonIcon icon={receiptOutline} style={{ marginRight: "3vw" }} />
        </div>
        <div
          style={{
            background: "linear-gradient(135deg, #1b8911 0%, #5cb947 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            fontWeight: "bold",
          }}
        >
          ZeroWaste
        </div>
        <div onClick={() => setshowCollaboratorsModal(true)}>
          <IonIcon icon={peopleOutline} />
        </div>
      </IonHeader>

      <UploadReceiptModal
        showUploadModal={showUploadModal}
        setShowUploadModal={setshowUploadModal}
      />
      <CollaboratorsModal
        showCollaboratorsModal={showCollaboratorsModal}
        setShowCollaboratorsModal={setshowCollaboratorsModal}
      />

      <IonContent>
        <div className={darkMode ? "dark-mode" : ""}>

          <IonCol size="12" sizeMd="12" className="align-items-center">
            <div className="search-container">
              <IonInput placeholder="Search a product" />
              <IonButton className="green-button-gradient">
                <IonIcon icon={search} />
              </IonButton>
            </div>
          </IonCol>

          {products.map((product: any) => (
            <ItemCard
              key={product.id}
              id={product.id}
              name={product.name}
              best_before={product.best_before}
              opened={product.opened}
              consumption_days={product.consumption_days}
              onEdit={handleEditItem}
            />
          ))}
        </div>
      </IonContent>

      <div slot="bottom">
        <AddItem selectedItem={selectedItem} onCancelEdit={handleCancelEdit} />
        <Menu />
      </div>
    </IonPage>
  );
};

export default Home;
