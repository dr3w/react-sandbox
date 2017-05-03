import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArticle } from 'app/articles/actions'
import { ArticleBody } from 'app/articles/id'
import { Status } from 'common/components'
import { LOADED } from 'common/constants'

const load = (props, oldProps) => {
  if (!oldProps.match ||
      (oldProps.match && oldProps.match.params.id !== props.match.params.id)) {
    props.getArticle(props.match.params.id)
  }
}

class ArticlesIdCmp extends React.PureComponent {
  componentDidMount() {
    load(this.props, {})
  }

  componentWillReceiveProps(nextProps) {
    load(nextProps, this.props)
  }

  render() {
    const { article, status, error } = this.props

    return (
      <div>
        <Status
          status={status}
          error={error}
        />
        { status === LOADED && <ArticleBody text={article.text} date={article.date} /> }
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
  article: state.articles.entities.toJS()[props.match.params.id],
  status: state.articlesId.status,
  error: state.articlesId.error
})

const mapDispatchToProps = { getArticle }

const ArticlesIdRoute = connect(mapStateToProps, mapDispatchToProps)(ArticlesIdCmp)

export default ArticlesIdRoute
