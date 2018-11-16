const fs = require('fs');
const post = (sentData, name) => {
	const jsonFile = `./data/${name}.json`;
	const resultJson = JSON.stringify(sentData);
	fs.writeFileSync(jsonFile, resultJson);
	console.log('done');
};

module.exports = post;
