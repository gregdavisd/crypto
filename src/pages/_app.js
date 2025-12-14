import Head from "next/head";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout";
import { AppProvider } from "../context/AppContext";
import "../styles/main.sass";

if (typeof window !== "undefined") {
  ReactGA.initialize("UA-215114522-1");
  history.scrollRestoration = "manual";
}

function CustomApp({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <Head>
        <title key="title">Site is Going Just Great</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          key="description"
          content="A timeline recording..."
        />
        <meta name="author" content="Molly White" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#5948a4" />
        <meta
          property="og:url"
          key="ogurl"
          content="https://localhost/"
        />
        <meta
          property="og:title"
          key="ogtitle"
          content="Title"
        />
        <meta property="og:type" key="ogtype" content="website" />
        <meta
          property="og:description"
          key="ogdescription"
          content="A timeline recording..."
        />
        <meta
          property="og:image"
          key="ogimage"
          content="https://primary-cdn.localhost/monkey-og.png"
        />
        <meta
          property="og:image:alt"
          key="ogimagealt"
          content="Illustration:"
        />
        <meta property="og:image:width" key="ogwidth" content="1200" />
        <meta property="og:image:height" key="ogheight" content="630" />
        <meta
          name="twitter:card"
          key="twittercard"
          content="summary_large_image"
        />
        <meta name="twitter:creator" content="@" />
        <meta name="twitter:creator:id" content="" />
        <meta name="twitter:site" content="@" />
        <meta name="twitter:site:id" content="" />
        <meta
          name="twitter:title"
          key="twittertitle"
          content="Site is Going Just Great"
        />
        <meta
          name="twitter:description"
          key="twitterdescription"
          content="A timeline recording..."
        />
        <meta
          name="twitter:image"
          key="twitterimage"
          content="https://primary-cdn.localhost/monkey-twitter.png"
        />
        <meta
          name="twitter:image:alt"
          key="twitterimagealt"
          content="Illustration:"
        />
        <meta name="fediverse:creator" content="@@hachyderm.io" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </QueryClientProvider>
    </>
  );
}

CustomApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
};

export default CustomApp;
