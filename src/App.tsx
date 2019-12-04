import React ,{useEffect,useState }from 'react';
import logo from './logo.svg';
import './App.css';
const electron = window.require('electron');
//const fs = electron.remote.require('fs');
const { remote } = window.require('electron')
const { BrowserWindow,Menu,dialog } = remote;
const ipcRenderer  = electron.ipcRenderer;
//const fs = window.require('fs');
//const util =window.require('util');

const App: React.FC = () => {

  const [colors, setColors] = useState([]);
  const [test, setTest] = useState([0]);
  const  render = (event:any, msg:any) => { setColors(msg); };
  const  notify = (event:any, notification:any) => {console.log(notification);}; 
  
  
  // const readFilePromise = (...args:any) => {
  //     return new Promise ((resolve, reject) => {
  //       fs.readFile(...args, (err:any, data:any) => {
  //         if (err) return reject(err)
  //         resolve(data)
  //         }); 
  //     })
  // }

    // readFilePromise('./data.json', {})
    // .then(data => {  console.log(JSON.parse(data as string ),"without promisify");   })
    // .catch(err => { console.log(err) })


    // const readFilePromise1 = util.promisify(fs.readFile)
    // readFilePromise1('./data.json', {})
    // .then((data: string) => {  console.log(JSON.parse(data as string),"with promisify");   })
    // .catch((err: any) => { console.log(err) })


  useEffect(() => {

    ipcRenderer.on('acquired',notify);
    console.log("firing");
    return function cleanup() { ipcRenderer.removeAllListeners(['acquired']);};   
    
  });  

  useEffect(() => {

    ipcRenderer.on('getcolors',render); 
    console.log(colors);  
    return function cleanup() { ipcRenderer.removeListener('getcolors',render);};   
    
  },[colors]);

  useEffect(() => {console.log("test is changing once");},[test]);
  const getColorData = (color:string):void => { ipcRenderer.send("acquire_color", color);

  const mainWindow = new BrowserWindow({
    title:"Hello by Diego",
    backgroundColor: '#2e2c29',
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true}   
  })

  //mainWindow.setMenu(menu);

  //mainWindow.setProgressBar(0.5)




}

  return (  

    <div className="App">
      <header className="App-header">        
      {colors.map((e:any, index) => {
      return (   
      
        <div key={index}>
          <p >{e.color}&nbsp;<button onClick={ () => getColorData(e.color) }>{e.color}</button></p>    
        </div>     
      
      )})}
      </header>
    </div>
  );
}

export default App;
