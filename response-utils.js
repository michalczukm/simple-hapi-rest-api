const utils = require('./utils');

const ERROR_NOT_FOUND = {
  error: {
    message: 'Element not found',
    code: 'ELEMENT_NOT_FOUND'
  }
};

/**
 * For now it handles only simple queries - with one key
 * @param {*} request 
 * @param {*} reply 
 * @param {*} elements 
 * @param {*} simpleQuery 
 */
const buildGetResponse = (request, reply, elements, simpleQuery = {}) => {
  const getResponseForGetById = foundElement => foundElement
    ? reply(foundElement)
    : reply(ERROR_NOT_FOUND).code(404);

  return request.params.id
    ? getResponseForGetById(getElementByParamsId(request, elements))
    : reply(filterBySimpleKeyValueQuery(simpleQuery, elements));
};

/**
 * Get nested resources by calling external query for them, after picking one element.
 * @example: elements: [ { name: 'John', items: [1, 2, 3]} ], 
 *           nestedResourceQuery: element => externalList.filter(item => item.ExternalElementId === element.id)
 * @param {*} request 
 * @param {*} reply 
 * @param {*} elements 
 */
const buildNestedResourceGetResponse = (request, reply, elements, nestedResourceQuery) => {
  const getNestedElements = element => !!element ? nestedResourceQuery(element) : [];
  const nestedElements = getNestedElements(getElementByParamsId(request, elements));

    return nestedElements
      ? reply(nestedElements)
      : reply(ERROR_NOT_FOUND).code(404);
};

const buildCreateOrUpdateResponse = (request, reply, elements, resourceName) => {
  const handlePost = () => {
    elements = utils.createEntity(request.payload, elements);
    const newElement = elements[elements.length - 1];
    return reply(newElement).created(`/api/${resourceName}/${newElement.id}`);
  };

  const handlePut = () => {
    elements = utils.updateEntityAt(request.params.id, request.payload, elements);
    return reply().code(200);
  };

  try {
    return request.params.id ? handlePut() : handlePost();
  } catch (error) {
    return {
      elements: elements,
      response: reply(ERROR_NOT_FOUND).code(404)
    };
  }
};

const buildDeleteResponse = (request, reply, elements) => {
  const id = encodeURIComponent(request.params.id);
  try {
    return {
      elements: [...utils.deleteEntity(id, elements)],
      response: reply().code(200)
    };
  } catch (error) {
    return {
      elements: elements,
      response: reply(ERROR_NOT_FOUND).code(404)
    };
  }
};

module.exports = {
  buildGetResponse,
  buildCreateOrUpdateResponse,
  buildDeleteResponse,
  buildNestedResourceGetResponse
};

const getElementByParamsId = (request, elements) => elements.find(e => e.id == encodeURIComponent(request.params.id));

const filterBySimpleKeyValueQuery = (simpleQuery, elements) =>
  // heroku has older nodejs version - Object.values is not allowed :()
  Object.keys(simpleQuery).length > 0
    ? elements.filter(e => e[Object.keys(simpleQuery)[0]] == simpleQuery[Object.keys(simpleQuery)[0]])
    : elements;

