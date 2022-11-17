import Head from "next/head";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import RecipeDetails from "../../components/recipeDetails/recipeDetails";
import axios from "axios";

export default function RecipeIframe(props){
  return (
    <>
      <div className="siteContainer">
        <RecipeDetails recipe={props.recipe} iframe={true}/>
      </div>
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
    .get("http://localhost:8000/recipes/" + context.params.recipeId)
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
      recipe
    },
    revalidate: 60 * 60,
  };
}