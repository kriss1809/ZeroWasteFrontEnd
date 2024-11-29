import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  timerOutline,
  flameOutline,
  heartDislikeOutline,
  heartOutline,
  heartDislike,
  heart,
} from "ionicons/icons";
import "../theme/RecipesCard.css";

export interface RecipeProps {
  id: number;
  name: string;
  difficulty_level: number;
  time: number;
  image: string;
}

const RecipeCard: React.FC<RecipeProps> = ({
  id,
  name,
  difficulty_level,
  time,
  image,
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const hours = Math.floor(time / 60); // Orele întregi
  const minutes = time % 60; // Minutele rămase (întregi)

  const timeString = `${hours > 0 ? `${hours}h` : ""}${hours > 0 && minutes > 0 ? " " : ""}${minutes > 0 ? `${minutes} min` : ""}`;


  const handleLikeClick = () => {
    setLiked(!liked);
    if (disliked) {
      setDisliked(false); // Dacă a fost apăsat dislike, îl resetăm
    }
  };

  const handleDislikeClick = () => {
    setDisliked(!disliked);
    if (liked) {
      setLiked(false); // Dacă a fost apăsat like, îl resetăm
    }
  };

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
              icon={liked ? heart : heartOutline}
              size="large"
              color="success"
              onClick={handleLikeClick}
            />
            {/* Buton Dislike */}
            <IonIcon
              className="like-dislike-button"
              icon={disliked ? heartDislike : heartDislikeOutline}
              size="large"
              color="danger"
              onClick={handleDislikeClick}
            />
          </div>
        </div>

        <div className="recipe-attributes">
          <IonIcon icon={timerOutline} className="recipe-icon" />
          {timeString}
          <IonIcon icon={flameOutline} className="recipe-icon" />
          {getDifficultyLabel(difficulty_level)}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
