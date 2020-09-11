import React from 'react';
// import { Switch,Route,} from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Questions from '../components/Questions';
import QuestionDetails from '../components/QuestionDetails';
import CreateQuestion from '../components/CreateQuestion';
import UpdateQuestion from '../components/UpdateQuestion';

export default () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Questions} />
          <Route exact path="/questions/new" component={CreateQuestion} />
          <Route exact path="/questions/:id" component={QuestionDetails} />
          <Route exact path="/questions/:id/edit" component={UpdateQuestion} />
        </Switch>
    </Router>
  );
}