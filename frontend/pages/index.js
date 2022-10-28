import Head from "next/head";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
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
        <RecipesList />
      </div>
      <Footer/>
    </>
  );
}
