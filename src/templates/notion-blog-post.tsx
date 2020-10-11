import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent, ContentProps } from "../components/Content";
import AdSense from "react-adsense";
import {
  NotionPageDescription,
  NotionImageNodes,
} from "gatsby-source-notionso/src/types/notion";
import { blocksToHtml } from "../util/NotionParser";

interface Props {
  content: string;
  ContentComponent?: React.StatelessComponent<ContentProps>;
  helmet?: JSX.Element;
  title: string;
  date: string;
}

export const BlogPostTemplate = (p: Props) => {
  const { content, ContentComponent, title, helmet, date } = p;
  return (
    <>
      <section className="section">
        {helmet || ""}
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <p>{date}</p>
              {ContentComponent ? (
                <ContentComponent content={content} />
              ) : (
                <Content content={content} />
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <div>
        <AdSense.Google client="ca-pub-6642788290678044" slot="" />
      </div> */}
    </>
  );
};

interface BlogPostProps {
  data: {
    notionPageBlog: NotionPageDescription & {
      imageNodes: NotionImageNodes[];
    };
  };
}

const BlogPost = (p: BlogPostProps) => {
  const {
    title,
    blocks,
    excerpt,
    createdAt,
    imageNodes,
  } = p.data.notionPageBlog;
  const html = typeof window !== `undefined` ? blocksToHtml(blocks, imageNodes) : "";

  const d = new Date(createdAt);

  return (
    <Layout>
      <BlogPostTemplate
        content={html}
        ContentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | blog.kwst.site">
            <title>{`${title}`}</title>
            <meta name="description" content={`${excerpt}`} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={excerpt} />
          </Helmet>
        }
        title={title}
        date={`${d.getFullYear()}.${d.getMonth()}.${d.getDate()}`}
      />
    </Layout>
  );
};

export default BlogPost;

export const query = graphql`
  query($pageId: String!) {
    notionPageBlog(pageId: { eq: $pageId }) {
      blocks {
        blockId
        blockIds
        type
        attributes {
          att
        }
        properties {
          propName
          value {
            text
            atts {
              att
              value
            }
          }
        }
      }
      imageNodes {
        imageUrl
        localFile {
          publicURL
        }
      }
      pageId
      slug
      title
      isDraft
      id
      indexPage
      excerpt
      createdAt
    }
  }
`;
