import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  useIonAlert,
} from "@ionic/react";
import {
  homeOutline,
  listOutline,
  personOutline,
  trashOutline,
  restaurantOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "../theme/itemCard.css";
import { useTheme } from "./ThemeContext";

interface ItemProps {
  title: string;
  expiration_date: string;
}

const ItemCard: React.FC<ItemProps> = ({ title, expiration_date }) => {
  const history = useHistory();
  const { darkMode } = useTheme();
  const [presentAlert] = useIonAlert();

  const handleItemConsumed = () => {
    console.log("Item consumed");
  };
 
  const handleDeleteClick = () => {
    console.log("Item deleted");
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <IonCard className="item-card">
        <IonCardHeader>
          <IonLabel className="item-card-title">{title}</IonLabel>
        </IonCardHeader>

        <IonCardContent className="item-card-content">
          <div className="footer-container">
            <div className="expiration-text">
              {"Expiration date: " + expiration_date}
            </div>
            <div className="button-container">
              <IonButton
                color="success"
                size="small"
                onClick={handleItemConsumed}
              >
                <IonIcon icon={restaurantOutline} slot="icon-only" />
              </IonButton>
              <IonButton
                color="danger"
                size="small"
                onClick={handleDeleteClick}
              >
                <IonIcon icon={trashOutline} slot="icon-only" />
              </IonButton>
            </div>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default ItemCard;
