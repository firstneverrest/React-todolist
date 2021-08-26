import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import TodoListPage from './pages/TodoListPage';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/todo" component={TodoListPage} />
      <Route exact path="*" component={NotFound} />
    </Switch>
  );
};

export default App;
