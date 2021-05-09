const { BrowserWindow } = require('@electron/remote')

// metamodels' figure location
const dgnMeta = 'metamodels/dgn-model.png'
const impMeta = 'metamodels/imp-model.png'

// create the path to the metamodels
const metamodelPath = __dirname.split('/')
metamodelPath.pop() // removes the core directory
metamodelPath.pop() // removes the src directory
const finalPath = `file://${metamodelPath.join('/')}`

// creates the window for the metamodel
const createWindow = (URL) => {
  let win = new BrowserWindow({
    backgroundColor: '#282c34',
    width: 900,
    height: 700,
    show: false,
    webPreferences: {
      nodeIntegration: false
    }
  })
  win.loadURL(`${finalPath}/${URL}`)

  win.on('ready-to-show', () => {
    win.show()
    win.focus()
  })

  win.on('closed', () => {
    win = null
  })
}

// check if an active metamodel exists
const metamodelIsActive = (URL) => {
  let isWindowActive = false
  const activeWins = BrowserWindow.getAllWindows()
  Object.values(activeWins).forEach((activeWin) => {
    if (activeWin.getURL() === `${finalPath}/${URL}`) {
      isWindowActive = true
      if (activeWin.isMinimized() === true) {
        activeWin.restore()
      }
    }
  })
  if (isWindowActive === false) {
    createWindow(URL)
  }
}

/**
 * shows the current phase's metamodel in a separate window
 *
 * @param {string} phase engineering phase (design, implementation, state)
 */
module.exports = async function showMetamodel (phase) {
  // checks for the phase to show the correct metamodel
  if (phase === 'design') {
    metamodelIsActive(dgnMeta)
  } else if (phase === 'implementation') {
    metamodelIsActive(impMeta)
  }
}
