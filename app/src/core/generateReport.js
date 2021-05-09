const { dialog } = require('@electron/remote')
const { writeFile } = require('fs')
const bubbleTxt = require('../helpers/bubbleTxt.js')
const bubbleHTML = require('../helpers/bubbleHTML.js')

const threatsArray = []
const constraintsArray = []
const mechanismsArray = []
const vulnerabilityArray = []
let buttonCounter = 0

/**
 * generate security report
 *
 * @param {object} cy cytoscape instance
 */
module.exports = function generateReport (cy) {
  cy.nodes().forEach((node) => {
    if (node.data().asto.concept === 'threat') {
      threatsArray.push(node)
    }
    if (node.data().asto.concept === 'constraint') {
      constraintsArray.push(node)
    }
  })

  const reportTittle = '# Security Report\n\n'

  const numberOfComponents = `Number of components: ${
    cy.elements().nodes().length
  }\n`

  const numberOfThreats = `Number of threats: ${threatsArray.length}\n`

  const numberOfVulnerabilities = `Number of Vulnerabilities: ${vulnerabilityArray.length}\n`

  const numberOfTConstraints = `Number of constraints: ${constraintsArray.length}\n`

  const numberOfMechanisms = `Number of mechanisms: ${mechanismsArray.length}\n`

  const dataToWrite = reportTittle
    .concat(numberOfComponents)
    .concat(numberOfThreats)
    .concat(numberOfTConstraints)
    .concat(numberOfMechanisms)
    .concat(numberOfVulnerabilities)

  const saveFile = () => {
    dialog
      .showSaveDialog({
        filters: [
          {
            name: 'markdown',
            extensions: ['md']
          }
        ]
      })
      .then((result) => {
        writeFile(result.filePath, dataToWrite, (err) => {
          if (err) console.error(`Error: ${err.message}`)
        })
        bubbleTxt('security report generated\n👍')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const reportButton = `Do you want to save the security report?<button id='reportButton-${buttonCounter}' class='menu-button' style='color: var(--main-tx-color); background-color: var(--main-bg-color); width: 45px; height: 25px;'>yes</button>`

  bubbleHTML(reportButton)
  document
    .getElementById(`reportButton-${buttonCounter}`)
    .addEventListener('click', () => {
      saveFile()
    })

  buttonCounter += 1
}
