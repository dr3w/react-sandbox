import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArticle } from 'app/articles/id/actions'
import { Status, FancyButton } from 'common/components'
import { LOADED, LOADING } from 'common/constants'

const load = (props) => {
  const { match, article, status } = props

  if (!article.id && status !== LOADING) {
    props.getArticle(match.params.id)
  }
}

class ArticlesIdCmp extends React.PureComponent {
  componentDidMount() {
    load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    load(nextProps)
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
        <FancyButton text="BUTTON!" />
        {body}
      </div>
    )
  }
}

ArticlesIdCmp.propTypes = {
  match: PropTypes.object.isRequired,
  article: PropTypes.object,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  getArticle: PropTypes.func.isRequired
}

ArticlesIdCmp.defaultProps = {
  article: {},
  error: null
}

const mapStateToProps = (state, props) => ({
  article: state.articlesId.entities.toJS()[props.match.params.id],
  status: state.articlesId.status,
  error: state.articlesId.error
})

const mapDispatchToProps = { getArticle }

const ArticlesIdRoute = connect(mapStateToProps, mapDispatchToProps)(ArticlesIdCmp)

export default ArticlesIdRoute
