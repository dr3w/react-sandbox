import React from 'react'

function Article(props) {
  return (
    <div>
      Article item #{props.match.params.id}
    </div>
  )
}

export default Article
