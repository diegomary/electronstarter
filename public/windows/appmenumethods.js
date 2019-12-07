const  {dialog ,BrowserWindow} = require('electron');
const fs = require('fs');

const SaveToPdf = (window) => {        
        dialog.showSaveDialog(BrowserWindow.getFocusedWindow(),
        {title:"Save Pdf file",filters:[{name: "Adobe Pdf", extensions:['pdf']}]}).then
        ((filePath,canceled,bookmark) => {
            if(canceled) return;           
            window.webContents.printToPDF({
                pageSize: 'Letter'
              }).then(data => {
                fs.writeFile(filePath.filePath, data, (err) => {
                  if (err) throw err
                  console.log('PDF success!')
                })});
            })
        }
module.exports = {
    SaveToPdf: SaveToPdf   
}
