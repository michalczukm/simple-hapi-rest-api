const utils = require('./utils')

const buildGetResponse = (request, reply, elements) => {
  if (request.params.id) {
    const id = encodeURIComponent(request.params.id)
    return reply(elements.find(e => e.id == id))
  } else {
    return reply(elements)
  }
}

const buildCreateOrUpdateResponse = (request, reply, elements) => {
    if (request.params.id) {
      const id = encodeURIComponent(request.params.id)
      elements = utils.updateEntityAt(request.payload.id, request.payload, elements)
      return reply().code(204)
    } else {
      elements = utils.createEntity(request.payload, elements)
      return reply(elements[elements.length - 1]).code(201)
    }
}

module.exports = {
    buildGetResponse,
    buildCreateOrUpdateResponse
}