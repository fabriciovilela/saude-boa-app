import Link from 'next/link';

export default function RecipeItem(props) {
  const changeRecipe = ()=>{
    if(props.changeRecipe){
      props.changeRecipe(props.recipe);
    }
  }
  return (
    <>
      <div className="recipeContainer">
      <Link href={props.changeRecipe ? "/panel" : "/recipe/" + props.recipe._id} onClick={changeRecipe}>
        <div className="recipeHeader">
          <p className="boldFont ligthText">{props.recipe.recipeType && props.recipe.recipeType.typeName ? props.recipe.recipeType.typeName: ""}</p>
        </div>
        <img src={props.recipe?._id ? "https://storage.googleapis.com/recipes-photos/" + props.recipe._id + ".jpeg" : "#"} alt="" className="recipeItemImage" />
        <div className="recipeInfosPosition">
          <div className="recipeFront">
            <div className="recipeItemFrontContent">
              <p>{props.recipe.recipeCategory && props.recipe.recipeCategory.categoryName ? props.recipe.recipeCategory.categoryName: ""}</p>
              <h3 className="primaryColorText boldFont">{props.recipe.name? props.recipe.name: ""}</h3>
              <p>
                <b>Autor: </b>{props.recipe.createBy && props.recipe.createBy.name ? props.recipe.createBy.name: "Desconhecido"}
              </p>
            </div>
          </div>
          <div className="recipeBack">
            <div className="recipeItemBackContent">
              <div className="recipeItemBackContentItem">
                <img src="/icons/clock.png"  alt="" className="recipeItemBackIcon" />
                <p>{props.recipe.preparationTime? props.recipe.preparationTime + "\nminutos": "Não informado"}</p>
              </div>
              <div className="recipeItemBackContentItem">
                <img src="/icons/yield.png" alt="" className="recipeItemBackIcon" />
                <p>{props.recipe.yield? props.recipe.yield: "Não informado"}</p>
              </div>
            </div>
          </div>
        </div>
        </Link>
      </div>
    </>
  );
}
