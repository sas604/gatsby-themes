const path = require('path');
const fs = require('fs');
const withDefaults = require('./utils/default-options');
const mkdirp = require('mkdirp');

exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState();
  //path defaults
  const { contentPath } = withDefaults(options);
  // dir path
  const dir = path.join(program.directory, contentPath);

  if (!fs.existsSync(dir)) {
    //  create the dir
    mkdirp.sync(dir);
  }
  // figure out content path
  // if directory doesn't exist create it
};
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
type DocsPage implements Node @dontInfer {
  id: ID!
  title: String!
  path: String!
  updated: Date @dateformat
  body: String!
} 
`);
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
  console.log('do nodes');

  const { basePath } = withDefaults(options);

  const parent = getNode(node.parent);

  // Only work on MDX files that were loaded by this them
  if (
    node.internal.type !== 'Mdx' ||
    parent.sourceInstanceName !== 'gatsby-theme-docs'
  ) {
    return;
  }

  // make sure that I have index.mdx
  const pageName = parent.name !== 'index' ? parent.name : '';
  console.log(parent.relativeDirectory);
  console.log(
    path
      .join('/', basePath, parent.relativeDirectory, pageName)
      .replace(/\\/g, '/'),
  );
  actions.createNode({
    id: createNodeId(`DocsPage-${node.id}`),
    title: node.frontmatter.title || parent.name,
    updated: parent.modifiedTime,
    path: path
      .join('/', basePath, parent.relativeDirectory, pageName)
      .replace(/\\/g, '/'),
    parent: node.id,
    internal: {
      type: 'DocsPage',
      contentDigest: node.internal.contentDigest,
    },
  });
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    DocsPage: {
      body: {
        type: 'String!',
        resolve: (source, args, context, info) => {
          // Load the resolver for the 'Mdx' type 'body' field.
          const type = info.schema.getType('Mdx');
          const mdxFields = type.getFields();
          const resolver = mdxFields.body.resolve;

          const mdxNode = context.nodeModel.getNodeById({ id: source.parent });

          return resolver(mdxNode, args, context, {
            fieldName: 'body',
          });
        },
      },
    },
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allDocsPage {
        nodes {
          id
          path
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panic('error loading docs', result.errors);
  }
  // reporter.info(result.data);
  const pages = result.data.allDocsPage.nodes;

  pages.forEach((page) => {
    actions.createPage({
      path: page.path,
      component: require.resolve('./src/templates/docs-page-template.js'),
      context: {
        pageID: page.id,
      },
    });
  });
};
