// helper function to save graphs

const bubbleTxt = require('./bubbleTxt.js')
const jsonfileWrite = require('jsonfile').writeFile
const { dialog } = require('@electron/remote')

const updateTittle = (file) => {
  const titleFilePath = document.getElementById('title-file-path-id')
  titleFilePath.textContent = ` ~/${file}`
}

/**
 * saves graph
 *
 * @param {Object} cy cytoscape instance
 */
module.exports = function save (cy) {
  // parses graph and stores it as an object
  const fullGraph = cy.json()

  dialog
    .showSaveDialog({
      filters: [
        {
          name: 'javascript',
          extensions: ['json']
        }
      ]
    })
    .then((result) => {
      jsonfileWrite(result.filePath, fullGraph, (err) => {
        if (err) {
          dialog.showErrorBox('Error while saving the file', err.message)
        } else {
          updateTittle(result.filePath)
        }
        bubbleTxt('graph saved\n👍')
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
