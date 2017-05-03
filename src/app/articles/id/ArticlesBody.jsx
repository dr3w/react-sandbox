import React from 'react'
import PropTypes from 'prop-types'
import { FancyButton } from 'common/components'

const ArticleBody = ({ text, date }) => (
  <div>
    <p>{text}</p>
    <p><b>{date}</b></p>
    <FancyButton />
  </div>
)

ArticleBody.propTypes = {
  text: PropTypes.string,
  date: PropTypes.string
}

ArticleBody.defaultProps = {
  text: '',
  date: null
}

export default ArticleBody
