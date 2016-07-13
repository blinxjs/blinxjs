// Build Blinx src
// npm install in all examples
// webpack in all examples
// run lint
// run test
// WIP

var sys = require("util");
var path = require("path");
var fs = require("fs");
var exec = require("child_process").exec;

var CONST = {
	"examples": path.join(__dirname, "examples")
};


var script = "npm run build; \n";


function puts(error, stdout, stderr) {
	console.error(error);
	console.log(stdout);
	console.error(stderr);
}

function getDirectories(srcpath) {
	return fs.readdirSync(srcpath).filter(function (file) {
		return fs.statSync(path.join(srcpath, file)).isDirectory();
	});
}

function fileExists(filePath) {
	try {
		return fs.statSync(filePath).isFile();
	}
	catch (err) {
		return false;
	}
}


getDirectories(CONST.examples).forEach(function (directory) {
	var fullPath = path.join(CONST.examples, directory);

	//if(fileExists(path.join(fullPath, "package.json"))){
	//	script += "cd "+ fullPath + " \n";
	//	script += "rm -rf node_modules; \n";
	//	script += "npm install; \n";
	//}

	if(fileExists(path.join(fullPath, "webpack.config.js"))){
		script += "cd "+ fullPath + " \n";
		script += "webpack; \n";
	}
});

console.log("Running...");
exec(script, puts).stdout.pipe(process.stdout);
