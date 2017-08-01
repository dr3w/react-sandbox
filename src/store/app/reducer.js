import APP from './actions'

const appReducer = (state = {}, action) => {
  const { type, meta = {} } = action

  switch (type) {
    case APP.SET_TYPE:
      return { ...state, type: meta.type }

    default:
      return state
  }
}

export default appReducer
