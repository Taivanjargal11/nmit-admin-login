import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actions from "../../redux/actions/logoutAction";
const Logout = (props) => {
  useEffect(() => {
    props.logout();
  }, []);

  return (
    <div>
      <Redirect to="/" />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
