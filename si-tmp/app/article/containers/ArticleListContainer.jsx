import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import withRouteOnEnter from 'hoc/withRouteOnEnter'
import withStatusHandling from 'hoc/withStatusHandling'
import { listActions, getList, getListStatus } from 'store/list'
import * as helper from 'common/helpers'
import ArticleList from 'app/article/components/ArticleList'

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

const isReady = ({ status }) => helper.isStatusLoaded([status])
const errorMessage = ({ status }) => helper.statusErrorMessage([status])

const enhance = compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps),
  withRouteOnEnter(loadData),
  withStatusHandling({
    isReady,
    errorMessage
  })
)

export default enhance(ArticleListContainer)

