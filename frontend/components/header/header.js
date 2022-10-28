import HeaderMenu from "./headerMenu";

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="headerFristSection">
          <div className="headerContainer siteContainer">
            <img src="#" alt="" className="headerLogotipo" />
            <div>
              <div className="headerLoginButton">
                <img src="#" alt="" className="headerLoginButtonImage" />
                <p>Logar</p>
              </div>
              <div className="headerCurrentUserName">
                <p>
                  Bem vindo(a) <b>Nome do usuario</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="headerMenuContainer">
          <HeaderMenu />
        </div>
      </div>
      <div className="headerOverlayFix"/>
    </>
  );
}
