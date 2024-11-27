import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonModal,
} from "@ionic/react";
import Menu from "../components/Menu";
import RecipeCard from "../components/RecipeCard";

const Recipes: React.FC = () => {
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<any>({
    course: [],
    foodType: [],
    diet: [],
    region: [],
    collection: [],
  });

  const courses = ["Appetizer", "Main Course", "Dessert"];
  const foodTypes = ["Vegetarian", "Vegan", "Non-Vegetarian"];
  const diets = ["Low Carb", "High Protein", "Keto"];
  const regions = ["Italian", "Mexican", "Indian"];
  const collections = ["Favorites", "Quick Recipes", "Family Meals"];

  const handleSelectChange = (category: string, values: any[]) => {
    setFilterOptions({
      ...filterOptions,
      [category]: values,
    });
  };
  return (
    <IonPage>
      <IonHeader
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          borderBottom: "1px solid #e5e5e5",
          fontSize: "8vw",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #1b8911 0%, #5cb947 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
          }}
        >
          ZeroWaste Recipes
        </div>
      </IonHeader>

      <IonContent>
        <div className="button-container">
          <IonButton
            expand="block"
            onClick={() => setSortModalOpen(true)}
            className="square-button"
          >
            Sort By
          </IonButton>
          <IonButton
            expand="block"
            onClick={() => setFilterModalOpen(true)}
            className="square-button"
          >
            Filter
          </IonButton>
        </div>

        {/* Modal pentru Sort By */}
        <IonModal
          isOpen={isSortModalOpen}
          onDidDismiss={() => setSortModalOpen(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Sort By</IonTitle>
              <IonButton
                slot="end"
                onClick={() => setSortModalOpen(false)}
                color="dark"
              >
                Exit
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {["Newest", "Relevance", "Time", "Difficulty"].map((option) => (
                <IonItem
                  button
                  key={option}
                  onClick={() => {
                    setSortOption(option);
                    setSortModalOpen(false);
                  }}
                >
                  <IonLabel>{option}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonModal>

        {/* Modal pentru Filter */}
        <IonModal
          isOpen={isFilterModalOpen}
          onDidDismiss={() => setFilterModalOpen(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Filter</IonTitle>
              <IonButton
                slot="end"
                onClick={() => setFilterModalOpen(false)}
                color="dark"
              >
                Exit
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {/* Course */}
              <IonItem>
                <IonLabel>Course</IonLabel>
                <IonSelect
                  value={filterOptions.course}
                  onIonChange={(e) =>
                    handleSelectChange("course", e.detail.value)
                  }
                  multiple={true}
                  placeholder="Select Courses"
                >
                  {courses.map((course) => (
                    <IonSelectOption key={course} value={course}>
                      {course}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              {/* Food Type */}
              <IonItem>
                <IonLabel>Food Type</IonLabel>
                <IonSelect
                  value={filterOptions.foodType}
                  onIonChange={(e) =>
                    handleSelectChange("foodType", e.detail.value)
                  }
                  multiple={true}
                  placeholder="Select Food Types"
                >
                  {foodTypes.map((type) => (
                    <IonSelectOption key={type} value={type}>
                      {type}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              {/* Diet */}
              <IonItem>
                <IonLabel>Diet</IonLabel>
                <IonSelect
                  value={filterOptions.diet}
                  onIonChange={(e) =>
                    handleSelectChange("diet", e.detail.value)
                  }
                  multiple={true}
                  placeholder="Select Diets"
                >
                  {diets.map((diet) => (
                    <IonSelectOption key={diet} value={diet}>
                      {diet}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              {/* Region */}
              <IonItem>
                <IonLabel>Region</IonLabel>
                <IonSelect
                  value={filterOptions.region}
                  onIonChange={(e) =>
                    handleSelectChange("region", e.detail.value)
                  }
                  multiple={true}
                  placeholder="Select Regions"
                >
                  {regions.map((region) => (
                    <IonSelectOption key={region} value={region}>
                      {region}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              {/* Collection */}
              <IonItem>
                <IonLabel>Collection</IonLabel>
                <IonSelect
                  value={filterOptions.collection}
                  onIonChange={(e) =>
                    handleSelectChange("collection", e.detail.value)
                  }
                  multiple={true}
                  placeholder="Select Collections"
                >
                  {collections.map((collection) => (
                    <IonSelectOption key={collection} value={collection}>
                      {collection}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
          </IonContent>
        </IonModal>

        {/* Afișare Rețete */}
        <div>
          <RecipeCard
            id={1}
            name="Almond Cookies"
            difficulty_level={2}
            time="30min"
            image="https://cdn.recipes.lidl/images/en-GB/en-GB_91edbf64-ff53-4aca-a0f2-4dc72eed7475/recipe_640x360_tCAMP2024_RecipesSevenStuWestPinacoladapancakes1440x810_STYLE_GBR_FGBR.jpg"
          />
          <RecipeCard
            id={2}
            name="Chocolate Cake"
            difficulty_level={1}
            time="20min"
            image="https://cdn.recipes.lidl/images/en-GB/en-GB_91edbf64-ff53-4aca-a0f2-4dc72eed7475/recipe_640x360_tCAMP2024_RecipesSevenStuWestPinacoladapancakes1440x810_STYLE_GBR_FGBR.jpg"
          />
          <RecipeCard
            id={3}
            name="Turkey Wellington"
            difficulty_level={3}
            time="1h 5min"
            image="https://cdn.recipes.lidl/images/en-GB/en-GB_91edbf64-ff53-4aca-a0f2-4dc72eed7475/recipe_640x360_tCAMP2024_RecipesSevenStuWestPinacoladapancakes1440x810_STYLE_GBR_FGBR.jpg"
          />
        </div>
      </IonContent>

      <div slot="bottom">
        <Menu />
      </div>
    </IonPage>
  );
};

export default Recipes;
