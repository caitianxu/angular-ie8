var fs = require('fs');
var join = require('path').join;
var uglifyjs = require('uglify-js');
var uglifycss = require('uglifycss');

var colors = require('colors');  

/**
 * 全目录文件检索
 * @param {根路径} startPath 
 */
function findSync(startPath) {
  let result = [];

  function finder(path) {
    let files = fs.readdirSync(path);
    files.forEach((val, index) => {
      let fPath = join(path, val);
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) {
        if (fPath.indexOf('.css') != -1) {
          minifyCss(fPath);
          result.push(fPath);
        } else if (fPath.indexOf('.js') != -1) {
          minifyJs(fPath);
          result.push(fPath);
        }
      };
    });
  }
  finder(startPath);
  return result;
}

function minifyJs(file) {
  var code = fs.readFileSync(file, 'utf-8');
  var minifyCode = uglifyjs.minify(code).code;
  console.log((file + '---------压缩完成').rainbow);
  fs.writeFileSync(file.replace('src', 'dist').replace('.js', '.min.js'), minifyCode);
  var cc = uglifycss.processFiles(['src/views/index/page.css']);
}

function minifyCss(file) {
  var minifyCode = uglifycss.processFiles([file]);
  console.log((file + '---------压缩完成').rainbow);
  fs.writeFileSync(file.replace('src', 'dist').replace('.css', '.min.css'), minifyCode);
}
findSync('src/views/');
console.log('================================================================================='.green)
console.log('================================================================================='.green)
console.log('===================================工程编译完成=================================='.green)
console.log('================================================================================='.green)
console.log('================================================================================='.green)