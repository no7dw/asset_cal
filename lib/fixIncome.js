/**
 * Created by dengwei on 9/10/15.
 */
function fixIncome(portfolioConfig) {
  this.rate = portfolioConfig? portfolioConfig.rate : 0;
};

fixIncome.prototype._typeOf = function (asset) {

};
fixIncome.prototype.cal = function (asset) {
  console.log('cal', this.rate );
};
fixIncome.prototype.expectedTimeRevenue = function (asset) {
  console.log('expectedTimeRevenue');
};
module.exports.fixIncome = fixIncome;