import { isStatusLoaded, statusErrorMessage } from 'common/helpers'

export const getArticleId = ({ match }) => match.params.id

export const initialLoadData = ({ checkAndFetchComments, ...rest }) => {
  const articleId = getArticleId(rest)

  return checkAndFetchComments(articleId)
    .then(() => checkAndFetchComments('56c782f17b4e0ba78c7ad717--'))
    .then(data => console.log('OK', data))
    .catch(err => console.log('ERR', err))
}

export const isReady = ({ comments }) => isStatusLoaded([comments.status])

export const errorMessage = ({ comments, otherComments }) =>
  statusErrorMessage([comments.status, otherComments.status])
