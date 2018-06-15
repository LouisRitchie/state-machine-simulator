import { append, dissoc } from 'ramda'
import {
  ENTITY_ADD,
  ENTITY_DELETE,
  ENTITY_DELETE_ALL,
  ENTITY_CONNECT_TWO
} from 'actions/entities'

const initialState = {
  entities: [],
  adjacency: {}
}

let nextId = 0

const entities = (state = initialState, {type, payload}) => {
  switch (type) {
    case ENTITY_ADD:
      const id = nextId++

      return Object.assign({}, state, {
        entities: append({ ...payload, id }, state.entities),
        adjacency: { ...state.adjacency, id: {} }
      })
    case ENTITY_DELETE:
      return Object.assign({}, state, {
        entities: state.entities.filter(({id}) => payload.id !== id),
        adjacency: dissoc(payload.id, state.adjacency)
      })
    case ENTITY_DELETE_ALL:
      return initialState
    case ENTITY_CONNECT_TWO:
      const { startXY, endXY, gridSize } = payload
      const [ x1, y1 ] = startXY
      const [ x2, y2 ] = endXY
      let id1, id2

      state.entities.map(({x, y, id}) => {
        const MIN_X = x
        const MAX_X = x + gridSize
        const MIN_Y = y
        const MAX_Y = y + gridSize

        if (x1 >= MIN_X && x1 <= MAX_X && y1 >= MIN_Y && y1 <= MAX_Y) {
          id1 = id
        } else if (x2 >= MIN_X && x2 <= MAX_X && y2 >= MIN_Y && y2 <= MAX_Y) {
          id2 = id
        }
      })

      if (id1 && id2) {
        return Object.assign({}, state, {
          adjacency: { ...state.adjacency, id1: { ...state.adjacency[id1], id2: {} } }
        })
      } else {
        return state
      }
    default:
      return state
  }
}

export default entities