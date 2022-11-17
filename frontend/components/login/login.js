import { useState } from "react";
import { setCookie } from "nookies";
import Link from "next/link";

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
      .post(process.env.NEXT_PUBLIC_BACKEND_LINK + "/authenticate", loginForm)
      .then(function (response) {
        setCookie(null, "TOKEN", response.data.Token, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
        setCookie(null, "USERNAME", response.data.data.name, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
        window.location.reload(false);
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });

    setLoginForm({});
  };

  const createUser = async (event) => {
    event.preventDefault();
    const createUserResponse = await axios
      .post(process.env.NEXT_PUBLIC_BACKEND_LINK + "/user", newUser)
      .then(function (response) {
        setCookie(null, "TOKEN", response.data.Token, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });

        setCookie(null, "USERNAME", response.data.data.name, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
        window.location.reload(false);
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });

    setNewUser({});
  };

  return (
    <>
      <div className="loginColluns">
        <div className="loginPopUp">
          <h1 className="primaryColorText boldFont">Fazer Login</h1>
          <h2>Acesse seu espaço para editar e acrescentar receitas aqui</h2>
          <form onSubmit={tryLogin}>
            <label className="inputLabel">E-mail:</label>
            <input
              className="textInput"
              id="email"
              name="email"
              value={loginForm.email ? loginForm.email : ""}
              onChange={changeLoginValue}
              required={true}
            />
            <label className="inputLabel">Password:</label>
            <input
              className="textInput"
              type="password"
              id="password"
              name="password"
              value={loginForm.password ? loginForm.password : ""}
              required={true}
              onChange={changeLoginValue}
            />
            <button className="saveButton" type="submit">
              Fazer login
            </button>
          </form>
        </div>
        <div className="loginPopUp">
          <h1 className="primaryColorText boldFont">Cadastre-se aqui</h1>
          <h2>
            Bem-vindo ao Saúde Boa Receitas! Faça seu cadastro agora de forma
            simples e já comece a compartilhar suas receitas!
          </h2>
          <form onSubmit={createUser}>
            <label className="inputLabel">Nome:</label>
            <input
              className="textInput"
              id="name"
              name="name"
              value={newUser.name ? newUser.name : ""}
              onChange={changeNewUserValue}
              required={true}
            />
            <label className="inputLabel">E-mail:</label>
            <input
              className="textInput"
              id="email"
              name="email"
              value={newUser.email ? newUser.email : ""}
              onChange={changeNewUserValue}
              required={true}
            />
            <label className="inputLabel">Password:</label>
            <input
              className="textInput"
              type="password"
              id="password"
              name="password"
              value={newUser.password ? newUser.password : ""}
              onChange={changeNewUserValue}
              required={true}
            />
            <div className="acceptInput">
              <input
                type="checkbox"
                id="accept"
                name="accept"
                value={false}
                required={true}
              ></input>
              <p>
                Aceitar os {" "}
                <a target="_blank" href="/termsofuse" rel="noopener noreferrer">
                  <b className="primaryColorText boldFont">Termos de uso</b>
                </a>
              </p>
            </div>
            <button className="saveButton" type="submit">
              Criar novo usuário
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
