module.exports = {
  pathPrefix: `/portfolio`,
  siteMetadata: {
    title: `Dinis Correia`,
    description: `I'm a web designer and front-end developer. I design and build websites and help others to tell stories in new and engaging ways.`,
    author: `Dinis Correia`,
    siteUrl: `https://diniscorreia.com/portfolio`,
    url: `https://diniscorreia.com/portfolio`, 
    image: `/images/og-image.png`,
    twitterUsername: `@diniscorreia`
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
        resolve: '@prismicio/gatsby-source-prismic-graphql',
        options: {
            repositoryName: 'dc-portfolio', // (REQUIRED, replace with your own)
            defaultLang: 'en-us', // optional, but recommended
            previews: false,
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
