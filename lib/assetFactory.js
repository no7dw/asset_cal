/**
 * Created by dengwei on 10/10/15.
 */
var baseAsset = require('./asset').Asset;
var BaseAsset = new baseAsset();
var timeDeposit = require('./timeDeposit').timeDeposit;
var TimeDeposit = new timeDeposit();
//var bonus = require('./asset').bonus;
var assembleService = require('./assemble');

function AssetFactory(){

};
AssetFactory.prototype.assetClass = BaseAsset;

AssetFactory.prototype._createAsset = function(assetOptions){
  if( 'demandDeposit' ==  assetOptions.assetType )
    this.assetClass = BaseAsset;
  else if( 'timeDeposit' ==  assetOptions.assetType )
    this.assetClass = TimeDeposit;
  //else if( 'bonus' ==  assetOptions.assetType )//未实现
  //  this.assetClass = bonus;
  return this.assetClass;

};
AssetFactory.prototype.cal = function(asset, specTime){
  var assetClassObj = this._createAsset(asset);
  return assetClassObj.cal(asset, specTime);
};

AssetFactory.prototype.assemble = function(portfolio, asset){
  return assembleService.assemble(portfolio, asset);
};
module.exports = AssetFactory;

