const fs = require('fs');
var path = require('path');

const CONTAINER_PATH = '';//'https://static.jetblue.com/ea2c0ea1a08add3a7527/trueblue/signup';
const DIST_PATH = 'dist/peacock-signup';
const IGNORE_SCRIPTS = ['appdynamics.com'];

// CREATE FOLDER STRUCTURE
[
  DIST_PATH + '/images',
  DIST_PATH + '/css',
  DIST_PATH + '/fonts',
  DIST_PATH + '/js',
  DIST_PATH + '/html'
].forEach(dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}});

fs.readFile(DIST_PATH + '/index.html', 'utf-8', (err, html) => {
  if (err) {
    console.error(err);
    return;
  }

  // 1. UPDATE SCRIPTS
  const scripts = html.match(/src="([^"]+\.js)"/g); // get all script tags SRCs
  scripts && scripts.forEach(script => {
    const pathPrefix = CONTAINER_PATH + '/js/';

    const scriptName = script.match(/["\/]([^"\/]*\.js)/)[1]; // get only script name regardless path
    if (!IGNORE_SCRIPTS.find(ignoreScript => script.indexOf(ignoreScript) !== -1)) { // if script is not in ignore
      html = html.replace(script, `src="${pathPrefix}${scriptName}"`)
    }
  });

  // 2. UPDATE STYLESHEETS
  const stylesheets = html.match(/href="([^"]+\.css)"/g); // get all script tags SRCs
  stylesheets && stylesheets.forEach(stylesheet => {
    const pathPrefix = CONTAINER_PATH + '/css/';

    const stylesheetName = stylesheet.match(/["\/]([^"\/]*\.css)/)[1]; // get only script name regardless path

    html = html.replace(stylesheet, `href="${pathPrefix}${stylesheetName}"`)
  });

  // 3. UPDATE FAVICON
  html = html.replace('href="favicon.ico"', `href="${CONTAINER_PATH}/images/favicon.ico"`)

  // 4. WRITE IT BACK TO HTML FILE
  fs.writeFile(DIST_PATH + '/html/index.html', html, err => {
    if (err) {
      console.error(err);
    }
  });
});

// MOVE FILES TO THEIR CORRESPONDING FOLDERS RECURSIVELY

// Recursive folder read stolen from https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

walk(DIST_PATH, (err, files) => {
  const IMAGE_FORMATS = [
    'jpeg',
    'png',
    'gif',
    'webp',
    'avif',
    'svg',
    'ico',
  ];

  const FONT_FORMATS = [
    'ttf',
    'otf',
    'woff',
    'woff2',
    'eot',
  ];

  files.forEach(file => {
    const fileName = file.match(/[^\/]+$/)[0]; // everything after last slash
    const fileFormat = file.match(/[^\.]+$/)[0]; // everything after last dot

    if (fileFormat === 'js') {
      fs.rename(file, DIST_PATH + '/js/' + fileName, err => err && console.error(err));
    }

    if (fileFormat === 'css') {
      fs.rename(file, DIST_PATH + '/css/' + fileName, err => err && console.error(err));
    }

    if (IMAGE_FORMATS.includes(fileFormat)) {
      fs.rename(file, DIST_PATH + '/images/' + fileName, err => err && console.error(err));
    }

    if (FONT_FORMATS.includes(fileFormat)) {
      // putting fonts to CSS cos they are coming from NPM package and are relative to CSS file
      fs.rename(file, DIST_PATH + '/css/' + fileName, err => err && console.error(err));
    }
  });
});
