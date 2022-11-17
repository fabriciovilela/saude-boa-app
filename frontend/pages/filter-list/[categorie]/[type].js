import Head from "next/head";
import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import RecipesList from "../../../components/recipesList/recipesList";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

export default function filter(props) {
  const router = useRouter();
  const [ category, setCategory] = useState("");
  const [ type, setType] = useState("");

  useEffect(()=>{
    props.types?.map((thisType)=>{
      
      if(thisType._id == router.query.type){
        setType(thisType.typeName);
      }
    });
    props.categories?.map((thisCategory)=>{
      if(thisCategory._id == router.query.categorie){
        setCategory(thisCategory.categoryName);
      }
    });
  },[props.categories, props.types])

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
      <div className="headerOverlayFix" />
      <div className="siteContainer">
        <h1 className="primaryColorText boldFont listTitle">Receitas: <b className="darkFont">{type}</b> / <b className="darkFont">{category}</b></h1>
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
