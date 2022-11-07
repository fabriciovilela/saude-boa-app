import RecipeEditor from "../recipeEditor/recipeEditor";
import RecipesList from "../recipesList/recipesList";

export default function Panel() {
  return (
    <>
      <div className="panelColluns">
        <div>
          <h2 className="primaryColorText boldFont">Minhas receitas</h2>
          <RecipesList
            recipes={[
              0, 0, 0, 0
            ]}
            editorVersion={true}
          />
        </div>
        <div>
            <h2 className="primaryColorText boldFont">Editar receita</h2>
          <RecipeEditor />
        </div>
      </div>
    </>
  );
}
