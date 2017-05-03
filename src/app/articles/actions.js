import { GET_ALL_ARTICLES, GET_ARTICLE, GET_ARTICLE_COMMENTS } from 'common/constants'

const getAllArticles = () => ({
  type: GET_ALL_ARTICLES,
  api: {
    url: '/api/article'
  }
})

const getArticle = id => ({
  type: GET_ARTICLE,
  api: {
    url: `/api/article/${id}`
  }
})

const getArticleComments = articleId => ({
  type: GET_ARTICLE_COMMENTS,
  articleId,
  api: {
    url: '/api/comment',
    data: {
      article: articleId
    }
  }
})

export { getAllArticles, getArticle, getArticleComments }
