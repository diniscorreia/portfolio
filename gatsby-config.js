module.exports = {
  siteMetadata: {
    title: `Dinis Correia`,
    description: `I'm a web designer and front-end developer. I design and build websites and help others to tell stories in new and engaging ways.`,
    author: `Dinis Correia`,
    url: "https://diniscorreia.com/portfolio", 
    image: "/images/og-image.jpg",
    twitterUsername: "@diniscorreia"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-open-graph-images`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Rubik\:400,400i,600,600i` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
        resolve: '@prismicio/gatsby-source-prismic-graphql',
        options: {
            repositoryName: 'dc-portfolio', // (REQUIRED, replace with your own)
            linkResolver: () => post => `/${post.uid}`,
        }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dinis Correia`,
        short_name: `DC`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
    {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
            trackingId: "UA-26362480-2",
            head: false,
            respectDNT: true,
        },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
