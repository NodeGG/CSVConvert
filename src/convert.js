// IMPORTS
const csvjson = require("csvjson");
const fs = require('fs');
const path = require('path');

////////////////////////////
const convertJson = (filePath) => {
	// reads data
	var data = fs.readFileSync(filePath, {
		encoding: 'utf8'
	});
	// options
	var options = {
		delimiter: ',', // optional
		quote: '"' // optional
	};
	//Creates json
	const jsonArray = csvjson.toObject(data, options);
	return jsonArray;
};

module.exports = convertJson;
