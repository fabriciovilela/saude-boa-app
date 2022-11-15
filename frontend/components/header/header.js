import Link from "next/link";
import HeaderMenu from "./headerMenu";
import { parseCookies, destroyCookie  } from "nookies";
import { useEffect, useState } from "react";

export default function Header(props) {
  const [cookies, setCookies] = useState({});

  useEffect(()=>{
    setCookies(parseCookies());
  },[])

  const logout = ()=>{
    destroyCookie(null, 'TOKEN');
    destroyCookie(null, 'USERNAME');
    window.location.reload(false);
  }

  return (
    <>
      <div className="header">
        <div className="headerFristSection">
          <div className="headerContainer siteContainer">
            <Link href={"/"}>
              <img src="/logo.png" alt="" className="headerLogotipo" />
            </Link>
            <div>
              {cookies.TOKEN ? (
                <div className="headerCurrentUserName">
                  <p className="ligthText">
                    Bem vindo(a) 
                    <b className="boldFont ligthText"> {cookies.USERNAME}</b>
                  </p>
                  <div className="headerLoginButton" onClick={logout}>
                  <img src="/icons/logout.png" alt="" className="headerLoginButtonImage" />
                  <p className="boldFont ligthText">Deslogar</p>
                </div>
                </div>
              ) : (
                <Link href={"/panel"}>
                <div className="headerLoginButton login">
                  <p className="boldFont ligthText">Logar</p>
                </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="headerMenuContainer">
          <HeaderMenu categories={props.categories} types={props.types} cookies={cookies} />
        </div>
      </div>
    </>
  );
}
