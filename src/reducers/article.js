import { Record, OrderedMap } from 'immutable'
import { arrayToMap, mapToArray } from 'common/helpers'
import { SUCCESS } from 'common/constants'

const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES'
const GET_ARTICLE = 'GET_ARTICLE'
const GET_ARTICLE_COMMENTS = 'GET_ARTICLE_COMMENTS'
const ADD_ARTICLE_COMMENT = 'ADD_ARTICLE_COMMENT'

const ArticleModel = Record({
  id: null,
  date: null,
  title: null,
  text: null,
  comments: [],
  commentsFull: []
})

const CommentsModel = Record({
  id: null,
  user: null,
  text: null
})

const DefaultReducerState = Record({
  entities: new OrderedMap({})
})

const articleReducer = (state = new DefaultReducerState({}), action) => {
  const { type, response, articleId } = action

  switch (type) {
    case GET_ALL_ARTICLES + SUCCESS:
      return state
        .update('entities', entities => arrayToMap(response, ArticleModel).merge(entities))

    case GET_ARTICLE + SUCCESS:
      return state
        .setIn(['entities', response.id], new ArticleModel(response))

    case GET_ARTICLE_COMMENTS + SUCCESS:
      return state
        .setIn(['entities', articleId, 'commentsFull'], arrayToMap(response, CommentsModel))

    default:
      return state
  }
}

export default articleReducer

// Actions
export const articleActions = {
  getAllArticles: () => ({
    type: GET_ALL_ARTICLES,
    api: {
      url: '/api/article'
    }
  }),

  getArticle: id => ({
    type: GET_ARTICLE,
    api: {
      url: `/api/article/${id}`
    }
  }),

  getArticleComments: articleId => ({
    type: GET_ARTICLE_COMMENTS,
    articleId,
    api: {
      url: '/api/comment',
      data: {
        article: articleId
      }
    }
  }),

  addArticleComment: (articleId, formData) => ({
    type: ADD_ARTICLE_COMMENT,
    articleId,
    api: {
      url: '/api/comment',
      method: 'POST',
      data: {
        text: formData.text,
        user: formData.user,
        article: articleId
      }
    }
  })
}

// Selectors
export const getAllArticles = state => mapToArray(state.article.entities)
export const getArticleById = (state, id) => state.article.entities.get(id)
export const getArticleComments = (state, id) => mapToArray(state.article.entities.getIn([id, 'commentsFull']))
