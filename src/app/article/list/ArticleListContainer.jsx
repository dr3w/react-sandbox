import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import withDataPreload from 'hoc/withDataPreload'
import { listActions, getList, getListsStatus } from 'reducers/list'
import ArticleList from 'app/article/list/ArticleList'

const ArticleListContainer = ({ list }) => <ArticleList list={list} />
ArticleListContainer.propTypes = {
  status: PropTypes.object.isRequired,
  list: PropTypes.array
}

ArticleListContainer.defaultProps = {
  list: []
}

const mapStateToProps = state => ({
  list: getList(state),
  status: getListsStatus(state)
})

const mapDispatchToProps = {
  checkAndFetchList: listActions.checkAndFetchList
}

const loadData = ({ checkAndFetchList }) => {
  checkAndFetchList()
}

const isReady = ({ status }) => status.loaded
const errorMessage = ({ status }) => status.error && status.error.message

const enhance = compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps),
  withDataPreload(loadData, isReady, errorMessage)
)

export default enhance(ArticleListContainer)

