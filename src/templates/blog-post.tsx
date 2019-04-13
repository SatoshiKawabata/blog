import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent, ContentProps } from '../components/Content'

interface Props {
  content: string
  ContentComponent?: React.StatelessComponent<ContentProps>
  helmet?: JSX.Element
  title: string
  date: string
}

export const BlogPostTemplate = ({
  content,
  ContentComponent,
  title,
  helmet,
  date
}: Props) => {
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{date}</p>
            {
              ContentComponent
                ? <ContentComponent content={content} />
                : <Content content={content} />
            }
          </div>
        </div>
      </div>
    </section>
  )
}

const BlogPost = ({ data }: { data: { markdownRemark: MarkdownRemark }}) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        ContentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <meta name="twitter:title" content={post.frontmatter.title} />
            <meta name="twitter:description" content={post.frontmatter.description} />
          </Helmet>
        }
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      />
    </Layout>
  )
}

interface MarkdownRemark {
  id: string
  html: string
  frontmatter: {
    date: string
    title: string
    description: string
  }
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`
