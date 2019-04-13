import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent, ContentProps } from '../components/Content'

interface Props {
  content: string
  ContentComponent?: React.StatelessComponent<ContentProps>
  description: string
  helmet?: JSX.Element
  title: string
}

export const BlogPostTemplate = ({
  content,
  ContentComponent,
  description,
  title,
  helmet,
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
            <p>{description}</p>
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
  console.log("data", data)
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        ContentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
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
