'use strict';
var gutil = require('gulp-util');
var File = gutil.File;
var through = require('through2');
var SVGO = require('svgo');
var path = require("path")


/**
 * File must be a buffer and not a string.
 * @param {string} file Name of the output compressed JSON file.
 * @param {Object} opts Other options (not yet used).
 */
module.exports = function(file, opts) {
  if (!file) {
    throw new PluginError(
        'gulp-svg-json-spritesheet',
        'Missing parameter file for gulp-svg-json-spritesheet');
  }

  opts = opts || {};
  var spritesheet = {};
  var svgCompressor = new SVGO();

  function compressEachFile(file, encoding, callback) {
    if (file.isNull()) {
      callback(null, file);
      return;
    }

    if (file.isStream()) {
      callback(new gutil.PluginError(
          'gulp-svg-json-spritesheet', 'Streaming not supported'));
      return;
    }

    try {
      svgCompressor.optimize(file.contents.toString(), function(result) {
        var filePath = file.path;
          var fileName
          if(opts.basePath){
              fileName = filePath.replace(path.resolve(opts.basePath)+"/","").replace("/",opts.delim);
          }else{
              fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
          }
          if(opts.short){
              fileName =   fileName.replace(".svg","")
          }
          if(opts.delim){
              fileName =   fileName.replace("/",opts.delim);
          }
        spritesheet[fileName] = result;
      });
    } catch (error) {
      this.emit('error', new gutil.PluginError('gulp-svg-json-spritesheet', error));
    }

    callback();
  }

  /**
   * Once all files have been compressed, return compressed JSON file.
   * @param {Function} callback
   */
  function convertToJson(callback) {
    var output = new File(file);
    output.contents = new Buffer(JSON.stringify(spritesheet, null, '\t'));
    output.path = file;
    this.push(output);
    callback();
  }

  return through.obj(compressEachFile, convertToJson);
};
