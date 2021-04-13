import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header';
import { connect } from 'react-redux';

import Container from "./Components/Container";
import CoursesDashboard from './Components/CoursesDashboard';
import LatexTester from './Components/LatexTester';
import Frontpage from './Components/Pages/Frontpage';
import Course from './Components/Pages/Course';
import CreateUser from './Components/Pages/CreateUser';
import AccountFrontpage from './Components/Pages/Account/FrontPage';
import AccountEditUser from './Components/Pages/Account/EditUser';

function App(props) {
  const { loggedIn } = props;
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
            {loggedIn ? (
            <React.Fragment>
              <Route exact path="/account">
                <AccountFrontpage />
              </Route>
              <Route exact path="/account/edit/user">
                <AccountEditUser />
              </Route>
            </React.Fragment>
            ) : null}
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.users.loggedIn
})

export default connect(mapStateToProps)(App);
