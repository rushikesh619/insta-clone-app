import React, { Component } from "react";
import "../LoginPage/LoginPage.css";
import axios from "axios";

class SignIN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  login = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post("/api/users/login", data).then((response) => {
      if (response.data) {
        console.log(response.data.user);
        if (response.data.user) {
          for (const i in response.data) {
            localStorage.setItem(i, JSON.stringify(response.data[i]));
          }
          window.location.replace("/home");
        }
      }
    });
    window.replace();
  };

  render() {
    return (
      <div>
        <input
          className="logipage__text"
          onChange={(event) => {
            this.setState({ username: event.currentTarget.value });
          }}
          type="text"
          placeholder="username"
        />
        <input
          className="logipage__text"
          onChange={(event) => {
            this.setState({ password: event.currentTarget.value });
          }}
          type="password"
          placeholder="Password"
        />
        <button className="login__button" onClick={this.login}>
          Log In
        </button>
      </div>
    );
  }
}

export default SignIN;
