import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header';

import Container from "./Components/Container";
import CoursesDashboard from './Components/CoursesDashboard';
import LatexTester from './Components/LatexTester';
import Frontpage from './Components/Pages/Frontpage';
import Course from './Components/Pages/Course';
import CreateUser from './Components/Pages/CreateUser';
import Private from './Components/Pages/Private';

function App() {
  const routes = [{
    url: "/",
    name: "Home"
  },
  {
    url: "/latextester",
    name: "Latex tester"
  },
  {
    url: "/create-user",
    name: "Create user"
  }, {
    url: "/private",
    name: "Private"
  }]

  return (
    <div className="App">
      <Header routes={routes}/>
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={Frontpage} />
            <Route path="/learn/" component={Course} />
            <Route path="/kursus/" component={Course} />
            <Route path="/courses">
              <CoursesDashboard />
            </Route>
            <Route path="/latextester">
              <LatexTester />
            </Route>
            <Route path="/create-user">
              <CreateUser />
            </Route>
            <Route>
              <Private />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
