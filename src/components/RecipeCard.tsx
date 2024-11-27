import React, { useState } from "react";
import { IonIcon, IonButton } from "@ionic/react";
import {
  timeOutline,
  flameOutline,
  thumbsUp,
  thumbsDown,
} from "ionicons/icons";
import "../theme/RecipesCard.css";

export interface RecipeProps {
  id: number;
  name: string;
  difficulty_level: number;
  time: string;
  image: string; // Imagine pentru rețetă
}

const RecipeCard: React.FC<RecipeProps> = ({
  id,
  name,
  difficulty_level,
  time,
  image,
}) => {
  const [likes, setLikes] = useState(0); // Inițializare pentru like-uri
  const [dislikes, setDislikes] = useState(0); // Inițializare pentru dislike-uri
  // Funcție pentru a obține descrierea nivelului de dificultate
  const getDifficultyLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Easy";
      case 2:
        return "Medium";
      case 3:
        return "Hard";
      default:
        return "Unknown";
    }
  };

  // Funcție pentru a obține culoarea nivelului de dificultate
  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1:
        return "green"; // Ușor
      case 2:
        return "orange"; // Mediu
      case 3:
        return "red"; // Dificil
      default:
        return "gray";
    }
  };

  return (
    <div className="recipe-card">
      {/* Imaginea rețetei */}
      <img src={image} alt={name} className="recipe-photo" />

      <div className="recipe-content">
        <div className="recipe-tag">
          <span className="tag-recipe">{name}</span>
        </div>
        {/* <p className="recipe-title">{name}</p> */}
        <ul className="recipe-attributes">
          {/* Timp */}
          <li className="recipe-attribute">
            <IonIcon
              icon={timeOutline}
              className="recipe-icon"
              style={{ color: "blue" }}
            />
            <span>{time}</span>
          </li>
          {/* Dificultate */}
          <li className="recipe-attribute">
            <IonIcon
              icon={flameOutline}
              className="recipe-icon"
              style={{ color: getDifficultyColor(difficulty_level) }}
            />
            <span>{getDifficultyLabel(difficulty_level)}</span>
          </li>
        </ul>
        <div className="recipe-actions">
          {/* Buton Like */}
          <IonButton
            fill="clear"
            color="success"
            onClick={() => setLikes(likes + 1)}
          >
            <IonIcon
              className="like-dislike-button"
              icon={thumbsUp}
              slot="icon-only"
            />
          </IonButton>
          <span>{likes}</span>

          {/* Buton Dislike */}
          <IonButton
            fill="clear"
            color="danger"
            onClick={() => setDislikes(dislikes + 1)}
          >
            <IonIcon
              className="like-dislike-button"
              icon={thumbsDown}
              slot="icon-only"
            />
          </IonButton>
          <span>{dislikes}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
