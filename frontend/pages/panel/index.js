import Head from "next/head";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Login from "../../components/login/login";
import Panel from "../../components/panel/panel";

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
      <Header />
      <div className="siteContainer">
        <Login />
        <Panel />
      </div>
      <Footer />
    </>
  );
}
