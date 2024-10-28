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
  expiration_date: string; // Format: "DD.MM.YYYY"
  opening_date: string;
  recommended_days: string;
  onEdit: (
    title: string,
    expiration_date: string,
    opening_date: string,
    recommended_days: string
  ) => void; // Callback prop for editing
}


const ItemCard: React.FC<ItemProps> = ({ title, expiration_date, opening_date, recommended_days, onEdit }) => {
  const history = useHistory();
  const { darkMode } = useTheme();
  const [presentAlert] = useIonAlert();

  const handleItemConsumed = () => {
    console.log("Item consumed");
  };
 
  const handleDeleteClick = () => {
    console.log("Item deleted");
  };

   const isExpired = () => {
     const today = new Date();
     const parts = expiration_date.split(".");
     if (parts.length === 3) {
       const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // "YYYY-MM-DD"
       const expDate = new Date(formattedDate);
       today.setHours(0, 0, 0, 0);
       expDate.setHours(0, 0, 0, 0);
       return expDate < today;
     }
     return false;
   };

   const handleItemEdit = () => {
    onEdit(title, expiration_date, opening_date, recommended_days); // Call the edit handler
  };


  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <IonCard
        className={`item-card ${isExpired() ? "expired" : ""}`}
        onClick={handleItemEdit}
      >
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