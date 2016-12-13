# gulp-svg-json-spritesheet

> Using this plugin, you'll be able to compress SVGs into a JSON spritesheet file.


## Install

```
$ npm install --save-dev gulp-svg-json-spritesheet
```


## Usage

```js
var gulp = require('gulp');
var svg = require('gulp-svg2json');

gulp.task('default', function() {
  return gulp.src('svg/*.svg')
      .pipe(svg('out.json',{basePath:"images",noExt:true,delim:"_"}))
      .pipe(gulp.dest('./'));
});
```

In the above example, all the SVGs in the image folder will be compressed and saved to compressed.json (sample output below).

### Sample Output


images/svg/fireplace_00000.svg
images/svg2/fireplace_00001.svg
will result in 

```json
{
  "svg_fireplace_00000": {
    "data": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"269\" height=\"393\" viewBox=\"0 0 269 393\">...</g></svg>",
    "info": {
      "width": "269",
      "height": "393"
    }
  },
  "svg2_fireplace_00001": {
    "data": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"269\" height=\"393\" viewBox=\"0 0 269 393\">...</g></svg>",
    "info": {
      "width": "269",
      "height": "393"
    }
  }
}
```
### Options
##### basePath 
basepath sets the part of the relative Path to be removed from the object key  

## API

### excelsheets2json([options])

#### options.basepath
Type: `string`

Default: ``

sets the part of the relative Path to be removed from the object key  
images/svg with "images" will result in svg

#### options.delim
Type: `string`

Default: `-`

sets the path delimiter

#### options.noExt
Type: `bolean`

Default: `false`

should the .svg extension be removed from rom the object key
## License

MIT © flomair
