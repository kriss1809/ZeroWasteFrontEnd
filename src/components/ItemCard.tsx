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
import { DeleteProduct } from "../services/apiClient";

interface ItemProps {
  id: number;
  name: string;
  best_before: string; // Format: "DD.MM.YYYY"
  opened: string;
  consumption_days: string;
  onEdit: (
    id: number,
    name: string,
    best_before: string,  // Format: "DD.MM.YYYY"
    opened: string,
    consumption_days: string
  ) => void; // Callback prop for editing
}


const ItemCard: React.FC<ItemProps> = ({id,name, best_before, opened, consumption_days, onEdit }) => {
  const history = useHistory();
  const { darkMode } = useTheme();
  const [presentAlert] = useIonAlert();

  const convertDateFormat = (date: string) => {
    const parts = date.split("-");
    return `${parts[2]}.${parts[1]}.${parts[0]}`; // "DD.MM.YYYY"
  };

  best_before ? best_before = convertDateFormat(best_before) : best_before; // Convert the date format
  opened ? (opened = convertDateFormat(opened)) : opened; // Convert the date format if opened is not null 

  const handleItemConsumed = () => {
    console.log("Item consumed");
  };
 
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    DeleteProduct(id)
  };

   const isExpired = () => {
     const today = new Date();
     const parts = best_before.split(".");
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
    onEdit(id,name, best_before, opened, consumption_days); // Call the edit handler
  };


  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <IonCard
        className={`item-card ${best_before ? isExpired() ? "expired" : "" : ""}`}
        onClick={handleItemEdit}
      >
        <IonCardHeader>
          <IonLabel className="item-card-title">{name}</IonLabel>
        </IonCardHeader>

        <IonCardContent className="item-card-content">
          <div className="footer-container">
            <div className="expiration-text">
              {"Expiration date: " + best_before}
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
                onClick={(e) => handleDeleteClick(e)}
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