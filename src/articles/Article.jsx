import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArticle } from './actions'
import { LOADED } from '../common/constants'

class Article extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id === this.props.match.params.id) return

    nextProps.getArticle(nextProps.match.params.id)
  }

  render() {
    const { article, status, error } = this.props

    return (status === LOADED &&
      <div>
        <h4>{status} {error}</h4>
        <div>{article.text}</div>
      </div>
    )
  }
}

Article.propTypes = {
  match: PropTypes.object.isRequired,
  article: PropTypes.object,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  getArticle: PropTypes.func.isRequired
}

Article.defaultProps = {
  article: {},
  error: null
}

const mapStateToProps = (state, props) => ({
  article: state.articles.entities.toJS()[props.match.params.id],
  status: state.articles.status,
  error: state.articles.error
})

const mapDispatchToProps = { getArticle }

export default connect(mapStateToProps, mapDispatchToProps)(Article)
