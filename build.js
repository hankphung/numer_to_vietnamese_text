var compressor = require('node-minify');

new compressor.minify({
  type: 'yui-css',
  fileIn: ['src/viewer.css','src/append.css'],
  fileOut: './public/viewer.css',
  callback: function(err, min){
    console.log(err);
    //console.log(min); 
  }
});
 
// Using YUI Compressor for JS 
new compressor.minify({
  type: 'uglifyjs',
  fileIn: 'src/viewer.js',
  fileOut: './public/viewer.js',
  callback: function(err, min){
    console.log(err);
    //console.log(min); 
  }
});
// Using YUI Compressor for JS 
new compressor.minify({
  type: 'uglifyjs',
  fileIn: 'src/l10n.js',
  fileOut: './public/l10n.js',
  callback: function(err, min){
    console.log(err);
    //console.log(min); 
  }
});

// Using YUI Compressor for JS 
new compressor.minify({
  type: 'uglifyjs',
  fileIn: 'src/debugger.js',
  fileOut: './public/debugger.js',
  callback: function(err, min){
    console.log(err);
    //console.log(min); 
  }
});


/*

// Using YUI Compressor for JS 
new compressor.minify({
  type: 'uglifyjs',
  fileIn: 'src/pdf.worker.js',
  fileOut: './public/build/pdf.worker.js',
  callback: function(err, min){
    console.log(err);
    //console.log(min); 
  }
});
// Using YUI Compressor for JS 
new compressor.minify({
  type: 'uglifyjs',
  fileIn: 'src/pdf.js',
  fileOut: './public/build/pdf.js',
  callback: function(err, min){
    console.log(err);
    //console.log(min); 
  }
});

