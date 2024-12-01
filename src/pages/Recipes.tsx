import React, { useEffect, useState } from "react";
import {IonPage, IonHeader, IonToolbar,IonTitle,IonContent,IonButton,IonList,IonItem,IonLabel,IonSelect,IonSelectOption,IonModal,IonIcon,IonInput, IonGrid, IonRow, IonCol, IonInfiniteScroll, IonInfiniteScrollContent} from "@ionic/react";
import Menu from "../components/Menu";
import RecipeCard from "../components/RecipeCard";
import { search, optionsOutline, flameOutline, restaurantOutline, timerOutline, heartOutline } from "ionicons/icons";
import { useTheme } from "../components/ThemeContext";
import { useRecipes } from "../services/RecipesProvider";
import { Recipe } from "../entities/Recipe";

const Recipes: React.FC = () => {
  const [isFilterPanelVisible, setFilterPanelVisible] = useState(false);
  const { darkMode } = useTheme();
  const { recipes, loadMoreRecipes, hasMore, resetRecipes, loadMoreFilteredRecipes } = useRecipes();
  const [filtered, setFiltered] = useState<boolean>(false);
  const [time, setTime] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<number[]>([]);
  const [recipeType, setRecipeType] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<boolean | null>(null);
  const [nothingFound, setNothingFound] = useState<boolean>(false);

  const handleInfiniteScroll = async (event: CustomEvent<void>) => {
    if (hasMore) {
      if (filtered) {
        await loadMoreFilteredRecipes(time, difficulty, recipeType, favourites, false );
      } else {
        await loadMoreRecipes();
      }
    }
    (event.target as HTMLIonInfiniteScrollElement).complete();
  };

const handleFilter = async () => {
  try {
    setFilterPanelVisible(false);
    setNothingFound(false);
    if ((time === null || time === 0) && difficulty.length === 0 && recipeType === null && favourites === null) {
      setFiltered(false);
      resetRecipes();
    } else {
      setFiltered(true);

      try {
        await loadMoreFilteredRecipes(time, difficulty, recipeType, favourites, true);
      } catch (error: any) {
        setNothingFound(true);
        resetRecipes();
        setFiltered(false);
      }
    }
  } catch (error: any) {
    console.log("Unexpected error", error.detail);
  }
};


  const handleFilterContainer = () => {
    setTime(null);
    setDifficulty([]);
    setRecipeType(null);
    setFavourites(null);
    setFilterPanelVisible(!isFilterPanelVisible);
  }

  useEffect(() => {
    return () =>{
    resetRecipes();}
  }, []);

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
        <div className={darkMode ? "dark-mode" : ""}>
          <IonCol size="12" sizeMd="12" className="align-items-center">
            <div className="search-container">
              <IonInput placeholder="Search a recipe" />
              <IonButton className="green-button-gradient">
                <IonIcon icon={search} />
              </IonButton>
              <IonButton 
                onClick={() => handleFilterContainer()}
                className="green-button-gradient"
                style={{ marginLeft: "5px" }}
              >
                <IonIcon icon={optionsOutline} />
              </IonButton>
            </div>
          </IonCol>

        {isFilterPanelVisible && (
          <div id="filter-panel">
            <IonCol size="12" sizeMd="12">
              <div className="filter-container">
                {/* Difficulty Filter */}
                <div className="filter-field">
                  <IonIcon icon={flameOutline} size="large" />
                  <IonSelect
                    interface="popover"
                    multiple={true}
                    style={{ padding: 0 }}
                    placeholder="Difficulty"
                    className="transparent-select"
                    onIonChange={(e) => setDifficulty(e.detail.value)}  
                  >
                    <IonSelectOption className="label-dark-mode" value={1}>
                      1
                    </IonSelectOption>
                    <IonSelectOption className="label-dark-mode" value={2}>
                      2
                    </IonSelectOption>
                    <IonSelectOption className="label-dark-mode" value={3}>
                      3
                    </IonSelectOption>
                    <IonSelectOption
                      className="label-dark-mode"
                      value={[]}
                    >
                      All recipes
                    </IonSelectOption>
                  </IonSelect>
                </div>

                {/* Type Filter */}
                <div className="filter-field">
                  <IonIcon icon={restaurantOutline} size="large" />
                  <IonSelect
                    interface="popover"
                    multiple={false}
                    style={{ padding: 0 }}
                    placeholder="Type"
                    className="transparent-select"
                    onIonChange={(e) => setRecipeType(e.detail.value)}
                  >
                    <IonSelectOption
                      className="label-dark-mode"
                      value="Breakfast"
                    >
                      Breakfast
                    </IonSelectOption>
                    <IonSelectOption
                      className="label-dark-mode"
                      value="Starters"
                    >
                      Starters
                    </IonSelectOption>
                    <IonSelectOption className="label-dark-mode" value="Mains">
                      Mains
                    </IonSelectOption>
                    <IonSelectOption className="label-dark-mode" value="Sides">
                      Sides
                    </IonSelectOption>
                    <IonSelectOption
                      className="label-dark-mode"
                      value="Desserts"
                    >
                      Desserts
                    </IonSelectOption>
                    <IonSelectOption className="label-dark-mode" value="Snacks">
                      Snacks
                    </IonSelectOption>
                    <IonSelectOption className="label-dark-mode" value="Drinks">
                      Drinks
                    </IonSelectOption>
                    <IonSelectOption
                      className="label-dark-mode"
                      value={null}
                    >
                      All types
                    </IonSelectOption>
                  </IonSelect>
                </div>
              </div>
            </IonCol>

            {/* Additional Filters */}
            <IonCol size="12" sizeMd="12">
              <div className="filter-container">
                {/* Time Filter */}
                <div className="filter-field">
                  <IonIcon icon={timerOutline} size="large" />
                  <IonSelect
                    interface="popover"
                    multiple={false}
                    placeholder="Total time"
                    style={{ padding: 0 }}
                    className="transparent-select"
                    onIonChange={(e) => setTime(Number(e.detail.value))}
                  >
                    <IonSelectOption className="label-dark-mode" value="30">
                      &lt; 30 min
                    </IonSelectOption>
                    <IonSelectOption className="label-dark-mode" value="60">
                      &lt; 60 min
                    </IonSelectOption>
                    <IonSelectOption className="label-dark-mode" value="120">
                      &lt; 120 min
                    </IonSelectOption>
                    <IonSelectOption className="label-dark-mode" value="180">
                      &lt; 180 min
                    </IonSelectOption>
                    <IonSelectOption
                      className="label-dark-mode"
                      value={null}
                    >
                      All recipes
                    </IonSelectOption>
                  </IonSelect>
                </div>

                {/* Favourites Filter */}
                <div className="filter-field">
                  <IonIcon icon={heartOutline} size="large" />
                  <IonSelect
                    interface="popover"
                    multiple={false}
                    placeholder="Favourites"
                    style={{ padding: 0 }}
                    className="transparent-select"
                    onIonChange={(e) => setFavourites(e.detail.value)}
                  >
                    <IonSelectOption className="label-dark-mode" value={true}>
                      Liked
                    </IonSelectOption>
                    <IonSelectOption
                      className="label-dark-mode"
                      value={false}
                    >
                      Disliked
                    </IonSelectOption>
                    <IonSelectOption className="label-dark-mode" value={null}>
                      All recipes
                    </IonSelectOption>
                  </IonSelect>
                </div>
              </div>
              </IonCol>
              
              <IonCol size="12" sizeMd="12">
              <IonButton
                  className="filter-container green-button-gradient"
                  style={{ justifyContent: "center", fontSize: "0.75rem" }}
                  onClick={handleFilter}
              >
                Apply filters
                </IonButton>
              </IonCol>
          </div>
        )}

          {/* Afișare Rețete */}
          <div>
            {nothingFound &&
              <div style={{ textAlign: "center", fontFamily: "Amaranth", fontWeight: "700", fontSize: "1.5rem", marginTop: "20px" }}>
              No Recipe Found
              </div>}
            {!nothingFound && recipes.map((recipe: Recipe) => (
              < RecipeCard
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                difficulty_level={recipe.difficulty}
                time={recipe.time}
                image={recipe.image}
                rating={recipe.rating}
              />
            ))}
          </div>

          <IonInfiniteScroll
            threshold="100px"
            disabled={!hasMore}
            onIonInfinite={handleInfiniteScroll}
          >
            <IonInfiniteScrollContent
              loadingText="Loading more recipes..."
              loadingSpinner="bubbles"
            ></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </div>
      </IonContent>

      <div slot="bottom">
        <Menu />
      </div>
    </IonPage>
  );
};

export default Recipes;
