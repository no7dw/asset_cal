### asset calulator with time

https://github.com/no7dw/asset_cal

usage:

    var AssetFactory = require('asset_cal').assetFactory;
    var af = new AssetFactory();
    //define your assetobj like:
    var assetobj = {
        "amount":1000,
        "rate":0.08,
        "portfolio_id": "549922452238c54e98b750bc"
    }
    var earningValue = af.cal(assetobj);
