import { append } from 'ramda'
import {
  ENTITY_ADD,
  ENTITY_DELETE,
  ENTITY_DELETE_ALL
} from 'actions/entities'

const initialState = []

let nextId = 0

const entities = (state = initialState, {type, payload}) => {
  switch (type) {
    case ENTITY_ADD:
      return append({ ...payload, id: nextId++ }, state)
    case ENTITY_DELETE:
      return state.filter(({id}) => payload.id !== id)
    case ENTITY_DELETE_ALL:
      return initialState
    default:
      return state
  }
}

export default entities