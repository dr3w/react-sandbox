import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { articleActions, getAllArticles } from 'reducers/article'
import ArticleList from 'app/article/ArticleList'

class ArticleListContainer extends React.PureComponent {
  componentDidMount() {
    this.props.getAllArticles()
  }

  render() {
    return <ArticleList articles={this.props.articles} />
  }
}

ArticleListContainer.propTypes = {
  articles: PropTypes.array,
  getAllArticles: PropTypes.func.isRequired
}

ArticleListContainer.defaultProps = {
  articles: []
}

const mapStateToProps = state => ({
  articles: getAllArticles(state)
})

const mapDispatchToProps = {
  getAllArticles: articleActions.getAllArticles
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer)
