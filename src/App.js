import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header';
import { connect } from 'react-redux';

import CoursesDashboard from './Components/CoursesDashboard';
import LatexTester from './Components/LatexTester';
import Frontpage from './Components/Pages/Frontpage';
import Course from './Components/Pages/Course';
import CreateUser from './Components/Pages/CreateUser';
import AccountFrontpage from './Components/Pages/Account/FrontPage';
import AccountEditUser from './Components/Pages/Account/EditUser';
import CurrentCourses from './Components/Pages/Account/CurrentCourses';
import Subjects from './Components/Pages/Subjects';
import PasswordResetRequest from './Components/Pages/PasswordResetRequest';
import PasswordReset from './Components/Pages/PasswordReset';
import VerificationRequest from './Components/Pages/VerificationRequest';
import Verification from './Components/Pages/Verification';

function App(props) {
  const { loggedIn } = props;
  const routes = [{
    url: "/subjects",
    name: "Subjects"
  }]

  return (
    <div className="App">
      <Header routes={routes}/>
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
            <Route path="/subjects">
              <Subjects />
            </Route>
            {loggedIn ? (
            <React.Fragment>
              {/* <Route exact path="/account">
                <AccountFrontpage />
              </Route> */}
              <Route exact path="/account/courses">
                <CurrentCourses />
              </Route>
              <Route exact path="/account/edit/user">
                <AccountEditUser />
              </Route>
            </React.Fragment>
            ) : null}
          </Switch>
        </Router>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.users.loggedIn
})

export default connect(mapStateToProps)(App);
