import RecipesList from "../recipesList/recipesList";
import IframePopUp from '../iframePopUp/iframePopUp';

export default function RecipeDetails(props) {
  const returnDataString = (date) => {
    const javascriptDate = new Date(date * 1);
    return (
      (javascriptDate.getDay() > 9
        ? javascriptDate.getDay()
        : "0" + javascriptDate.getDay()) +
      "/" +
      (javascriptDate.getMonth() > 9
        ? javascriptDate.getMonth()
        : "0" + javascriptDate.getMonth()) +
      "/" +
      javascriptDate.getFullYear()
    );
  };

  return (
    <>
      <h1 className="recipeTitle primaryColorText boldFont">
        {props.recipe && props.recipe.name ? props.recipe.name : "Sem titulo"}
      </h1>
      <div className="recipeDetailsTwoColluns">
        <div className="recipeDetailsImageContainer">
          <div className="recipeHeader">
            <p className="boldFont ligthText">
              {props.recipe &&
              props.recipe.recipeType &&
              props.recipe.recipeType.typeName
                ? props.recipe.recipeType.typeName
                : ""}
            </p>
          </div>
          <img
            src={props.recipe?._id ? "https://storage.googleapis.com/recipes-photos/" + props.recipe._id + ".jpeg" : "#"}
            alt=""
            className="recipeDetailsItemImage"
          />
        </div>
        <div className="recipeDetailsIntro">
          <h3>
            {props.recipe &&
            props.recipe.recipeCategory &&
            props.recipe.recipeCategory.categoryName
              ? props.recipe.recipeCategory.categoryName
              : ""}
          </h3>
          <div className="recipeDetailsTwoColluns">
            <p>
              <b>Autor: </b>
              {props.recipe &&
              props.recipe.createBy &&
              props.recipe.createBy.name
                ? props.recipe.createBy.name
                : "Desconhecido"}
            </p>
            <p>
              <b>Data de publicação: </b>
              {props.recipe && props.recipe.createDate
                ? returnDataString(props.recipe.createDate)
                : ""}
            </p>
          </div>
          {props.recipe && props.recipe.credit ? (
            <p><b>Fonte: </b>{props.recipe.credit}</p>
          ) : (
            <></>
          )}
          <div className="recipeDetailsTwoColluns small">
            <div className="recipeItemBackContentItem">
              <img
                src="/icons/clock.png"
                alt=""
                className="recipeItemBackIcon"
              />
              <p>
                {props.recipe && props.recipe.preparationTime
                  ? props.recipe.preparationTime + " minutos"
                  : "Não informado"}
              </p>
            </div>
            <div className="recipeItemBackContentItem">
              <img
                src="/icons/yield.png"
                alt=""
                className="recipeItemBackIcon"
              />
              <p>
                {props.recipe && props.recipe.yield
                  ? props.recipe.yield
                  : "Não informado"}
              </p>
            </div>
          </div>
          <p>
            {props.recipe && props.recipe.description
              ? props.recipe.description
              : "Sem descrição"}
          </p>
          {props.iframe ? <></> :
            <IframePopUp iframeId={props.recipe && props.recipe._id
              ? props.recipe._id
              : ""}/>
          }
        </div>
      </div>
      <div className="recipeDetailsTwoColluns">
        <div className="recipeDetailsSection">
          <h3 className="primaryColorText boldFont listSpace">Ingredientes</h3>
          <ul>
            {props.recipe &&
            props.recipe.ingredients &&
            props.recipe.ingredients.length > 0 ? (
              props.recipe.ingredients.map((ingredient, index) => {
                return (
                  <>
                    <li className="ingredientsListItem listSpace" key={index}>
                      {ingredient}
                    </li>
                  </>
                );
              })
            ) : (
              <li>Ingredientes não informados</li>
            )}
          </ul>
        </div>
        <div className="recipeDetailsSection">
          <h3 className="primaryColorText boldFont listSpace">
            Modo de preparo
          </h3>
          <ul>
            {props.recipe &&
            props.recipe.preparation &&
            props.recipe.preparation.length > 0 ? (
              props.recipe.preparation.map((preparation, index) => {
                return (
                  <>
                    <li className="listSpace">
                      <div className="recipeDetailsPreparationModeContainer">
                        <p className="RecipeDetauilsPreparationsBigNumber">
                          {preparation.position}.
                        </p>
                        <p>{preparation.instruction}</p>
                      </div>
                    </li>
                  </>
                );
              })
            ) : (
              <li>Passo a passo não informados</li>
            )}
          </ul>
        </div>
      </div>
      {props.iframe ? (
        <></>
      ) : (
        <>
          <h2 className="primaryColorText boldFont centerFont">Veja também</h2>
          <RecipesList recipes={props.recipes} maxItens={4} />
        </>
      )}
    </>
  );
}
