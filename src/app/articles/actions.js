import { GET_ALL_ARTICLES, GET_ARTICLE } from 'common/constants'

const getAllArticles = () => ({
  type: GET_ALL_ARTICLES,
  api: {
    url: '/api/article'
  }
})

const getArticle = id => ({
  type: GET_ARTICLE,
  id,
  api: {
    url: `/api/article/${id}`
  }
})

export { getAllArticles, getArticle }
