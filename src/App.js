import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header';

import Container from "./Components/Container";
import Chatbot from './Components/Chatbot';
import CoursesDashboard from './Components/CoursesDashboard';
import LatexTester from './Components/LatexTester';
import Frontpage from './Components/Pages/Frontpage';
import Course from './Components/Pages/Course';

function App() {
  const routes = [{
    url: "/",
    name: "Home"
  }, {
    url: "/courses",
    name: "Courses"
  },
  {
    url: "/latextester",
    name: "Latex tester"
  }]

  return (
    <div className="App">
      <Header routes={routes}/>
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={Frontpage} />
            <Route path="/learn/" component={Course} />
            <Route path="/courses">
              <CoursesDashboard />
            </Route>
            <Route path="/latextester">
              <LatexTester />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
