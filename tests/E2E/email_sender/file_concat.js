var fs = require('fs');
var i = 0;
var version = new Array();

// Verify the existence of Mocha Reporter

var cssFile = '';
var jsFile = '';
var htmlFile = '';

/*// concatenate css and js files in a single html file
function processFile() {
  jsFile = "<script type='text/javascript'>" + jsFile + "</script></body>";
  cssFile = "<style type='text/css'>" + cssFile + "</style>";

  fs.writeFile("test_report.html", htmlFile, function (err) {

    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });}*/



// read content of Js file
jsFile = fs.readFileSync('../mochawesome-report/assets/app.js').toString();

// read content of CSS file
cssFile = fs.readFileSync('../mochawesome-report/assets/app.css').toString();

// read content of Html file
htmlFile = fs.readFileSync('../mochawesome-report/mochawesome.html').toString();


htmlFile = htmlFile.replace('<link rel="stylesheet" href="../mochawesome-report/assets/app.css"/>', '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' + cssFile);
htmlFile = htmlFile.replace('</body>', jsFile);

fs.writeFile("test_report.html", htmlFile, function (err) {

  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});



//processFile();