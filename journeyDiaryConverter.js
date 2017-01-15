function leftPad(value) {
    var str = "" + value;
    var pad = "00";
    return pad.substring(0, pad.length - str.length) + str;
}
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
var datesList = new Array();
var inputFolder = './input/';
var outputFolder = './output/';
var fs = require('fs');
var counter = 1;
fs.readdir(inputFolder, function (err, files) {
    files.forEach(function (file) {
        if (file != ".gitignore") {
            var fileContents = require(inputFolder + file);
            var fullDate = new Date(fileContents.date_journal);
            var year = fullDate.getFullYear();
            var month = leftPad(fullDate.getMonth() + 1);
            var day = leftPad(fullDate.getDate());
            var newFileName = year + '-' + month + '-' + day;
            var newFilePath = outputFolder + newFileName + ".md";
            var title = "# " + newFileName + '\n\n';
            fs.stat(newFilePath, function (err, stat) {
                if (contains(datesList, newFileName)) {
                    console.log(newFileName + ': Duplicated.');
                    fs.writeFile(outputFolder + newFileName + '_' + counter + ".md", title + fileContents.text, function (err) { if (err) {
                        return console.log(err);
                    } });
                }
                else {
                    console.log(newFileName + ': OK.');
                    fs.writeFile(newFilePath, title + fileContents.text, function (err) { if (err) {
                        return console.log(err);
                    } });
                }
                counter += 1;
                datesList.push(newFileName);
            });
        }
    });
});
