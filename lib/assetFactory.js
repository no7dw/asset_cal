/**
 * Created by dengwei on 10/10/15.
 */
var baseAsset = require('./asset').Asset;
var timeDeposit = require('./timeDeposit').timeDeposit;
var bonus = require('./asset').bonus;
var assembleService = require('./assemble');

function AssetFactory(){

};
AssetFactory.prototype.assetClass = baseAsset;

AssetFactory.prototype._createAsset = function(assetOptions){
  if( 'demandDeposit' ==  assetOptions.type )
    this.assetClass = baseAsset;
  else if( 'timeDeposit' ==  assetOptions.type )
    this.assetClass = timeDeposit;
  else if( 'bonus' ==  assetOptions.type )
    this.assetClass = bonus;
  return new this.assetClass(assetOptions);

};
AssetFactory.prototype.cal = function(asset){
  var assetClassObj = this._createAsset(asset);
  return assetClassObj.cal(asset);
};

AssetFactory.prototype.assemble = function(portfolio, asset){
  return assembleService.assemble(portfolio, asset);
};
module.exports = AssetFactory;

