interface RecipeProps {
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
  return <div>altecva</div>;
};

export default RecipeCard;
