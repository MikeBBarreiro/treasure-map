'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    home           = require('../controllers/home'),
    treasures      = require('../controllers/treasures');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);

//treasures
  app.get('/treasures/new', treasures.init);
  app.get('/treasures', treasures.index);
  app.post('/treasures', treasures.create);
  app.get('/treasures/:id', treasures.show);
  app.post('/treasures/:id/found', treasures.found);

  console.log('Express: Routes Loaded');
};

