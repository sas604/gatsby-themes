// Gatsby Config commented out for the start branch
// Jason adds this later in the course
//
require('dotenv').config();

module.exports = {
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: 'src/images',
      },
    },
    {
      resolve: 'gatsby-transformer-cloudinary',
      options: {
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        uploadFolder: 'fem-workshop',
      },
    },
    {
      resolve: 'gatsby-theme-docs',
      options: {
        basePath: '/recipes',
        contentPath: 'content/recipes',
      },
    },
    {
      resolve: '@jlengstorf/gatsby-theme-events',
      options: {
        basePath: '/events',
        contentPath: 'content/events',
      },
    },
  ],
};
