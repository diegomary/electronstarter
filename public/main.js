const  { app,ipcMain,globalShortcut} = require('electron');


const createMainWindow = require('./windows/appwindows');
// to get the node version and work with the correct node version in order not to recompile native modules
console.log(JSON.stringify(process.versions));

app.on('ready', createMainWindow);
app.on('window-all-closed',  () =>{ if (process.platform !== 'darwin') app.quit();});
app.on('activate',  () =>{ if (mainWindow === null) createMainWindow();});
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  console.log("Shortcut unregistered");
});




ipcMain.on("acquire_color", (event, color) => {
  console.log(color);  
  event.sender.send("acquired", `color ${color} has been acquired`);

});
