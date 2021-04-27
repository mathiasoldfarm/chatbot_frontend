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
import Subjects from './Components/Pages/Subjects';
import PasswordResetRequest from './Components/Pages/PasswordResetRequest';
import PasswordReset from './Components/Pages/PasswordReset';
import VerificationRequest from './Components/Pages/VerificationRequest';
import Verification from './Components/Pages/Verification';

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
  }, {
    url: "/emner",
    name: "Emner"
  }, {
    url: "/reset-password",
    name: "Reset password"
  }, {
    url: "/verify",
    name: "Verify account"
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
            <Route exact path="/reset-password">
              <PasswordResetRequest />
            </Route>
            <Route exact path="/verify">
              <VerificationRequest />
            </Route>
            <Route path="/reset-password/:userId/:verificationCode" component={PasswordReset} />
            <Route path="/verify/:userId/:verificationCode" component={Verification} />
            <Route>
              <Subjects />
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
