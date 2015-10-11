/**
 * Created by dengwei on 10/10/15.
 */
var asset = require('./asset').Asset;
var timeDeposit = require('./timeDeposit').timeDeposit;
var bonus = require('./asset').bonus;


function AssetFactory(){

};
AssetFactory.prototype.assetClass = 'asset';

AssetFactory.prototype.createAsset = function(assetOptions){
  if( 'demandDeposit' ==  assetOptions.assetType )
    this.assetClass = asset;
  else if( 'timeDeposit' ==  assetOptions.assetType )
    this.assetClass = timeDeposit;
  else if( 'bonus' ==  assetOptions.assetType )
    this.assetClass = bonus;

  return new this.assetClass(assetOptions);

};
module.exports = AssetFactory;

//usage:
//var af = require('./lib/assetFactory')
//var b = new af({rate:0.01})
//or
var b = new AssetFactory({rate:0.01})
b.createAsset({assetType:"demandDeposit"})
var asset = {

};
b.cal(asset);
