const  { Menu , app} = require('electron');
const fs = require('fs');
const shell = require('electron').shell;
const MenuMethods = require('./appmenumethods');

const setwindowMenu = (electronWindow) => {
Menu.setApplicationMenu(null);
const menu = Menu.buildFromTemplate([
    { label :"Tools", submenu : [      
        { label:"Save page to PDF", click() { MenuMethods.SaveToPdf(electronWindow) } },   
        { 
          label:"Get Colors",click() {        
          let colors = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
          electronWindow.webContents.send('getcolors',colors);
        }},     
        { label:"Open Dev Tools",click() { electronWindow.webContents.openDevTools(); }},    
        { label:"Quit",click() { app.quit();}},
        { type: 'separator'},
        { label:"DM88's Website",click() { shell.openExternal('https://diegomary.github.io');}}   
      ]    
    },
    { label :"Info", submenu : [ /* TO DO */  ]    
  }

]);
return menu;

}
module.exports = setwindowMenu;
