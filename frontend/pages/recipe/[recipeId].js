import Head from "next/head";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import RecipeDetails from "../../components/recipeDetails/recipeDetails";
import axios from "axios";

export default function RecipePage(props) {
  return (
    <>
      <Head>
        <title>Receitas inclusivas</title>
        <meta
          name="description"
          content="Culinaria deliciosa para você e sua familia!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header categories={props.categories} types={props.types} />
      <div className="headerOverlayFix" />
      <div className="siteContainer">
        <RecipeDetails recipe={props.recipe} recipes={props.recipes} />
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const recipe = await axios
    .get(process.env.NEXT_PUBLIC_BACKEND_LINK + "/recipes/" + context.params.recipeId)
    .then(function (response) {
      return response.data;
    })
    .catch(() => {
      return {
        notFound: true,
      };
    });
  let recipes = [];

  if (recipe._id) {
    recipes = await axios
      .get(process.env.NEXT_PUBLIC_BACKEND_LINK + "/recipes/filter/" + recipe.recipeCategory._id + "/" + recipe.recipeType._id,{
        params: { page: 1, perPage: 4 },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(() => {
        return {
          notFound: true,
        };
      });
  }

  const categories = await axios
    .get(process.env.NEXT_PUBLIC_BACKEND_LINK + "/category")
    .then(function (response) {
      return response.data;
    })
    .catch(() => {
      return {
        notFound: true,
      };
    });

  const types = await axios
    .get(process.env.NEXT_PUBLIC_BACKEND_LINK + "/type")
    .then(function (response) {
      return response.data;
    })
    .catch(() => {
      return {
        notFound: true,
      };
    });

  return {
    props: {
      recipe,
      recipes,
      categories,
      types,
    },
    revalidate: 60 * 60,
  };
}
