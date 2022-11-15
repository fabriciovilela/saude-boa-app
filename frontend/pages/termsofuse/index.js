import Head from "next/head";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import axios from "axios";
import TermsOfUse from "../../components/TermsOfUse/termsOfUse";

export default function TermsOfUsePage(props) {
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
      <div className="headerOverlayFix" />
      <div className="siteContainer">
        <TermsOfUse/>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  const categories = await axios
    .get("http://localhost:8000/category")
    .then(function (response) {
      return response.data;
    })
    .catch(() => {
      return {
        notFound: true,
      };
    });

  const types = await axios
    .get("http://localhost:8000/type")
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
      categories,
      types,
    },
    revalidate: 60 * 60,
  };
}
