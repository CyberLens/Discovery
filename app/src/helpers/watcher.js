// watch the graph for changes
const { dialog } = require('@electron/remote')
const path = require('path')

let changeToken = false

/**
 * watch the graphs nodes for changes
 *
 * @param {Object} graphNodes nodes of the graph
 * @param {Object} cy cytoscpe instance
 */
const nodes = (graphNodes, cy) => {
  const titleFilePath = document.getElementById('title-file-path-id')

  if (graphNodes.same(cy.nodes()) === false && changeToken === false) {
    titleFilePath.innerHTML +=
      "<span style='color: var(--blue-color);'> •</span>"
    changeToken = true
  } else if (graphNodes.same(cy.nodes()) === true && changeToken === true) {
    titleFilePath.innerHTML = titleFilePath.innerHTML.replace(' •', ' ')
    changeToken = false
  }
}

// watcher for changes in the edges
// const edges = (graphEdges, cy) => {
//   const titleFilePath = document.getElementById('title-file-path-id')
//
//   if (
//     graphEdges.same(cy.edges()) === false &&
//     titleFilePath.innerText !== `${titleFilePath.innerHTML} *`
//   ) {
//     // add the files path to the title bar
//     titleFilePath.innerHTML += ` *`
//   } else if (graphEdges.same(cy.edges()) === false) {
//     titleFilePath.innerHTML = titleFilePath.innerHTML
//   } else {
//     titleFilePath.innerHTML = titleFilePath.innerHTML.replace(' *', ' ')
//   }
// }

/** checks for changes in the model before navigating to the index.html */
const closeNotification = () => {
  const homeWindowURL = path.join(
    'file://',
    __dirname,
    '/../../static/index.html'
  )
  if (changeToken === true) {
    dialog
      .showMessageBox({
        message: 'Do you want to navigate to the Home menu?',
        buttons: ['No', 'Yes']
      })
      .then((response) => {
        // if the response is 'Yes' navigate to the index.html
        if (response.response === 1) {
          window.location.href = homeWindowURL
        }
      })
      .catch((err) => {
        console.log(err)
      })
    // when there no changes in the model navigate to index.html without prompting
  } else {
    window.location.href = homeWindowURL
  }
}

module.exports = {
  nodes: nodes,
  // edges,
  closeNotification: closeNotification
}
