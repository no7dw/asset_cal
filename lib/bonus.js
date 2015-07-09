// bonus.js
var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter;
var mathjs = require('mathjs');
var Asset = require('./asset').Asset;
var bonus = new Asset();
function Bonus(){    

}

//继承
inherits(Bonus, Asset);
inherits(Bonus, EventEmitter);

Bonus.prototype.cal = function(bonus, cb){
  bonus.cal();
};

Bonus.prototype.calArray = function(bonusArray, cb){
  bonus.calArray();
};