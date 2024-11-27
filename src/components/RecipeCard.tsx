import React, { useState } from "react";
import { IonIcon, IonButton } from "@ionic/react";
import {
  timerOutline,
  flameOutline,
  heartDislikeOutline,
  heartOutline,
} from "ionicons/icons";
import "../theme/RecipesCard.css";

export interface RecipeProps {
  id: number;
  name: string;
  difficulty_level: number;
  time: string;
  image: string; 
}

const RecipeCard: React.FC<RecipeProps> = ({
  id,
  name,
  difficulty_level,
  time,
  image,
}) => {


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

  return (
    <div className="recipe-card">
      {/* Imaginea rețetei */}
      <img src={image} alt={name} className="recipe-photo" />

      <div className="recipe-content">
        <div className="recipe-header">
          <span className="recipe-title">{name}</span>
          <div className="recipe-actions">
            {/* Buton Like */}
            <IonIcon
              className="like-dislike-button"
              icon={heartOutline}
              size="large"
              color="success"
            />
            {/* Buton Dislike */}
            <IonIcon
              className="like-dislike-button"
              icon={heartDislikeOutline}
              size="large"
              color="danger"
            />
          </div>
        </div>

        <div className="recipe-attributes">
          <IonIcon icon={timerOutline} className="recipe-icon" />
          {time}
          <IonIcon icon={flameOutline} className="recipe-icon" />
          {getDifficultyLabel(difficulty_level)}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
