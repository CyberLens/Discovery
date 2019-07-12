// check the graphs for node neighbors
// used to check for mitigated threats (design and implementation) and
// vulnerabilities (implementation)

const bubbleTxt = require('../helpers/bubbleTxt.js')

/**
 * checks if the vulnerabilities are mitigated
 *
 * @param {object} cy cytoscape instance
 * @param {string} attribute1 value to check if mitigated
 * @param {string} attribute2 value to check for mitigation
 */
module.exports = function verification (cy, attribute1, attribute2) {
  const nodeArray = []
  let result = ''
  let connectedNodes = 0
  let concept1 = ''
  let concept1Plural = ''
  let concept2 = ''

  if (attribute1 === 'threat') {
    concept1 = 'Threat'
    concept2 = 'Constraint'
    concept1Plural = 'Threats'
  } else if (attribute1 === 'vulnerability') {
    concept1 = 'Vulnerability'
    concept2 = 'Mechanism'
    concept1Plural = 'Vulnerabilities'
  }

  cy.elements().addClass('faded')

  // highlights the nodes of interest
  cy.nodes().map(node => {
    if (node.data().asto.concept === attribute1) {
      node.removeClass('faded')
      node.addClass('attention')
      nodeArray.push(node)
    }
    if (node.data().asto.concept === attribute2) {
      node.removeClass('faded')
      node.addClass('protect')
    }
  })

  // checks if a node type is connected to another node type
  nodeArray.map(node => {
    const neighbor = node.neighborhood('node')
    neighbor.map(type => {
      if (type.data().asto.concept === attribute2) {
        result = `${result} • ${concept1} ${
          node.data().id
        } mitigated by ${concept2} ${type.data().id}\n`
        connectedNodes += 1
      }
    })
  })
  result = `${result}\n • ${concept1Plural} total: ${nodeArray.length}\n`
  result = `${result} • Mitigated total: ${connectedNodes}\n`
  bubbleTxt(result)

  if (nodeArray.length <= connectedNodes) {
    bubbleTxt(`all ${concept1Plural} mitigated 🎉`)
  }
}
