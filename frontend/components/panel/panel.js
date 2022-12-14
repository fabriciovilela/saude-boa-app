import { useState } from "react";
import RecipeEditor from "../recipeEditor/recipeEditor";
import RecipesList from "../recipesList/recipesList";

export default function Panel(props) {
  const [editRecipe, setEditRecipe] = useState(null);

  const changeRecipeToEdit = (recipeIndex)=>{
    setEditRecipe(recipeIndex);
  }

  const resetRecipe = ()=>{
    setEditRecipe({recipeCategory: props.categories[0]._id, recipeType: props.types[0]._id});
  }

  return (
    <>
      <div className="panelColluns">
        <div>
          <h2 className="primaryColorText boldFont">Minhas receitas</h2>
          <RecipesList
            recipes={props.recipes}
            editorVersion={true}
            changeRecipe={changeRecipeToEdit}
          />
          {props.currentPage != -1 &&
            <div className="homeMoreItensButton" onClick={props.takeMoreRecipes}>Ver mais receitas</div>
          }
        </div>
        <div>
            <h2 className="primaryColorText boldFont">{editRecipe? "Editar receita:":"Adicionar nova receita:"}</h2>
          <RecipeEditor editRecipe={editRecipe} categories={props.categories} types={props.types} resetRecipe={resetRecipe} token={props.token}/>
        </div>
      </div>
    </>
  );
}
