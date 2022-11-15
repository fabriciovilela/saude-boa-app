import RecipeItem from "../recipeItem/recipeItem";

export default function RecipesList(props) {
  return (
    <>
      <div className={"recipesListContainer" + (props.editorVersion ? " editorVersion": "")}>
        {props.firstListElement ? props.firstListElement : <></>}
        {props.recipes && props.recipes.length > 0 ? (
          props.recipes.map((recipe,index)=>{
            return(
              <>
              {props.maxItens == null || props.maxItens && props.maxItens > index ?
                <RecipeItem key={recipe._id} recipe={recipe} changeRecipe={props.changeRecipe}/>
                :
                <></>
              }
              </>
            )
          })
        ):(
          <p className="dontHaveRecipeMessage">Nenhuma receita encontrada</p>
        )
      }
      </div>
    </>
  );
}
