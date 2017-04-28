import { GET_ALL_ARTICLES } from '../common/constants'

const getAllArticles = () => ({
  type: GET_ALL_ARTICLES,
  api: '/api/article',
  method: 'GET'
})

export { getAllArticles }
