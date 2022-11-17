import Head from "next/head";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import RecipesList from "../../components/recipesList/recipesList";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

export default function filter(props) {
  const router = useRouter();
  const [ type, setType] = useState("");

  useEffect(()=>{
    props.types?.map((thisType)=>{
      
      if(thisType._id == router.query.categorie){
        setType(thisType.typeName);
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
        <h1 className="primaryColorText boldFont listTitle">Receitas: <b className="darkFont">{type}</b></h1>
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
  const recipes = await axios.get(process.env.NEXT_PUBLIC_BACKEND_LINK + "/recipes/filter/" + context.params.categorie).then(function(response){
    return response.data;
  }).catch(() => {
    return {
      notFound: true,
    };
  });

  const categories = await axios.get(process.env.NEXT_PUBLIC_BACKEND_LINK + "/category").then(function(response){
    return response.data;
  }).catch(() => {
    return {
      notFound: true,
    };
  });

  const types = await axios.get(process.env.NEXT_PUBLIC_BACKEND_LINK + "/type").then(function(response){
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