const bubbleTxt = require('../helpers/bubbleTxt.js')
const rmElement = require('../helpers/rmElement.js')

/**
 * highlights attribute patterns of nodes
 *
 * @param {Object} cy cytoscape
 */
module.exports = function patterns (cy) {
  // search pattern
  const searchPattern = (pattern) => {
    // flagged attributes
    let flaggedNodes = ''
    // apply the faded class to all the elements
    cy.elements().addClass('faded')

    // check all the nodes in graph for the search terms
    cy.nodes().forEach((node) => {
      const nodeData = node.data().asto
      Object.keys(nodeData).forEach((value) => {
        pattern.forEach((i) => {
          if (nodeData[value] === i) {
            flaggedNodes += `• ${node.data().label} -> ${i}\n`
            // remove faded class from the search nodes
            node.removeClass('faded')
          }
        })
      })
    })

    bubbleTxt(flaggedNodes)
  }

  const htmlElement = document.getElementById('message-area-id')

  // create the pattern element
  const form = document.createElement('form')
  form.className = 'bubble'
  form.id = 'form-id'

  const label = document.createElement('label')
  label.textContent = 'keywords (spaces): '

  const input = document.createElement('input')
  input.className = 'input-form'
  input.id = 'pattern-id'
  input.type = 'text'

  form.appendChild(label)
  form.appendChild(input)

  // create a submit button
  const submit = document.createElement('input')
  submit.className = 'submit-form'
  submit.type = 'submit'
  submit.value = 'search'

  form.appendChild(submit)
  htmlElement.appendChild(form)

  const formId = document.getElementById('form-id')
  formId.onsubmit = () => {
    const keywords = document.getElementById('pattern-id')
    const pattern = `${keywords.value}`.split(' ')

    rmElement('message-area-id', 'form-id')

    searchPattern(pattern)
  }

  // focus on the user input form
  document.getElementById('pattern-id').focus()
}
