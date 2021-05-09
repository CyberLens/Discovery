const cytoscape = require('cytoscape')
const { app } = require('@electron/remote')

const userDataPath = app.getPath('userData')
const settings = require(`${userDataPath}/astoSettings.js`)

const graphStyle = require('../settings/graphStyle.js')

/**
 * helper to create cytoscape graphs based on specific options
 *
 * @param {Object} cy cytoscape instance
 * @param {string} file file location
 */
module.exports = function cyOptions (cy, file) {
  const model = require(file)
  // sets the color values of the graph
  graphStyle.setStyle(settings.colorTheme)

  // initializes the cytoscape graph
  cy.out = cytoscape({
    container: document.getElementById('graph-container'),
    autounselectify: true,
    elements: model.elements, // loads the elements object of the graph
    style: graphStyle.style // loads the graph configuration
  })
  // initial graph layout
  const layout = cy.out.layout({
    name: 'breadthfirst'
  })
  layout.run()

  // add the files location to the title bar
  const titleFilePath = document.getElementById('title-file-path-id')
  titleFilePath.textContent = ` ~/${file}`
}
