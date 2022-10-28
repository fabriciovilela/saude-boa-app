export default function RecipeItem() {
  return (
    <>
      <div className="recipeContainer">
      <div className="recipeHeader">
        <p>Tipo de prato</p>
      </div>
      <img src="#" alt="" className="recipeItemImage" />
        <div className="recipeFront">
          <div className="recipeItemFrontContent">
            <p>Categoria do prato</p>
            <h3>Nome do prato</h3>
            <p>
              <b>Autor: </b>Nome exemplo
            </p>
          </div>
        </div>
        <div className="recipeBack">
          <div className="recipeItemBackContent">
            <div className="recipeItemBackContentItem">
              <img src="#" alt="" className="recipeItemBackIcon" />
              <p>Tempo de preparo</p>
            </div>
            <div className="recipeItemBackContentItem">
              <img src="#" alt="" className="recipeItemBackIcon" />
              <p>Rendimento </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}