import { IonTabBar, IonTabButton, IonIcon, IonLabel, IonCard, IonCardHeader, IonCardContent } from "@ionic/react";
import { homeOutline, listOutline, personOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import '../theme/itemCard.css';

interface ItemProps {
  title: string;
  expiration_date: string;
}

const Item: React.FC<ItemProps> = ({ title, expiration_date}) => {
  const history = useHistory();

  return (
    <IonCard className="item-card">
      <IonCardHeader>
        <IonLabel className="item-card-title">{title}</IonLabel>
      </IonCardHeader>

      <IonCardContent className="item-card-content">
        <p>{"Expiration date: " + expiration_date}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default Item;
