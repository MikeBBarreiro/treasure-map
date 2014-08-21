/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure    = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'template-test',
    Mongo     = require('mongodb');

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure', function(){
      var t = {name:'Gold', Location:'Nevada', difficulty:'easy', hint:'In the cave near a camp', photo:'http://wanderinggenie.files.wordpress.com/2012/06/playa-del-carmen-underground-cave.jpg', found: false},
       gold = new Treasure(t);
      expect(gold).to.be.instanceof(Treasure);
      /*expect(gold.name).to.equal('Gold');
      expect(gold.Location).to.equal('Nevada');
      expect(gold.difficulty).to.equal('easy');
      expect(gold.hint).to.equal('In the cave near a camp');
      expect(gold.photo).to.equal('http://wanderinggenie.files.wordpress.com/2012/06/playa-del-carmen-underground-cave.jpg');*/
    });
  });

  describe('.all', function(){
    it('should find all treasure', function(done){
      Treasure.all(function(err, treasures){
        expect(treasures).to.have.length(1);
        done();
      });
    });
  });

  describe('.create', function(){
    it('Should create a treasure', function(done){
      var t = {name:'Gold', Location:'Fallon, Nevada', lat:39.474869, lng:-118.777041, difficulty:'easy', hint:'In the cave near a camp', photo:'http://wanderinggenie.files.wordpress.com/2012/06/playa-del-carmen-underground-cave.jpg'},
      gold = new Treasure(t);
      Treasure.create(gold, function(err, treasures){
        expect(treasures._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a treasure by id', function(done){
      Treasure.findById('000000000000000000000001', function(treasure){
        var t = {name:'Gold', Location:'Nevada', difficulty:'easy', hint:'In the cave near a camp', photo:'http://wanderinggenie.files.wordpress.com/2012/06/playa-del-carmen-underground-cave.jpg'},
        gold = new Treasure(t);
        expect(gold).to.be.instanceof(Treasure);
        expect(gold.name).to.equal('Gold');
        done();
      });
    });
  });
});

