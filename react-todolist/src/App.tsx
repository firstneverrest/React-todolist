import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import TodoListPage from './pages/TodoListPage';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/todo" component={TodoListPage} />
    </Switch>
  );
};

export default App;
