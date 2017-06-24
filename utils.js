const updateEntityAt = (id, value, entities) => {
  const index = entities.indexOf(entities.find(e => e.id == id));
  if (index > -1) {
    const keep = { id: entities[index].id };
    entities[index] = Object.assign({}, entities[index], value, keep);
  } else {
    throw new Error('element not found');
  }

  return entities;
};

const createEntity = (value, entities) => {
  value.id = (Math.max(...entities.map(e => e.id)) || 0) + 1;
  entities.push(value);

  return entities;
};

const deleteEntity = (id, entities) => {
  const index = entities.indexOf(entities.find(e => e.id == id));
  if (index > -1) {
    return entities.filter(e => e.id != id);
  } else {
    throw new Error('element not found');
  }
};

module.exports = {
  updateEntityAt,
  createEntity,
  deleteEntity
};
