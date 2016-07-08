'use strict'

/**
 * Created by dengwei on 10/10/15.
 */
const baseAsset = require('./asset');
const BaseAsset = new baseAsset();
const timeDeposit = require('./timeDeposit');
const TimeDeposit = new timeDeposit();
//const bonus = require('./asset').bonus;
const assembleService = require('./assemble');

class AssetFactory{
  constructor(){
    this.assetClass = BaseAsset;
  }
  

  _createAsset(assetOptions){
  if( 'demandDeposit' ==  assetOptions.assetType )
    this.assetClass = BaseAsset;
  else if( 'timeDeposit' ==  assetOptions.assetType )
    this.assetClass = TimeDeposit;
  //else if( 'bonus' ==  assetOptions.assetType )//未实现
  //  this.assetClass = bonus;
  return this.assetClass;

  }
  cal(asset, specTime){
    const assetClassObj = this._createAsset(asset);
    return assetClassObj.cal(asset, specTime);
  }

  assemble(portfolio, asset){
    return assembleService.assemble(portfolio, asset);
  }

};

module.exports = AssetFactory;

