const { BrowserWindow } = require('@electron/remote')
const path = require('path')

/** creates the settings window */
module.exports = function settingsWindow () {
  const settingsURL = path.join(
    'file://',
    __dirname,
    '/../../../static/settings.html'
  )

  /**
   * creates a new window for the settings
   *
   * @param {string} URL
   */
  const createWindow = (URL) => {
    let win = new BrowserWindow({
      backgroundColor: '#282c34',
      width: 570,
      height: 700,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    })
    win.loadURL(URL)

    win.on('ready-to-show', () => {
      win.show()
      win.focus()
    })

    win.on('closed', () => {
      win = null
    })
  }

  /**
   * check if the settings window is open before creating a new one
   *
   * @param {string} URL
   */
  const windowIsOpen = (URL) => {
    let isWindowActive = false
    const activeWins = BrowserWindow.getAllWindows()
    Object.values(activeWins).forEach((activeWin) => {
      if (activeWin.getURL() === URL) {
        isWindowActive = true
      }
    })
    if (isWindowActive === false) createWindow(URL)
  }
  windowIsOpen(settingsURL)
}
