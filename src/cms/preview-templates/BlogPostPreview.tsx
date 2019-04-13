import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'

interface Props extends React.Props<{}> {
  entry: any,
  widgetFor: any
}
const BlogPostPreview: React.StatelessComponent<Props> = ({ entry, widgetFor }) => (
  <BlogPostTemplate
    content={widgetFor('body')}
    title={entry.getIn(['data', 'title'])}
  />
)

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
