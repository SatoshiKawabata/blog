import React from 'react'
import PropTypes from 'prop-types'
import IndexPageTemplate from '../../templates/index-page'

interface Props extends React.Props<{}> {
  entry: any, getAsset: any
}
const IndexPagePreview: React.StatelessComponent<Props> = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <IndexPageTemplate />
    )
  } else {
    return (<div>Loading...</div>)
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
