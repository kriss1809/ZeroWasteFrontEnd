import React from "react";
import "../theme/RecipesCard.css"; // Fișier CSS pentru styling personalizat

export interface RecipeProps {
  id: number;
  name: string;
  difficulty_level: number;
  time: string;
}

const RecipeCard: React.FC<RecipeProps> = ({
  id,
  name,
  difficulty_level,
  time,
}) => {
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

  return (
    <div className="recipe-card">
      <h2 className="recipe-name">{name}</h2>
      <p className="recipe-detail">
        <strong>Time:</strong> {time}
      </p>
      <p className="recipe-detail">
        <strong>Difficulty:</strong> {getDifficultyLabel(difficulty_level)}
      </p>
    </div>
  );
};

export default RecipeCard;
