const fs = require('fs');
const deleteStorage = (filePath) => {
	fs.access(filePath, error => {
		if (!error) {
			fs.unlink(filePath, (error) => console.log(error));
		} else {
			console.log(error);
		}

	})
};
module.exports = deleteStorage;
