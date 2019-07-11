const bubbleTxt = require('../helpers/bubbleTxt.js')
const addEdge = require('../core/addEdge.js')

/**
 * adds state diagram edge types based on the source and target nodes
 *
 * @param {object } cy cytoscape instance
 * @param {string } srcNode source node
 * @param {string} trgNode target node
 */
module.exports = function addStateEdge (cy, srcNode, trgNode) {
  const srcNodeId = srcNode.id
  const trgNodeId = trgNode.id
  const srcNodeCpt = srcNode.asto.concept
  const trgNodeCpt = trgNode.asto.concept

  switch (true) {
    case srcNodeCpt === 'model' && trgNodeCpt === 'model':
      addEdge(cy, srcNodeId, trgNodeId, 'description')
      break
    default:
      bubbleTxt(`${srcNodeCpt} → ${trgNodeCpt}\nnot allowed 😔`)
  }
}
