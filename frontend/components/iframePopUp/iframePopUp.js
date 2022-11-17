import { useState } from "react";
import usePreventScroll from '../../hooks/preventScroll';

export default function IframePopUp(props) {
  const iframeString = process.env.NEXT_PUBLIC_FRONTEND_LINK + "/recipe-iframe/" + props.iframeId;
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);
  const preventScrollOnPopUp = usePreventScroll();

  let copyText = () => {
    const codeToCopy = `<iframe src="${iframeString}" style="height:500px;width:100%; border:14px #db7018 solid;, margin:24px auto;borderRadius:10px;boxSizing:border-box;"></iframe>`;
    let inputTest = document.createElement("input");
    inputTest.value = codeToCopy;
    document.body.appendChild(inputTest);
    inputTest.select();
    document.execCommand('copy');
    document.body.removeChild(inputTest);
};

const openPopUp = ()=>{
    preventScrollOnPopUp.blockScroll();
    setPopUpIsOpen(true)
}

const closePopUp = ()=>{
    preventScrollOnPopUp.allowScroll();
    setPopUpIsOpen(false)
}

  return (
    <>
      <div className="iframeButton" onClick={openPopUp}>Compartilhar receita no meu site!</div>
      {popUpIsOpen ? (
        <>
          <div className="iframeBackground" onClick={closePopUp}/>
          <div className="iframePopUp">
            <h2 className="primaryColorText boldFont">
              Copie o código abaixo e cole no seu site ou blog para
              compartilhhar esta receita
            </h2>
            <pre className="copyRecipeIframe" onClick={copyText}>
              {String(
                `<iframe src="${iframeString}" style="height:500px;width:100%; border:14px #db7018 solid;, margin:24px auto;borderRadius:10px;boxSizing:border-box;"></iframe>`
              )}
              <br />
              <span className="yellow">Click aqui para copiar</span>
            </pre>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
