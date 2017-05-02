import { GET_ARTICLE } from 'common/constants'

const getArticle = id => ({
  type: GET_ARTICLE,
  api: {
    url: `/api/article/${id}`
  }
})

export { getArticle }
