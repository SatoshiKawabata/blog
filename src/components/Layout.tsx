import React from "react";
import Helmet from "react-helmet";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./all.sass";
import useSiteMetadata from "./SiteMetadata";

const TemplateWrapper: React.StatelessComponent<React.Props<{}>> = ({
  children
}) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="ja" prefix="og: http://ogp.me/ns#" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link rel="apple-touch-icon" sizes="180x180" href="/img/logo_180.png" />
        <link
          rel="icon"
          type="image/png"
          href="/img/logo_32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/img/logo_16.png"
          sizes="16x16"
        />

        <link rel="mask-icon" href="/img/logo.svg" color="#ff4400" />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="https://blog.kwst.site/img/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="fb:app_id" content="876901109074739" />

        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://blog.kwst.site/img/logo_180.png"
        />

        <style>{`
          pre {
            background: whitesmoke;
          }

          code {
            font-family: Menlo, Monaco, 'Courier New', monospace;
          }
        `}</style>
        <script
          data-ad-client="ca-pub-6642788290678044"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
      </Helmet>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
