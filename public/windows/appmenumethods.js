const  {dialog } = require('electron');
const voice1 = () => {
  
    dialog.showOpenDialog (
        {  title:"Open File to elaborate",
        securityScopedBookmarks :true,
        properties: ['openFile', 'createDirectory'],
        filters: [                
        {name: 'Javascript Notation Type', extensions: ['json']},
        {name: 'All Files', extensions: ['*']}
        ]
        }, (filePath,bookmarks ) => {

        if(filePath === undefined) return;
        // Here we can elaborate our file
        console.log("Logic here");
        
        dialog.showSaveDialog( {title:"Save file Vocab",filters:[{name: "Vocab Bixby file", extensions:['vocab.6t']}]},
        (filename) => {
            if(filename === undefined) return;
            writeFile.sync(filename, total);                                
            //win.loadFile('vocabdone.html');
            win.webContents.send('vdone',total);
        });
        }
    ); 

}


module.exports = {
    Voice1: voice1
   
}
