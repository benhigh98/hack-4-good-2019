import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import DetailsPage from "./pages/DetailsPage";
import EventsPage from "./pages/EventsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  return (
      <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/favorites" component={FavoritesPage} />
          <Route exact path="/details" component={DetailsPage} />
          <Route exact path="/events" component={EventsPage} />
          <Route exact path="/results" component={SearchResultsPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/notifications" component={NotificationsPage} />
      </Switch>
  );
}

export default App;
