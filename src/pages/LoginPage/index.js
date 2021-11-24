import React, { useState } from "react";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/loginActions";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    props.login(email, password);
  };

  return (
    <div className={css.Login}>
      {props.userId ? <Redirect to="/orders" /> : null}
      <input onChange={changeEmail} type="text" placeholder="Имэйл хаяг" />
      <input onChange={changePassword} type="password" placeholder="Нууц үг" />
      {props.firebaseError ? (
        props.firebaseErrorCode === 400 ? (
          <div style={{ color: "red" }}>Нууц үг буруу байна</div>
        ) : null
      ) : null}
      {props.loginIn ? <Spinner /> : null}
      <Button text="ЛОГИН" btnType="Success" daragdsan={login} />
    </div>
  );
};

const matDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.loginUser(email, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    loginIn: state.signupLoginReducer.loginIn,
    firebaseError: state.signupLoginReducer.firebaseError,
    firebaseErrorCode: state.signupLoginReducer.firebaseErrorCode,
    userId: state.signupLoginReducer.userId,
  };
};

export default connect(mapStateToProps, matDispatchToProps)(Login);
