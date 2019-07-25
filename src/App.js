import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import CreateLink from "./components/CreateLink";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Search from "./components/Search";
import LinkList from "./components/LinkList";
import LinkDetail from "./components/LinkDetail";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/new/1" />} />
      <Route path="/create" component={CreateLink} />
      <Route path="/login" component={Login} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/search" component={Search} />
      <Route path="/top" component={LinkList} />
      <Route path="/new/:page" component={LinkList} />
      <Route path="/link/:linkId" component={LinkDetail} />
    </Switch>
  </Router>
);

export default App;
