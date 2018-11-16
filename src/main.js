	const convertJson = require('./convert');
	const saveJson = require('./saveJson');
	const deleteStorage = require('./delete');
	const jsdom = require("jsdom");
	const {
		JSDOM
	} = jsdom;
	// converts upload to json
	const main = (file, name) => {
		const convert = convertJson(file); // Convert Function
		deleteStorage(file); // Deletes temp file
		saveJson(convert, name); //Saves Json File
	}

	module.exports = main;
