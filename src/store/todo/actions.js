import createApiActions from 'common/store/createApiActions'

const TODO = createApiActions('TODO', ['FETCH', 'TOGGLE', 'ADD', 'DELETE'])

TODO.SET_TYPE = 'TODO/SET_TYPE'

export default TODO
