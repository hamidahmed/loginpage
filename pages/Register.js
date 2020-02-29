import React, { useState } from "react";
import "./Register.css";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "./hooks";

function Register(props) {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      props.history.push("/login");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Welcome</h1>
        <h2>Create an account</h2>
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
            />
          </div>
          <div className="email">
            <label htmlFor="Email"></label>
            <input
              type="text"
              placeholder="Email"
              type="text"
              name="email"
              value={values.email}
              onChange={onChange}
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
            />
          </div>
          <div className="confirmPassword">
            <label htmlFor="confirmPassword"></label>
            <input
              type="text"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={onChange}
            />
          </div>
          <div className="createAccount">
            <button type="submit">Create Account</button>
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
