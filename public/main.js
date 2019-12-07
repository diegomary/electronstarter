const  { app,ipcMain,globalShortcut} = require('electron');
const fs = require('fs');
const path = require('path');
const Windows = require('./windows/appwindows');
// to get the node version and work with the correct node version in order not to recompile native modules
console.log(JSON.stringify(process.versions));

app.on('ready', Windows.createMainWindow);
app.on('window-all-closed',  () =>{
   if (process.platform !== 'darwin') app.quit();
   Windows.mainWindow = null;
  
  });
app.on('activate',  () => {
   if (Windows.mainWindow === null) Windows.createMainWindow();
  });

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  console.log("Shortcut unregistered");
});

ipcMain.on('acquire_color', (event, color) => {
    console.log(color);  
    event.sender.send("acquired", `color ${color} has been acquired`);

})





