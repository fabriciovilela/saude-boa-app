import Link from 'next/link';

export default function RecipeItem(props) {
  return (
    <>
      <div className="recipeContainer">
      <Link href={"/recipe/" + props.recipe._id}>
        <div className="recipeHeader">
          <p className="boldFont ligthText">{props.recipe.recipeType && props.recipe.recipeType.typeName ? props.recipe.recipeType.typeName: ""}</p>
        </div>
        <img src="#" alt="" className="recipeItemImage" />
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
                <img src="#" alt="" className="recipeItemBackIcon" />
                <p>{props.recipe.preparationTime? props.recipe.preparationTime + "\nminutos": "Não informado"}</p>
              </div>
              <div className="recipeItemBackContentItem">
                <img src="#" alt="" className="recipeItemBackIcon" />
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
