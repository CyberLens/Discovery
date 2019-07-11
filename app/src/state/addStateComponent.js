/**
 * add state diagram nodes in the graph
 *
 * @param {Object} cy cytoscape instance
 * @param {Object} event captured event
 * @param {number} nodeCounter id counter for the nodes
 */
module.exports = function addStateComponent (cy, event, nodeCounter) {
  // get mouse position on click
  // display new node on the left of the menu
  const posX = event.x + 50
  const posY = event.y - 30

  // get the selected concept
  const component = event.target.textContent

  switch (component) {
    case 'model':
      cy.add({
        group: 'nodes',
        data: {
          id: `n${nodeCounter}`,
          label: `${component}`,
          asto: {
            description: '',
            concept: 'model'
          }
        },
        renderedPosition: {
          x: posX,
          y: posY
        }
      })
      break
    case '':
      break
    default:
      console.error('error in addStateComponent.js')
  }
}
