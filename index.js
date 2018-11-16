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
/*----------
SRC Imports
 ------------*/
// Main Client
const main = require('./src/main');
/////////////////////////

//Server Config
const hostname = 'localhost';
const port = 8000 || 8000 + Math.floor((Math.random() * 100));

//Gets HTML File
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html', 'src');
});

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
