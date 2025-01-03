import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import SuccessfullyCreatedAccount from "./pages/SuccessfullyCreatedAccount";
import SuccessfullyDeletedAccount from "./pages/SuccessfullyDeletedAccount";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import SetNewPassword from "./pages/SetNewPassword";
import { useEffect } from "react";

setupIonicReact();

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
};

const MainApp: React.FC = () => {
  const { darkMode } = useTheme(); // obtinem valoarea darkMode din context

  // aplicam clasa dark-mode pe body daca darkMode este true
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/recipes">
              <Recipes />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/set-new-password">
              <SetNewPassword />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/successfully-created-account">
              <SuccessfullyCreatedAccount />
            </Route>
            <Route exact path="/successfully-deleted-account">
              <SuccessfullyDeletedAccount />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
