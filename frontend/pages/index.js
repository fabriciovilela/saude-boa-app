import Head from "next/head";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import HomeText from "../components/homeText/homeText";
import RecipesList from "../components/recipesList/recipesList";
import axios from "axios";
import { useState } from "react";
import BannerHome from "../components/bannerHome/bannerHome";

export default function Home(props) {
  const [recipes, setRecipes] = useState(props.recipes);
  const [currentPage, setCurrentPage] = useState(2);

  const takeNewPage = async () => {
    if(currentPage > -1){
      await axios
      .get(process.env.NEXT_PUBLIC_BACKEND_LINK + "/recipes", {
        params: { page: currentPage, perPage: 12 },
      })
      .then(function (response) {
        setCurrentPage(currentPage + 1);
        if(response.data.length === 0){
          setCurrentPage(-1)
        }
        else{
          setRecipes([...recipes, ...response.data]);
        }
      });
    }
  };
  
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
      <BannerHome />
      <div className="siteContainer">
        <RecipesList
          recipes={recipes}
          firstListElement={<HomeText key="fristItem" />}
        />
        {currentPage > -1 &&
          <div className="homeMoreItensButton" onClick={takeNewPage}>Ver mais receitas</div>
        }
        
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  const recipes = await axios
    .get(process.env.NEXT_PUBLIC_BACKEND_LINK + "/recipes", {
      params: { page: 1, perPage: 12 },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(() => {
      return {
        notFound: true,
      };
    });

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
      recipes,
      categories,
      types,
    },
    revalidate: 60 * 5,
  };
}
