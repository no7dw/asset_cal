// bonus.js
var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter;
var mathjs = require('mathjs');
var Asset = require('./asset').Asset;

function Bonus(){    

}

//继承
inherits(Bonus, Asset);
inherits(Bonus, EventEmitter);

Bonus.prototype.cal = function(bonus, cb){

};

Bonus.prototype.calArray = function(bonusArray, cb){
	
};