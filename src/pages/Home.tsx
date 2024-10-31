// Home.tsx
import React, { useState } from "react";
import { IonHeader, IonPage, IonContent, IonButton } from "@ionic/react";
import Menu from "../components/Menu";
import AddItem from "../components/AddItem";
import ItemCard from "../components/ItemCard";
import { useTheme } from "../components/ThemeContext";

const Home: React.FC = () => {
  const { darkMode } = useTheme();
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    best_before: string;
    opened: string; 
    consumption_days: string; 
  } | null>(null);

  const handleEditItem = (
    name: string,
    best_before: string,
    opened: string,
    consumption_days: string
  ) => {
    setSelectedItem({ name, best_before, opened, consumption_days }); // Set selected item
  };

  return (
    <IonPage>
      <IonHeader
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        Your products
      </IonHeader>

      <IonContent>
        <div className={darkMode ? "dark-mode" : ""}>
          <ItemCard
            name="Card 1"
            best_before="19.09.2023"
            opened="01.09.2023" 
            consumption_days="7" 
            onEdit={handleEditItem}
          />
        </div>
      </IonContent>

      <div slot="bottom">
        <AddItem selectedItem={selectedItem} />
        <Menu />
      </div>
    </IonPage>
  );
};

export default Home;
