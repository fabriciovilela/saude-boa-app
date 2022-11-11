import Link from "next/link";
import HeaderMenu from "./headerMenu";

export default function Header(props) {
  return (
    <>
      <div className="header">
        <div className="headerFristSection">
          <div className="headerContainer siteContainer">
            <Link href={"/"}>
              <img src="#" alt="" className="headerLogotipo" />
            </Link>
            <div>
              <div className="headerLoginButton">
                <img src="#" alt="" className="headerLoginButtonImage" />
                <p className="boldFont ligthText">Logar</p>
              </div>
              {/*<div className="headerCurrentUserName">
                <p className="ligthText">
                  Bem vindo(a){" "}
                  <b className="boldFont ligthText">Nome do usuario</b>
                </p>
              </div>*/}
            </div>
          </div>
        </div>
        <div className="headerMenuContainer">
          <HeaderMenu categories={props.categories} types={props.types}/>
        </div>
      </div>
      <div className="headerOverlayFix" />
    </>
  );
}
