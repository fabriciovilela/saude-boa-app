import Head from "next/head";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import HomeText from "../components/homeText/homeText";
import RecipeDetails from "../components/recipeDetails/recipeDetails";
import RecipesList from "../components/recipesList/recipesList";

export default function Home() {
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
        <RecipeDetails/>
        {/* <RecipesList recipes={[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]} firstListElement={<HomeText/>}/> */}
      </div>
      <Footer/>
    </>
  );
}
