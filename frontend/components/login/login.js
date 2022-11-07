export default function Login() {
  return (
    <>
      <div className="loginColluns">
        <div className="loginPopUp">
          <h1 className="primaryColorText boldFont">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <label className="inputLabel">E-mail:</label>
          <input className="textInput"/>
          <label className="inputLabel">Password:</label>
          <input className="textInput" type="password"/>
          <button className="saveButton">Fazer login</button>
        </div>
        <div className="loginPopUp">
          <h1 className="primaryColorText boldFont">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <label className="inputLabel">Nome:</label>
          <input className="textInput"/>
          <label className="inputLabel">E-mail:</label>
          <input className="textInput"/>
          <label className="inputLabel">Password:</label>
          <input className="textInput" type="password"/>
          <button className="saveButton">Criar novo usuário</button>
        </div>
      </div>
    </>
  );
} 