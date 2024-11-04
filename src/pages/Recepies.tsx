
import { IonPage} from "@ionic/react";
import React from "react";
import Menu from "../components/Menu";
import RecipeCard from "../components/RecipeCard";

const Recepies: React.FC = () => {

  return (
    <IonPage>
      <RecipeCard id={1} name="nume 1" difficulty_level={1} time="2h" />
      <RecipeCard id={2} name="nume 2" difficulty_level={1} time="2h" />

      <Menu />
    </IonPage>
  );
};

export default Recepies;
