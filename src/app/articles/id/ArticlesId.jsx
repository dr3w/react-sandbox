import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArticle } from 'app/articles/id/actions'
import { Status } from 'common/components'
import { LOADED, PRISTINE } from 'common/constants'

class ArticlesId extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    // TODO: fix check, first loading does not work
    if (nextProps.status !== PRISTINE && nextProps.match.params.id === this.props.match.params.id) {
      return
    }

    nextProps.getArticle(nextProps.match.params.id)
  }

  render() {
    const { article, status, error } = this.props

    const body = (status === LOADED && <div>{article.text}</div>)

    return (
      <div>
        <Status
          status={status}
          error={error}
        />
        {body}
      </div>
    )
  }
}

ArticlesId.propTypes = {
  match: PropTypes.object.isRequired,
  article: PropTypes.object,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  getArticle: PropTypes.func.isRequired
}

ArticlesId.defaultProps = {
  article: {},
  error: null
}

const mapStateToProps = (state, props) => ({
  article: state.articlesId.entities.toJS()[props.match.params.id],
  status: state.articlesId.status,
  error: state.articlesId.error
})

const mapDispatchToProps = { getArticle }

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesId)
