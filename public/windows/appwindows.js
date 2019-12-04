const  { BrowserWindow,globalShortcut } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const setwindowMenu = require('./appmenu');


let mainWindow;
const createMainWindow = () => {
    globalShortcut.register('f5', () => {console.log('f5 is pressed');	mainWindow.reload();});
      globalShortcut.register('CommandOrControl+R', () => {	console.log('CommandOrControl+R is pressed');	mainWindow.reload();});
      mainWindow = new BrowserWindow({
      backgroundColor: '#2e2c29',
      show:false,
      width: 800,
      height: 600,
      webPreferences: { nodeIntegration: true}   
    });
    
    mainWindow.setMenu(setwindowMenu(mainWindow));  

   
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../build/index.html')}`);
    mainWindow.title="Example of Electron by Diego"; 
    mainWindow.on('closed',  () =>  mainWindow = null);
    mainWindow.on('ready-to-show', () => mainWindow.show());
  
  }

  module.exports = createMainWindow;
