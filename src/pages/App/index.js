import React, { Component, useState, useEffect } from "react";
import css from "./style.module.css";

// import Toolbar from "../../components/Toolbar";
// import BurgerPage from "../BurgerPage";

// import OrderPage from "../OrderPage";
import { Route, Switch } from "react-router-dom";
// import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import { connect } from "react-redux";
import Logout from "../../components/Logout";
import { Redirect } from "react-router-dom";
import * as actions from "../../redux/actions/loginActions";
import * as logoutActions from "../../redux/actions/logoutAction";
import AdminPage from "../AdminPage";
import Toolbar from "../../components/Toolbar";
const App = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSideBar = () => {
    setShowSidebar((prevState) => !prevState);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");
    {
      if (token) {
        if (expireDate > new Date()) {
          props.autoLogin(token, userId);
          props.autoLogout(expireDate.getTime - new Date().getTime());
        } else {
          props.logout();
        }
      }
    }
  }, []);

  return (
    <div>
      <Toolbar />

      {/* <SideBar showSidebar={showSidebar} toggleSideBar={toggleSideBar} /> */}

      <main className={css.Content}>
        {props.userId ? (
          <Switch>
            {/* <Route path="/logout" component={Logout} />
            <Route path="/orders" component={OrderPage} />
            <Route path="/ship" component={ShippingPage} />
            <Route path="/" component={BurgerPage} /> */}
            <Route path="/logout" component={Logout} />
            <Route path="/" component={AdminPage} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Redirect to="/login" />
          </Switch>
        )}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.signupLoginReducer.userId,
    token: state.signupLoginReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (token, userId) =>
      dispatch(actions.loginUserSuccess(token, userId)),

    logout: () => dispatch(logoutActions.logout()),
    autoLogout: () => dispatch(logoutActions.autoLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
