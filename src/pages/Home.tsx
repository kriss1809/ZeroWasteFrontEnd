import React from "react";
import { IonPage } from "@ionic/react";
import Menu from "../components/Menu";
import AddItem from "../components/AddItem";

const Home: React.FC = () => {
  return (
    <IonPage>
      <AddItem />
      <Menu />
    </IonPage>
   
  );
};

export default Home;
