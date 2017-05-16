import { GET_ALL_ARTICLES, GET_ARTICLE, GET_ARTICLE_COMMENTS, ADD_ARTICLE_COMMENT } from 'common/constants'

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

const addArticleComment = (articleId, formData) => ({
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

export { getAllArticles, getArticle, getArticleComments, addArticleComment }
