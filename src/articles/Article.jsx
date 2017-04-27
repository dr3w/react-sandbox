import React from 'react'
import PropTypes from 'prop-types'

const Article = ({ match }) => (
  <div>
    Article item #{match.params.id}
  </div>
)

Article.propTypes = {
  match: PropTypes.object.isRequired
}

export default Article
