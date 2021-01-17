import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../views/home";
import Game from "../views/game";
import Settings from "../views/settings";

export default function Routes() {
  return (
    <Switch>

      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/settings/:gameType">
        <Settings />
      </Route>
      <Route path="/game/:gameType/:primaryKey">
        <Game />
      </Route>
    </Switch>
  );
}
