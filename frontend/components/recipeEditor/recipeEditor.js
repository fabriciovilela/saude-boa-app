import ListInput from "../listInput/listInput";

export default function RecipeEditor() {
  return (
    <>
      <label className="inputLabel">Nome da receita:</label>
      <input className="textInput" />
      <label className="inputLabel">Descrição da receita:</label>
      <textarea className="textInput" />
      <label className="inputLabel">Tempo de preparo:</label>
      <input className="textInput" />
      <label className="inputLabel">Rendimento:</label>
      <input className="textInput" />
      <label className="inputLabel">Tipo de receita:</label>
      <select name="Tipo" className="textInput">
        <option value="0">Teste</option>
      </select>
      <label className="inputLabel">Categoria de receita:</label>
      <select name="Tipo" className="textInput">
        <option value="0">Teste</option>
      </select>
      <label className="inputLabel">Ingredientes:</label>
      <ListInput/>
      <label className="inputLabel">Modo de preparo:</label>
      <ListInput/>
      <button className="saveButton">Salvar receita</button>
    </>
  );
}
