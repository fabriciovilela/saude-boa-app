import RecipesList from "../recipesList/recipesList";

export default function RecipeDetails() {
  return (
    <>
      <h1 className="recipeTitle primaryColorText boldFont">Titulo de teste</h1>
      <div className="recipeDetailsTwoColluns">
        <img src="#" alt="" className="recipeDetailsItemImage" />
        <div className="recipeDetailsIntro">
          <h3>Categoria do prato</h3>
          <div className="recipeDetailsTwoColluns">
            <p>
              <b>Autor: </b>Nome exemplo
            </p>
            <p>
              <b>Data de publicação: </b>Data exemplo
            </p>
          </div>
          <div className="recipeDetailsTwoColluns small">
            <div className="recipeItemBackContentItem">
              <img src="#" alt="" className="recipeItemBackIcon" />
              <p>Tempo de preparo</p>
            </div>
            <div className="recipeItemBackContentItem">
              <img src="#" alt="" className="recipeItemBackIcon" />
              <p>Rendimento </p>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque elementum augue eget lacinia ultrices. Vestibulum in
            mauris leo. Nunc finibus tortor nec ipsum luctus tristique. Aliquam
            faucibus efficitur lorem vel tempor. Donec tempus facilisis orci, et
            pellentesque ipsum varius quis. Duis accumsan, tellus a lobortis
            finibus, enim sem pellentesque elit, ac varius nibh urna in quam.
            Nulla lacinia, elit ut tristique hendrerit, nulla massa auctor
            felis, vel dignissim nisl leo et nisl.
          </p>
        </div>
      </div>
      <div className="recipeDetailsTwoColluns">
        <div className="recipeDetailsSection">
          <h3 className="primaryColorText boldFont">Ingredientes</h3>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
          </ul>
        </div>
        <div className="recipeDetailsSection">
          <h3 className="primaryColorText boldFont">Modo de preparo</h3>
          <ul>
            <li>
              <div className="recipeDetailsPreparationModeContainer">
                <p className="RecipeDetauilsPreparationsBigNumber">1.</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque elementum augue eget lacinia ultrices. Vestibulum
                  in mauris leo. Nunc finibus tortor nec ipsum luctus tristique.
                  Aliquam faucibus efficitur lorem vel tempor. Donec tempus
                  facilisis orci, et pellentesque ipsum varius quis. Duis
                  accumsan, tellus a lobortis finibus, enim sem pellentesque
                  elit, ac varius nibh urna in quam. Nulla lacinia, elit ut
                  tristique hendrerit, nulla massa auctor felis, vel dignissim
                  nisl leo et nisl.
                </p>
                <p className="RecipeDetauilsPreparationsBigNumber">2.</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque elementum augue eget lacinia ultrices. Vestibulum
                  in mauris leo. Nunc finibus tortor nec ipsum luctus tristique.
                  Aliquam faucibus efficitur lorem vel tempor. Donec tempus
                  facilisis orci, et pellentesque ipsum varius quis. Duis
                  accumsan, tellus a lobortis finibus, enim sem pellentesque
                  elit, ac varius nibh urna in quam. Nulla lacinia, elit ut
                  tristique hendrerit, nulla massa auctor felis, vel dignissim
                  nisl leo et nisl.
                </p>
                <p className="RecipeDetauilsPreparationsBigNumber">3.</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque elementum augue eget lacinia ultrices. Vestibulum
                  in mauris leo. Nunc finibus tortor nec ipsum luctus tristique.
                  Aliquam faucibus efficitur lorem vel tempor. Donec tempus
                  facilisis orci, et pellentesque ipsum varius quis. Duis
                  accumsan, tellus a lobortis finibus, enim sem pellentesque
                  elit, ac varius nibh urna in quam. Nulla lacinia, elit ut
                  tristique hendrerit, nulla massa auctor felis, vel dignissim
                  nisl leo et nisl.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <p>Veja também</p>
      <RecipesList recipes={[0, 0, 0, 0]} maxItens={4} />
    </>
  );
}
