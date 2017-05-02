import { GET_ALL_ARTICLES } from 'common/constants'

const getAllArticles = () => ({
  type: GET_ALL_ARTICLES,
  api: {
    url: '/api/article'
  }
})

export { getAllArticles }
