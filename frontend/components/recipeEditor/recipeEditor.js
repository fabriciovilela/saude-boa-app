import { useEffect, useState } from "react";
import ListInput from "../listInput/listInput";
import axios from "axios";
import { parseCookies } from "nookies";
import useImage64 from "../../hooks/image64";

export default function RecipeEditor(props) {
  const [recipe, setRecipe] = useState({});
  const [cookies, setCookies] = useState({});

  const imageConverter = useImage64();

  useEffect(() => {
    setCookies(parseCookies());
  }, []);
  const changeRecipeInput = (data) => {
    let tempRecipe = { ...recipe };
    tempRecipe[data.target.name] = data.target.value;
    setRecipe(tempRecipe);
  };

  useEffect(() => {
    setRecipe({
      ...props.editRecipe,
      recipeType: props.editRecipe?.recipeType?._id
        ? props.editRecipe.recipeType._id
        : null,
      recipeCategory: props.editRecipe?.recipeCategory?._id
        ? props.editRecipe.recipeCategory._id
        : null,
    });
  }, [props.editRecipe]);

  const pressSaveButton = () => {
    if (recipe._id) {
      saveEditRecipe();
    } else {
      createNewRecipe();
    }
  };

  const saveEditRecipe = async () => {
    await axios
      .put("http://localhost:8000/recipes/" + recipe._id,recipe, {
        params: { token: cookies.TOKEN },
      })
      .then(function () {
        window.location.reload(false);
      });
  };

  const createNewRecipe = async() => {
    await axios
    .post("http://localhost:8000/recipes",recipe, {
      params: { token: cookies.TOKEN },
    })
    .then(function () {
      window.location.reload(false);
    });
  };

  const addNewRecipe = () => {
    props.resetRecipe();
  };

  return (
    <>
    <form onSubmit={pressSaveButton}>
      <label className="inputLabel">Nome da receita:</label>
      <input
        className="textInput"
        id="name"
        name="name"
        required={true}
        value={recipe.name ? recipe.name : ""}
        onChange={changeRecipeInput}
      />
      <label className="inputLabel">Imagem da receita:</label>
      <input
        class="textInput"
        id="image"
        name="image"
        type="file"
        accept="image/png, image/jpeg"
        multiple={false}
        value={recipe.image ? "" : undefined}
        onChange={async (event) => changeRecipeInput({target: {name: "image", value: await imageConverter.imageToString(event.target.files[0])}})}
      />
      <img className="formImage" src={recipe.image ? recipe.image : ""}/>
      <label className="inputLabel">Descrição da receita:</label>
      <textarea
        className="textInput"
        id="description"
        name="description"
        value={recipe.description ? recipe.description : ""}
        required={true}
        onChange={changeRecipeInput}
      />
      <label className="inputLabel">Creditos / Fonte da receita:</label>
      <input
        className="textInput"
        id="credit"
        name="credit"
        value={recipe.credit ? recipe.credit : ""}
        onChange={changeRecipeInput}
      />
      <label className="inputLabel">Tempo de preparo:</label>
      <input
        className="textInput"
        type="number"
        id="preparationTime"
        name="preparationTime"
        required={true}
        value={recipe.preparationTime ? recipe.preparationTime : ""}
        onChange={changeRecipeInput}
      />
      <label className="inputLabel">Rendimento:</label>
      <input
        className="textInput"
        id="yield"
        name="yield"
        required={true}
        value={recipe.yield ? recipe.yield : ""}
        onChange={changeRecipeInput}
      />
      <label className="inputLabel">Tipo de receita:</label>
      <select
        className="textInput"
        id="recipeType"
        name="recipeType"
        required={true}
        value={recipe.recipeType ? recipe.recipeType : ""}
        onChange={changeRecipeInput}
      >
        {props.types ? (
          props.types.map((type) => {
            return (
              <option key={type._id} value={type._id}>
                {type.typeName}
              </option>
            );
          })
        ) : (
          <></>
        )}
      </select>
      <label className="inputLabel">Categoria de receita:</label>

      <select
        className="textInput"
        id="recipeCategory"
        name="recipeCategory"
        required={true}
        value={recipe.recipeCategory ? recipe.recipeCategory : ""}
        onChange={changeRecipeInput}
      >
        {props.categories ? (
          props.categories.map((type) => {
            return (
              <option key={type._id} value={type._id}>
                {type.categoryName}
              </option>
            );
          })
        ) : (
          <></>
        )}
      </select>

      <label className="inputLabel">Ingredientes:</label>
      <ListInput
        value={recipe.ingredients ? recipe.ingredients : []}
        changeRecipeInput={changeRecipeInput}
        target="ingredients"
      />
      <label className="inputLabel">Modo de preparo:</label>
      <ListInput
        value={recipe.preparation ? recipe.preparation : []}
        preparation={true}
        changeRecipeInput={changeRecipeInput}
        target="preparation"
      />
      <button className="saveButton" type="submit">
        {props.editRecipe ? "Salvar receita" : "Adicionar nova receita"}
      </button>
      </form>
      <div className="floatButton" onClick={addNewRecipe}>
        + Adicionar Receita
      </div>
    </>
  );
}
