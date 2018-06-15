export const ENTITY_ADD = 'ENTITY_ADD'
export const ENTITY_DELETE = 'ENTITY_DELETE'
export const ENTITY_DELETE_ALL = 'ENTITY_DELETE_ALL'

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

export const deleteAllEntities = () => ({ type: ENTITY_DELETE_ALL })