import Head from "next/head";
import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import RecipesList from "../../../components/recipesList/recipesList";
import axios from 'axios';

export default function filter(props) {
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
      <Header categories={props.categories} types={props.types}/>
      <div className="siteContainer">
        <h1 className="primaryColorText boldFont">Receitas: Teste / Teste</h1>
        <RecipesList recipes={props.recipes}/>
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
  const recipes = await axios.get("http://localhost:8000/recipes/filter/" + context.params.categorie + "/" + context.params.type).then(function(response){
    return response.data;
  }).catch(() => {
    return {
      notFound: true,
    };
  });

  const categories = await axios.get("http://localhost:8000/category").then(function(response){
    return response.data;
  }).catch(() => {
    return {
      notFound: true,
    };
  });

  const types = await axios.get("http://localhost:8000/type").then(function(response){
    return response.data;
  }).catch(() => {
    return {
      notFound: true,
    };
  });

  return{
    props:{
        recipes,categories,types
    },
    revalidate: 60 * 5,
  }
}