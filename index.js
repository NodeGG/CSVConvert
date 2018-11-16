/*----------------------------
Node Imports
------------------------------*/
//Socket.io file upload
const siofu = require("socketio-file-upload");
//Express
const express = require('express');
const app = express()
	.use(siofu.router); // Links Socekt io file uploader
//Load HTTP module
const http = require('http').Server(app);
//Socket.io
const io = require('socket.io')(http);
//opn used to open browser
const opn = require('opn');

const fs = require('fs');
const path = require("path");
const electron = require('electron');
/*----------
SRC Imports
 ------------*/
// Main Client
const main = require('./src/main');
/////////////////////////

//Server Config
const hostname = 'localhost';
const port = 8000 || 8000 + Math.floor((Math.random() * 100));
///

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadFile(__dirname + '/public/index.html')

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})


// Actions while user is connected
io.on('connection', (socket) => {
	console.log('connected');
	//Listens to File Upload
	const uploader = new siofu();
	uploader.dir = "./storage";
	uploader.listen(socket);

	// Saving File
	uploader.on("saved", (event) => {
		const success = event.file.success;
		const title = event.file.base;
		const path = event.file.pathName;
		const fileName = event.file.name;
		const filePath = path;
		if (success) {
			main(path, title);
		} else {
			console.log('error');
		}
	});
	//When User Disconnects from Page
	socket.on('disconnect', () => {
		console.log('disconnected');
	});
});
//listen for request on port 3000
http.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
