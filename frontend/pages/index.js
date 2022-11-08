import Head from "next/head";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import HomeText from "../components/homeText/homeText";
import RecipesList from "../components/recipesList/recipesList";
import axios from 'axios';
import { useState } from "react";

export default function Home(props) {
  const [recipes, setRecipes] = useState(props.recipes);

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
        <RecipesList recipes={recipes} firstListElement={<HomeText key="fristItem"/>}/>
      </div>
      <Footer/>
    </>
  );
}

export async function getStaticProps(context){
  const recipes = await axios.get("http://localhost:8000/recipes").then(function(response){
    return response.data;
  }).catch(() => {
    return {
      notFound: true,
    };
  });

  return{
    props:{
        recipes
    },
    revalidate: 60 * 5,
  }
}
