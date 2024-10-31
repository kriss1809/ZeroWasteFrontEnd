// Home.tsx
import React, { useEffect, useState } from "react";
import { IonHeader, IonPage, IonContent, IonButton, IonLoading } from "@ionic/react";
import Menu from "../components/Menu";
import AddItem from "../components/AddItem";
import ItemCard from "../components/ItemCard";
import { useTheme } from "../components/ThemeContext";
import { GetProductList } from "../services/apiClient";

const Home: React.FC = () => {
  const { darkMode } = useTheme();
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    name: string;
    best_before: string;
    opened: string; 
    consumption_days: string; 
  } | null>(null);

  const [products, setProducts] = useState<Array<{
    id: number;
    name: string;
    best_before: string;
    opened: string;
    consumption_days: string;
  }>>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      if(!sessionStorage.getItem("accessToken")) {
        setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 60*25));
        setLoading(false);}
      await GetProductList();
      const productsFromStorage = sessionStorage.getItem("products");
      setProducts(productsFromStorage ? JSON.parse(productsFromStorage) : []);
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
    setSelectedItem({id, name, best_before, opened, consumption_days }); // Set selected item
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
      <IonLoading isOpen={loading} message="Please wait..." />
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
        <AddItem selectedItem={selectedItem} />
        <Menu />
      </div>
    </IonPage>
  );
};

export default Home;
