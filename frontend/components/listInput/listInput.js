export default function ListInput(){
    return(
    <>
        <div className="listInputItem">
            <input className="textInput"/>
            <button className="listInputDeleteButton">Deletar</button>
        </div>
        <button className="listInputAddItemButton">Adicionar novo item</button>
    </>
    )
}