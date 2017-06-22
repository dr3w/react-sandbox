import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import _get from 'lodash/get'
import withDataPreload from 'hoc/withDataPreload'
import { listActions, getList, getListStatus } from 'store/list'
import ArticleList from 'app/components/ArticleList'

const ArticleListContainer = ({ list }) => <ArticleList list={list} />

ArticleListContainer.propTypes = {
  status: PropTypes.object.isRequired,
  list: PropTypes.array
}
const mapStateToProps = state => ({
  list: getList(state),
  status: getListStatus(state)
})

const mapDispatchToProps = {
  checkAndFetchList: listActions.checkAndFetchList
}

const loadData = ({ checkAndFetchList }) => {
  checkAndFetchList()
}

// TODO: move to helper
const isReady = ({ status }) => _get(status, ['loaded'])
const errorMessage = ({ status }) => _get(status, ['error', 'message'])

const enhance = compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps),
  withDataPreload({
    loadData,
    isReady,
    errorMessage
  })
)

export default enhance(ArticleListContainer)

