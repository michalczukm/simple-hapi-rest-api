const utils = require('./utils')

const ERROR_NOT_FOUND = {
  error: {
    message: 'Element not found',
    code: 'ELEMENT_NOT_FOUND'
  }
}

const buildGetResponse = (request, reply, elements) => {
  if (request.params.id) {
    const id = encodeURIComponent(request.params.id)
    const foundElement = elements.find(e => e.id == id)

    return foundElement
      ? reply(foundElement)
      : reply(ERROR_NOT_FOUND).code(404)
  } else {
    return reply(elements)
  }
}

const buildCreateOrUpdateResponse = (request, reply, elements, resourceName) => {
  if (request.params.id) {
    const id = encodeURIComponent(request.params.id)
    elements = utils.updateEntityAt(request.payload.id, request.payload, elements)
    return reply().code(200)
  } else {
    elements = utils.createEntity(request.payload, elements)
    const newElement = elements[elements.length - 1]
    return reply(newElement).created(`/api/${resourceName}/${newElement.id}`)
  }
}

const buildDeleteResponse = (request, reply, elements) => {
  const id = encodeURIComponent(request.params.id)
  try {
    elements = [...utils.deleteEntity(id, elements)]
    return reply().code(200)
  } catch (error) {
    return reply(ERROR_NOT_FOUND).code(404)
  }
}

module.exports = {
  buildGetResponse,
  buildCreateOrUpdateResponse,
  buildDeleteResponse
}
