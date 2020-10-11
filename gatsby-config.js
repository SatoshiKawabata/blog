var proxy = require("http-proxy-middleware");

module.exports = {
  siteMetadata: {
    title: "blog.kwst.site",
    description: "大名ではたらくフロントエンジニアのブログ",
    copyright: {
      name: "kwst.site",
      startYear: 2019,
    },
    sns: {
      facebook: "https://www.facebook.com/kawabata.satoshi",
      twitter: "https://twitter.com/kwbtsts",
      github: "https://github.com/SatoshiKawabata",
    },
    siteUrl: "https://blog.kwst.site/",
  },
  plugins: [
    `gatsby-plugin-typescript`,
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
              // 固定サイズにする場合に指定
              width: 800,
              height: 400,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.ts`,
      },
    },
    {
      resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ["/all.sass"], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    "gatsby-plugin-netlify", // make sure to keep it last in the array
    "gatsby-plugin-twitter",
    "gatsby-remark-embed-youtube",
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://blog.kwst.site/",
        sitemap: "https://blog.kwst.site/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-144816615-1",
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-source-notionso`,
      options: {
        rootPageUrl:
          "https://www.notion.so/kwst/Blog-188bb73b88944a34a87a8e53afb181b2",
        name: "Blog",
      },
    },
  ],
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: (app) => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    );
  },
};
