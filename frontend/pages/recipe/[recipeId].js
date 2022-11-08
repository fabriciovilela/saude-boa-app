import Head from "next/head";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import RecipeDetails from "../../components/recipeDetails/recipeDetails";
import axios from 'axios';

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
      <Header/>
      <div className="siteContainer">
      <RecipeDetails recipe={props.recipe} recipes={props.recipes}/>
      </div>
      <Footer/>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context){
  const recipes = await axios.get("http://localhost:8000/recipes").then(function(response){
    return response.data;
  }).catch(() => {
    return {
      notFound: true,
    };
  });

  const recipe = await axios.get("http://localhost:8000/recipes/" + context.params.recipeId).then(function(response){
    return response.data;
  }).catch(() => {
    return {
      notFound: true,
    };
  });

  return{
    props:{
        recipe,
        recipes
    },
    revalidate: 60 * 60,
  }
}
