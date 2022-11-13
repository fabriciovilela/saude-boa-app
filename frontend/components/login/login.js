import { useState } from "react";
import { setCookie} from 'nookies';

import axios from "axios";

export default function Login() {
  const [loginForm, setLoginForm] = useState({});
  const [newUser, setNewUser] = useState({});

  const changeLoginValue = (data) => {
    let tempLoginForm = { ...loginForm };
    tempLoginForm[data.target.name] = data.target.value;
    setLoginForm(tempLoginForm);
  };

  const changeNewUserValue = (data) => {
    let tempNewUser = { ...newUser };
    tempNewUser[data.target.name] = data.target.value;
    setNewUser(tempNewUser);
  };

  const tryLogin = async (event) => {
    event.preventDefault();
    const loginResponse = await axios
      .post("http://localhost:8000/authenticate", loginForm)
      .then(function (response) {
        setCookie(null, 'TOKEN', response.data.Token, {
          maxAge: 60 * 60 * 24,
          path: '/',
        });
        setCookie(null, 'USERNAME', response.data.data.name, {
          maxAge: 60 * 60 * 24,
          path: '/',
        });
        window.location.reload(false);
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    
    setLoginForm({});
  };

  const createUser = async(event)=>{
    event.preventDefault();
    const createUserResponse = await axios
    .post("http://localhost:8000/user", newUser)
    .then(function (response) {
      setCookie(null, 'TOKEN', response.data.Token, {
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      setCookie(null, 'USERNAME', response.data.data.name, {
        maxAge: 60 * 60 * 24,
        path: '/',
      });
      window.location.reload(false);
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  
    setNewUser({});
  }

  return (
    <>
      <div className="loginColluns">
        <div className="loginPopUp">
          <h1 className="primaryColorText boldFont">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <form onSubmit={tryLogin}>
            <label className="inputLabel">E-mail:</label>
            <input
              className="textInput"
              id="email"
              name="email"
              value={loginForm.email ? loginForm.email : ""}
              onChange={changeLoginValue}
            />
            <label className="inputLabel">Password:</label>
            <input
              className="textInput"
              type="password"
              id="password"
              name="password"
              value={loginForm.password ? loginForm.password : ""}
              onChange={changeLoginValue}
            />
            <button className="saveButton" type="submit">
              Fazer login
            </button>
          </form>
        </div>
        <div className="loginPopUp">
          <h1 className="primaryColorText boldFont">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <form onSubmit={createUser}>
          <label className="inputLabel">Nome:</label>
          <input
            className="textInput"
            id="name"
            name="name"
            value={newUser.name ? newUser.name : ""}
            onChange={changeNewUserValue}
          />
          <label className="inputLabel">E-mail:</label>
          <input
            className="textInput"
            id="email"
            name="email"
            value={newUser.email ? newUser.email : ""}
            onChange={changeNewUserValue}
          />
          <label className="inputLabel">Password:</label>
          <input
            className="textInput"
            type="password"
            id="password"
            name="password"
            value={newUser.password ? newUser.password : ""}
            onChange={changeNewUserValue}
          />
          <button className="saveButton" type="submit">Criar novo usuário</button>
          </form>
        </div>
      </div>
    </>
  );
}
