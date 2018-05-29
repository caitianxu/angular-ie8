var fs = require('fs');
var jsp = require("../lib/parse-js");
var pro = require("../lib/process");
function uglify(orig_code, options) {
  options || (options = {});
  var jsp = uglify.parser;
  var pro = uglify.uglify;
  var ast = jsp.parse(orig_code, options.strict_semicolons); // parse code and get the initial AST
  ast = pro.ast_mangle(ast, options.mangle_options); // get a new AST with mangled names
  ast = pro.ast_squeeze(ast, options.squeeze_options); // get an AST with compression optimizations
  var final_code = pro.gen_code(ast, options.gen_options); // compressed code here
  return final_code;
};
function buildOne(flieIn, fileOut) {
  var origCode = fs.readFileSync(flieIn, 'utf8');
  var ast = jsp.parse(origCode);
  ast = pro.ast_mangle(ast);
  ast = pro.ast_squeeze(ast);
  var finalCode = pro.gen_code(ast);
  fs.writeFileSync(fileOut, finalCode, 'utf8');
}

//文件压缩列表
buildOne('src/views/index/page.js', 'dist/views/index/page.min.js');
buildOne('src/views/info/page.js', 'dist/views/info/page.min.js');