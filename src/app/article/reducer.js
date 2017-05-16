import { Record, OrderedMap } from 'immutable'
import { arrayToMap } from 'common/helpers'
import { GET_ALL_ARTICLES, GET_ARTICLE, GET_ARTICLE_COMMENTS, SUCCESS } from 'common/constants'
import { ArticleListModel, ArticleModel, CommentsModel } from './model'

const DefaultReducerState = Record({
  articleList: new OrderedMap({}),
  article: new OrderedMap({}),
  comments: new OrderedMap({})
})

const articleReducer = (state = new DefaultReducerState({}), action) => {
  const { type, response, articleId } = action

  switch (type) {
    case GET_ALL_ARTICLES + SUCCESS:
      return state
        .update('articleList', articleList => arrayToMap(response, ArticleListModel).merge(articleList))

    case GET_ARTICLE + SUCCESS:
      return state
        .setIn(['article', response.id], new ArticleModel(response))

    case GET_ARTICLE_COMMENTS + SUCCESS:
      return state
        .setIn(['comments', articleId], arrayToMap(response, CommentsModel))

    default:
      return state
  }
}

export default articleReducer
