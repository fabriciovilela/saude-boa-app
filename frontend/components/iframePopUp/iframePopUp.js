export default function IframePopUp(){
    const iframeString = String(<iframe src="http://localhost:3000/recipe-iframe/636a9fd2ec9c6d5708219d75" style={{height:"500px",width:"100%", border:"14px #db7018 solid", margin:"24px auto", borderRadius:"10px", boxSizing:"border-box",}}></iframe>).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    
    return(
        <>
            <div className="iframeButton">Compartilhar receita no meu site!</div>
            <div className="iframePopUp">
                <h2>Copie o código abaixo e cole no seu site ou blog para compartilhhar esta receita</h2>
                <pre>
                    {iframeString}
                </pre>
            </div>
        </>
        // <iframe src="http://localhost:3000/recipe-iframe/636a9fd2ec9c6d5708219d75" style={{height:"500px",width:"100%", border:"14px #db7018 solid", margin:"24px auto", borderRadius:"10px", boxSizing:"border-box",}}></iframe>
    )
}