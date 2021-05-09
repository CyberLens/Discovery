// helper for loading saved graphs

const { dialog } = require('@electron/remote')
const initialize = require('../initialize.js')
const cyOptions = require('./cyOptions.js')

/**
 * loads graphs in js or json format
 *
 * @param {object} cy cytoscape instance
 * @param {string} phase engineering phase (design, implementation, state)
 */
module.exports = function load (cy, phase) {
  // check platform
  let dialogOptions = []
  // check the platform
  process.platform === 'darwin'
    ? (dialogOptions = ['openFile', 'openDirectory'])
    : (dialogOptions = ['openFile'])

  dialog
    .showOpenDialog({
      properties: [...dialogOptions],
      filters: [{ name: 'javascript', extensions: ['json', 'js'] }]
    })
    .then((result) => {
      if (result.filePaths === undefined) return

      const fileName = result.filePaths[0]
      cyOptions(cy, fileName) // defines the cy instance
      initialize(cy.out, phase) // links the cy instance with the app
    })
}
