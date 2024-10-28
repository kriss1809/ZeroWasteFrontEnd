// Home.tsx
import React, { useState } from "react";
import { IonHeader, IonPage, IonContent } from "@ionic/react";
import Menu from "../components/Menu";
import AddItem from "../components/AddItem";
import ItemCard from "../components/ItemCard";
import { useTheme } from "../components/ThemeContext";

const Home: React.FC = () => {
  const { darkMode } = useTheme();
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    expiration_date: string;
    opening_date: string; // Adaugă acest câmp
    recommended_days: string; // Adaugă acest câmp
  } | null>(null);

  const handleEditItem = (
    title: string,
    expiration_date: string,
    opening_date: string,
    recommended_days: string
  ) => {
    setSelectedItem({ title, expiration_date, opening_date, recommended_days }); // Set selected item
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
            title="Card 1"
            expiration_date="19.09.2023"
            opening_date="01.09.2023" // Adaugă un exemplu de dată
            recommended_days="7" // Adaugă un exemplu de zile
            onEdit={handleEditItem}
          />
          <ItemCard
            title="Card 2"
            expiration_date="19.09.2025"
            opening_date="01.09.2025"
            recommended_days="30"
            onEdit={handleEditItem}
          />
          <ItemCard
            title="Card 3"
            expiration_date="28.10.2024"
            opening_date="01.10.2024"
            recommended_days="14"
            onEdit={handleEditItem}
          />
          <ItemCard
            title="Card 4"
            expiration_date="01.02.2026"
            opening_date="01.01.2026"
            recommended_days="90"
            onEdit={handleEditItem}
          />
          <ItemCard
            title="Card 5"
            expiration_date="19.09.2020"
            opening_date="01.09.2020"
            recommended_days="0"
            onEdit={handleEditItem}
          />
          <ItemCard
            title="Card 6"
            expiration_date="30.10.2024"
            opening_date="01.10.2024"
            recommended_days="10"
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
