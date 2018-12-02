var spritesheet = require('spritesheet-js');

spritesheet('./assets/images/temp/*.png', {format: 'json'}, function (err) {
  if (err) throw err;

  console.log('spritesheet successfully generated');
});
