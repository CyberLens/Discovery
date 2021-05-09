const electron = require('electron')
require('@electron/remote/main').initialize()
const ipc = require('electron').ipcMain
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const { writeFile, existsSync, statSync } = require('fs')
const path = require('path')

const appMenu = require('./src/appMenu.js')

// import the default settings of the app
const defaultSettings = require('./src/settings/defaultSettings.js')
// normalize the settings input
const defaultSettingsNormalize = JSON.stringify(defaultSettings.settings)
  .replace(/(?:\\[n])+/g, '\n')
  .replace(/"/g, '')

const userDataPath = app.getPath('userData')

/** write the astoSettings.js to the OS location */
const writeSettings = () => {
  writeFile(
    `${userDataPath}/astoSettings.js`,
    defaultSettingsNormalize,
    err => {
      if (err) throw err
    }
  )
}

// checks if the local astoSettings.js exists
if (existsSync(`${userDataPath}/astoSettings.js`) !== true) {
  writeSettings()
} else if (
  existsSync(`${userDataPath}/astoSettings.js`) === true &&
  statSync(`${userDataPath}/astoSettings.js`).size === 0
) {
  writeSettings()
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// mainWindow.webContents.on('crashed', function () { })

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    backgroundColor: '#282c34',
    width: 1200,
    height: 745,
    minWidth: 800,
    minHeight: 660,
    titleBarStyle: 'hidden',
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: false
    }
  })

  // and load the index.html of the app.
  const windowURL = path.join('file://', __dirname, '/static/index.html')
  mainWindow.loadURL(windowURL)

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  // capture events from the open windows
  ipc.on('window-settings', (event, message) => {
    mainWindow.send('change-settings', message)
  })
  // create the application's menu
  appMenu()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})
