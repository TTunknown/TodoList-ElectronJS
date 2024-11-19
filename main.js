const { app, BrowserWindow } = require('electron')

function createWindow() {
  const wind = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  wind.loadFile('index.html')
}

app.whenReady().then(createWindow)
