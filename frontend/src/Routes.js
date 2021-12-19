import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Home from "./containers/Home";
import Team from "./containers/Team";
import User from "./containers/User";
import NewUser from "./containers/NewUser";
import NotFound from "./containers/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/team" element={<Team />} />
      <Route exact path="/team/:id" element={<User />} />
      <Route exact path="/team/new" element={<NewUser />} />
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}