import Head from "next/head";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Login from "../../components/login/login";
import Panel from "../../components/panel/panel";
import nookies, { parseCookies } from "nookies";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PanelPage(props) {
  const [recipes, setRecipes] = useState(props.recipes);
  const [cookies, setCookies] = useState({});

  useEffect(() => {
    setCookies(parseCookies());
  }, []);

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
        {cookies.TOKEN ? <Panel recipes={recipes} categories={props.categories} types={props.types}/> : <Login />}
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  let recipes = { notFound: true };
  if (cookies.TOKEN) {
    recipes = await axios
      .get("http://localhost:8000/recipes/myrecipes", {
        params: { token: cookies.TOKEN },
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

  return {
    props: { recipes, categories, types },
  };
}
