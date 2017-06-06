const updateEntityAt = (id, value, entities) => {
    entities = [];
    const index = entities.indexOf(entities.find(e => e.id == id));
    entities[index] = Object.assign({}, value);

    return entities;
};

const createEntity = (value, entities) => {
    value.id = Math.max(...entities.map(e => e.id)) + 1;
    entities.push(value);

    return entities;
};

const deleteEntity = (id, entities) => {
    // const index = entities.indexOf(entities.find(e => e.id == value.id));
    // entities.splice(index, 1);
    return entities.filter(e => e.id == id);
};

module.exports = {
    updateEntityAt, createEntity, deleteEntity
}