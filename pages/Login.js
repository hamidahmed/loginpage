import React, { useState } from "react";
import "./Login.css";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "./hooks";
import { Link } from "react-router-dom";
import "../components/MenuBar.js";

function Login(props) {
  const pathname = window.location.pathname;

  const path = pathname === "/login" ? "login" : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: ""
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1></h1>
        <h2>Login</h2>
        <form onSubmit={onSubmit} noValidate>
          <div className="firstName">
            <label htmlFor="Username"></label>
            <input
              type="text"
              placeholder="Username"
              type="text"
              name="username"
              value={values.username}
              onChange={onChange}
              error={errors.username ? true : false}
            />
          </div>
          <div className="Password">
            <label htmlFor="Password"></label>
            <input
              type="text"
              placeholder="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={onChange}
              error={errors.password ? true : false}
            />
          </div>
          <div className="createAccount">
            <button type="submit">Login</button>
          </div>
          <div className="registerAccount">
            <h1 className="noaccount">Don't have an account?</h1>
            <h2
              className="accountcreate"
              name="register"
              active={activeItem === "register"}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            >
              Create an account
            </h2>
          </div>
        </form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map(value => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
