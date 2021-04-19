import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {observer} from "mobx-react";
import {Redirect, Route, Switch} from 'react-router';
import './App.css';
import './network.css';
import {ROUTES} from './routes';
import {DijkstraPage} from './pages/DijkstraPage/DijkstraPage';
import {NetworkModelsPage} from './pages/NetworkModelsPage/NetworkModelsPage';

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="nav">
          <NavLink
            to={ROUTES.network}
            className="link"
            activeClassName="link__active"
          >
            Сетевые модели
          </NavLink>

          <NavLink
            to={ROUTES.dijkstra}
            className="link"
            activeClassName="link__active"
          >
            Дейкстра
          </NavLink>
        </nav>

        <Switch>
          <Route
            exact
            path={ROUTES.dijkstra}
            component={DijkstraPage}
          />

          <Route
            path={ROUTES.network}
            component={NetworkModelsPage}
          />

          <Redirect to={ROUTES.network} />
        </Switch>
      </div>
    );
  }
}

export default App;
