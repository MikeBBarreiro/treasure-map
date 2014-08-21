'use strict';

var _   = require('lodash'),
  Mongo = require('mongodb');

function Treasure(t){
  this.name       = t.name;
  this.Location   = t.location;
  this.lat        = t.lat *1;
  this.lng        = t.lng *1;
  this.difficulty = t.diff;
  this.hint       = t.hint;
  this.photo      = t.photo;
  this.found      = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.create = function(t, cb){
  var tres = new Treasure(t);
  Treasure.collection.save(tres, cb);
};

Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id}, function(err, obj){
    var treasure = changePrototype(obj);
    cb(treasure);
  });
};

Treasure.save = function(cb){
  Treasure.collection.save(this, cb);
};

Treasure.prototype.toggle = function(cb){
  this.found = true;
  Treasure.collection.save(this, cb);
};

// private function //

function changePrototype(obj){
  var treasure = _.create(Treasure.prototype, obj);
  return treasure;
}


module.exports = Treasure;
