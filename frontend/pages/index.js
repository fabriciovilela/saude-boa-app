import Head from "next/head";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import HomeText from "../components/homeText/homeText";
import RecipesList from "../components/recipesList/recipesList";
import axios from 'axios';
import { useState } from "react";
import BannerHome from "../components/bannerHome/bannerHome";
import IframePopUp from "../components/iframePopUp/iframePopUp";

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
      <Header categories={props.categories} types={props.types}/>
      <BannerHome/>
      <div className="siteContainer">
        <RecipesList recipes={recipes} firstListElement={<HomeText key="fristItem"/>}/>
        <IframePopUp/>
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
