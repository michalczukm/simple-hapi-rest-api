const entityUtils = require('./entity-utils');

const ERROR_NOT_FOUND = {
  error: {
    message: 'Element not found',
    code: 'ELEMENT_NOT_FOUND'
  }
};

const PAGINATION_DEFAULT_LIMIT = 10;

const PAGINATION_HEADERS = {
  page: 'x-pagination-page',
  perPage: 'x-pagination-per_page',
  totalCount: 'x-pagination-total_count',
  pageCount: 'x-pagination-page_count'
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

  const getResponseForCollection = elements => {
    if(request.headers[PAGINATION_HEADERS.page]) {
      const pagination = paginate({
        page: request.headers[PAGINATION_HEADERS.page] || 0,
        perPage: request.headers[PAGINATION_HEADERS.perPage] || 0
      }, elements);

      return reply(pagination.result)
                  .header(PAGINATION_HEADERS.page, pagination.metadata.page)
                  .header(PAGINATION_HEADERS.perPage, pagination.metadata.perPage)
                  .header(PAGINATION_HEADERS.pageCount, pagination.metadata.pageCount)
                  .header(PAGINATION_HEADERS.totalCount, pagination.metadata.totalCount)
                  .code(200);
    } else {
      return reply(elements).code(200);
    }
  };

  return request.params.id
    ? getResponseForGetById(getElementByParamsId(request, elements))
    : getResponseForCollection(filterBySimpleKeyValueQuery(simpleQuery, elements));
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
    elements = entityUtils.createEntity(request.payload, elements);
    const newElement = elements[elements.length - 1];
    return reply(newElement).created(`/api/${resourceName}/${newElement.id}`);
  };

  const handlePut = () => {
    elements = entityUtils.updateEntityAt(request.params.id, request.payload, elements);
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
      elements: [...entityUtils.deleteEntity(id, elements)],
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
  ERROR_NOT_FOUND,
  PAGINATION_HEADERS,
  PAGINATION_DEFAULT_LIMIT,
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

const paginate = (config, elements = []) => {
    const defaultLimit = PAGINATION_DEFAULT_LIMIT;
    let { page, perPage } = config;

    perPage = perPage > defaultLimit ? perPage : defaultLimit;

    const totalCount = elements.length;
    const pageCount = Math.ceil(totalCount / perPage);

    if (page > pageCount) {
      page = pageCount;
    } else if (page < 0) {
      page = 0;
    }

    return {
      metadata: {
        totalCount,
        pageCount,
        perPage,
        page
      },
      result: elements.slice((page - 1) * perPage, page * perPage)
    };
};