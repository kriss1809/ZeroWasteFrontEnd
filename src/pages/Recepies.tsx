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
import "../theme/RecipesCard.css"; // Asigură-te că ai creat sau modificat acest fișier pentru stiluri
import Menu from "../components/Menu";
import RecipeCard from "../components/RecipeCard";

const Recepies: React.FC = () => {
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<any>({
    course: null,
    foodType: null,
    diet: null,
    region: null,
    collection: null,
  });

  const courses = ["Appetizer", "Main Course", "Dessert"];
  const foodTypes = ["Vegetarian", "Vegan", "Non-Vegetarian"];
  const diets = ["Low Carb", "High Protein", "Keto"];
  const regions = ["Italian", "Mexican", "Indian"];
  const collections = ["Favorites", "Quick Recipes", "Family Meals"];

  return (
    <IonPage>
      <IonContent>
        <div className="page-content">
          <IonHeader>
            <IonToolbar>
              <h1 className="recipe-title">All Recipes</h1>
            </IonToolbar>
          </IonHeader>

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
                      setFilterOptions({
                        ...filterOptions,
                        course: e.detail.value,
                      })
                    }
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
                      setFilterOptions({
                        ...filterOptions,
                        foodType: e.detail.value,
                      })
                    }
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
                      setFilterOptions({
                        ...filterOptions,
                        diet: e.detail.value,
                      })
                    }
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
                      setFilterOptions({
                        ...filterOptions,
                        region: e.detail.value,
                      })
                    }
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
                      setFilterOptions({
                        ...filterOptions,
                        collection: e.detail.value,
                      })
                    }
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
          <RecipeCard id={1} name="nume 1" difficulty_level={1} time="2h" />
          <RecipeCard id={2} name="nume 2" difficulty_level={1} time="2h" />

          <Menu />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Recepies;
