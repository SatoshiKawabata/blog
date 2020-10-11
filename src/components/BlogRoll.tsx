import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";

interface Props extends React.Props<{}> {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          excerpt: string;
          id: string;
          fields: { slug: string };
          frontmatter: {
            title: string;
            templateKey: string;
            date: string;
          };
        };
      }[];
    };
    allNotionPageBlog: {
      edges: {
        node: {
          excerpt: string;
          pageIcon: string;
          pageId: string;
          slug: string;
          title: string;
          createdAt: string;
        };
      }[];
    };
  };
}

const BlogRoll: React.StatelessComponent<Props> = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;
  const { edges: notionPosts } = data.allNotionPageBlog;
  return (
    <div className="columns is-multiline">
      {notionPosts &&
        notionPosts.map(({ node }) => {
          return (
            <BlogTitle
              key={node.pageId}
              slug={node.slug}
              title={node.title}
              date={node.createdAt}
              excerpt={node.excerpt}
            />
          );
        })}
      {posts &&
        posts.map(({ node: post }) => {
          return (
            <BlogTitle
              key={post.id}
              slug={post.fields.slug}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              excerpt={post.excerpt}
            />
          );
        })}
    </div>
  );
};

interface BlogTitleProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}
const BlogTitle = (p: BlogTitleProps) => {
  const d = new Date(p.date);
  return (
    <div className="is-parent column is-6">
      <article className="tile is-child box notification">
        <p>
          <Link className="title has-text-primary is-size-4" to={p.slug}>
            {p.title}
          </Link>
        </p>
        <p>
          <span className="subtitle is-size-5 is-block">
            {`${d.getFullYear()}.${d.getMonth()}.${d.getDate()}`}
          </span>
        </p>
        <p>
          {p.excerpt}
          <br />
          <br />
          <Link className="button" to={p.slug}>
            Keep Reading →
          </Link>
        </p>
      </article>
    </div>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date
              }
            }
          }
        }
        allNotionPageBlog(
          filter: { isDraft: { eq: false } }
          sort: { fields: [indexPage], order: DESC }
        ) {
          edges {
            node {
              pageId
              title
              slug
              excerpt
              pageIcon
              createdAt
            }
          }
        }
      }
    `}
    render={(data: any) => <BlogRoll data={data} />}
  />
);
