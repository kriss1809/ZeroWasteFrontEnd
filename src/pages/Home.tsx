import React from "react";
import { IonHeader, IonPage, IonContent } from "@ionic/react";
import Menu from "../components/Menu";
import AddItem from "../components/AddItem";
import ItemCard from "../components/ItemCard";
import { useTheme } from "../components/ThemeContext";

const Home: React.FC = () => {
  const { darkMode } = useTheme();
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
        <ItemCard title="Card 1" expiration_date="19.09.2023"  />
        <ItemCard title="Card 1" expiration_date="19.09.2023" />
        <ItemCard title="Card 1" expiration_date="19.09.2023" />
        <ItemCard title="Card 1" expiration_date="19.09.2023" />
        <ItemCard title="Card 1" expiration_date="19.09.2023" />
        <ItemCard title="Card 1" expiration_date="19.09.2023" />
        </div>
      </IonContent>

      <div slot="bottom">
        <AddItem />
        <Menu />
      </div>
    </IonPage>
  );
};

export default Home;
