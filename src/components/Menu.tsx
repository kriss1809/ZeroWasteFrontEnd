import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { homeOutline, listOutline, personOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const Menu: React.FC = () => {
  const history = useHistory();

  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="myproducts" onClick={() => history.push("/home")}>
        <IonIcon icon={homeOutline} />
        <IonLabel>Products</IonLabel>
      </IonTabButton>

      <IonTabButton tab="recepies" onClick={() => history.push("/recepies")}>
        <IonIcon icon={listOutline} />
        <IonLabel>Recepies</IonLabel>
      </IonTabButton>

      <IonTabButton tab="profile" onClick={() => history.push("/profile")}>
        <IonIcon icon={personOutline} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default Menu;
