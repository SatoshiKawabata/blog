const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              description
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((edge) => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        title: edge.node.frontmatter.title,
        description: edge.node.frontmatter.description,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      });
    });
  });
  // .then(() => {
  //   return graphql(
  //     `
  //       query {
  //         allNotionPageBlog(
  //           filter: { isDraft: { eq: false } }
  //           sort: { fields: [indexPage], order: DESC }
  //         ) {
  //           edges {
  //             node {
  //               pageId
  //               title
  //               slug
  //               excerpt
  //               pageIcon
  //             }
  //           }
  //         }
  //       }
  //     `
  //   );
  // })
  // .then((result) => {
  //   result.data.allNotionPageBlog.edges.forEach((edge) => {
  //     console.log("Notion articles", edge.node);
  //     createPage({
  //       path: edge.node.slug,
  //       component: path.resolve(`src/templates/notion-blog-post.tsx`),
  //       context: {
  //         pageId: edge.node.pageId,
  //       },
  //     });
  //   });
  // });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
