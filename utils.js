const updateEntityAt = (id, value, entities) => {
  const index = entities.indexOf(entities.find(e => e.id == id))
  entities[index] = Object.assign({}, value)

  return entities
}

const createEntity = (value, entities) => {
  value.id = Math.max(...entities.map(e => e.id)) + 1
  entities.push(value)

  return entities
}

const deleteEntity = (id, entities) => {
  const index = entities.indexOf(entities.find(e => e.id == id))
  if (index > -1) {
    entities.splice(1, index)
    return entities;
  } else {
    throw new Error('element not found')
  }
}

module.exports = {
  updateEntityAt,
  createEntity,
  deleteEntity}
