var compressor = require('node-minify');

// Using YUI Compressor for JS 
new compressor.minify({
  type: 'uglifyjs',
  fileIn: 'src/n2vi.js',
  fileOut: './public/n2vi.min.js',
  callback: function(err, min){
    console.log(err);
    //console.log(min); 
  }
});


