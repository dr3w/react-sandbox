import { getReducerData, getReducerStatus } from 'common/helpers'

export const getComments = (state, articleId) => getReducerData(state.comment, articleId)
export const getCommentsStatus = (state, articleId) => getReducerStatus(state.comment, articleId)
