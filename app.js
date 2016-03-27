var pug = require('pug');

var globals = {
  headTitle: "Test"
}

var html = pug.renderFile('index.pug', globals);
