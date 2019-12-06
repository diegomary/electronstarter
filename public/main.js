const  { app,ipcMain,globalShortcut} = require('electron');
const fs = require('fs')


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

  event.sender.getOwnerBrowserWindow().webContents.print({silent:true, printBackground:true})
  event.sender.getOwnerBrowserWindow().webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('Write PDF successfully.')
    })
  })

  console.log(color);  
  event.sender.send("acquired", `color ${color} has been acquired`);

});
