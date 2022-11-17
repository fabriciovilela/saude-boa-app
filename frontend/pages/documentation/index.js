import Head from "next/head";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import axios from "axios";
import ApiDocumentation from "../../components/apiDocumentation/apiDocumentation";

export default function HealthyEating(props) {
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
        <ApiDocumentation/>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
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
      categories,
      types,
    },
    revalidate: 60 * 60,
  };
}
