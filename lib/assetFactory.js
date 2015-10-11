/**
 * Created by dengwei on 10/10/15.
 */
var baseAsset = require('./asset').Asset;
var timeDeposit = require('./timeDeposit').timeDeposit;
var bonus = require('./asset').bonus;


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

module.exports = AssetFactory;

