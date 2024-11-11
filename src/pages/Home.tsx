// Home.tsx
import React, { useEffect, useState } from "react";
import { IonHeader, IonPage, IonContent, IonButton, IonLoading, IonIcon, IonModal, IonList, IonItem, IonLabel, IonListHeader } from "@ionic/react";
import Menu from "../components/Menu";
import AddItem from "../components/AddItem";
import ItemCard from "../components/ItemCard";
import { useTheme } from "../components/ThemeContext";
import { GetProductList } from "../services/apiClient";
import { peopleOutline, receiptOutline, closeOutline } from "ionicons/icons";
import CollaboratorsModal from "../components/CollaboratorsModal";
import UploadReceiptModal from "../components/UploadReceiptModal";
import { useWebSocket } from "../services/WebSocketProvider";
import { useAuth } from "../services/authProvider";

const Home: React.FC = () => {
  const { darkMode } = useTheme();
  const { sendMessage, messages, isConnected } = useWebSocket();
  const { isAuthenticated } = useAuth();
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    name: string;
    best_before: string;
    opened: string; 
    consumption_days: string; 
  } | null>(null);

  const handleCancelEdit = () => {
    setSelectedItem(null); // Clear the selected item when canceling
  };

  const [products, setProducts] = useState<Array<{
    id: number;
    name: string;
    best_before: string;
    opened: string;
    consumption_days: string;
  }>>([]);

  const [loading, setLoading] = useState(false);
  const [showUploadModal, setshowUploadModal] = useState(false);
  const [showCollaboratorsModal, setshowCollaboratorsModal] = useState(false);
  
useEffect(() => {
  const fetchData = async () => {

    const waitForToken = new Promise<void>((resolve) => {
      const checkToken = setInterval(() => {
        setLoading(true);
        if (sessionStorage.getItem("accessToken")) {
          clearInterval(checkToken);
          setLoading(false);
          resolve();
        }
      }, 50);
    });

    await waitForToken;

    GetProductList().then((response) => {
      if(response){
        setProducts(response);
      }
      else{
      setProducts(sessionStorage.getItem("products") ? JSON.parse(sessionStorage.getItem("products")!) : []);
    }
    }); 
  };

  fetchData();
}, []);


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

      <IonLoading
        isOpen={loading}
        message="Please wait..."
        cssClass={darkMode ? "dark-mode" : ""}
      />

      <IonContent>
        <div className={darkMode ? "dark-mode" : ""}>
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
