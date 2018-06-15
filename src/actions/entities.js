export const ENTITY_ADD = 'ENTITY_ADD'
export const ENTITY_DELETE = 'ENTITY_DELETE'
export const ENTITY_DELETE_ALL = 'ENTITY_DELETE_ALL'
export const ENTITY_CONNECT_TWO = 'ENTITY_CONNECT_TWO'

export const addEntity = options => ({
  type: ENTITY_ADD,
  payload: options
})

export const deleteEntity = id => ({
  type: ENTITY_DELETE,
  payload: {
    id
  }
})

export const connectTwoEntities = (startXY, endXY, gridSize) => ({
  type: ENTITY_CONNECT_TWO,
  payload: { startXY, endXY }
})

export const deleteAllEntities = () => ({ type: ENTITY_DELETE_ALL })