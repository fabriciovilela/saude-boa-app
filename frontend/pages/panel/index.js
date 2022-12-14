import Head from "next/head";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Login from "../../components/login/login";
import Panel from "../../components/panel/panel";
import nookies from "nookies";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PanelPage(props) {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const takeRecipes = async() => {
    await axios
      .get(process.env.NEXT_PUBLIC_BACKEND_LINK + "/recipes/myrecipes",{
        params: { page: currentPage, perPage: 6, token: props.token },
      })
      .then(function (response) {
        setCurrentPage(currentPage + 1);
        if(response.data.length === 0){
          setCurrentPage(-1)
        }
        else{
          setRecipes([...recipes, ...response.data]);
        }
      })
      .catch((err) => {
        console.log("Erro!" + err);
      });
  }

  useEffect(()=>{
    takeRecipes();
  },[])

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
        {props.token ? <>
          <Panel recipes={recipes} categories={props.categories} types={props.types} token={props.token} takeMoreRecipes={takeRecipes} currentPage={currentPage}/>
        </> : <Login />}
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  
  const token = cookies.TOKEN ? cookies.TOKEN : null;

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

  return {
    props: { categories, types, token},
  };
}
