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
import Courses from './Components/Courses';

function App() {
  const routes = [{
    url: "/",
    name: "Chatbot"
  }, {
    url: "/courses",
    name: "Courses"
  }]

  return (
    <div className="App">
      <Header routes={routes}/>
      <Container>
        <Router>
          <Switch>
            <Route exact path="/">
              <Chatbot />
            </Route>
            <Route path="/courses">
              <Courses />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
