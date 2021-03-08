const bubbleTxt = require('../helpers/bubbleTxt.js')

/**
 * highlights the nodes that have the search term
 *
 * @param {Object} cy cytoscape instance
 * @param {string} term attribute to be searched
 */
module.exports = function flag (cy, term) {
  let searchNodes = ''

  // apply the faded class to all the elements
  cy.elements().addClass('faded')

  // check all the nodes in graph for the search terms
  cy.nodes().forEach((node) => {
    const nodeData = node.data().asto
    Object.keys(nodeData).forEach((key) => {
      if (nodeData[key] === term) {
        searchNodes += `• ${nodeData.description}\n`
        // remove faded class from the search nodes
        node.removeClass('faded')
      }
    })
  })
  bubbleTxt(searchNodes)
}
