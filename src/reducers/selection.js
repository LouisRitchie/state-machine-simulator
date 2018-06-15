import { ENTITY_DELETE, ENTITY_DELETE_ALL } from 'actions/entities'

const selection = (state = [], {type, payload}) => {
  switch (type) {
    case 'ID_FOCUS':
      return [ payload.id ]
    case 'ID_SELECT':
      return [ ...state, payload.id ]
    case 'ID_DESELECT':
      return state.filter(id => id !== payload.id)
    case ENTITY_DELETE:
    case ENTITY_DELETE_ALL:
     return []
    default:
      return state
  }
}

export default selection