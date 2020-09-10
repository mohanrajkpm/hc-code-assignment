import React from 'react';
// import { Switch,Route,} from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Questions from '../components/Questions';
import QuestionDetails from '../components/QuestionDetails';
import CreateQuestion from '../components/CreateQuestion';
import UpdateQuestion from '../components/UpdateQuestion';

export default () => {
  return (
    <Router>
      <Route exact path="/">
        <Questions />
      </Route>
      <Route
        path="/questions/:id"
        exact
        component={QuestionDetails}
       />
      <Route
        path="/questions/new"
        exact
        component={CreateQuestion}
      />
      <Route
        path="/questions/:id/edit"
        exact
        component={UpdateQuestion}
      />
    </Router>
  );
}