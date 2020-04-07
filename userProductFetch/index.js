let router = require('express').Router();
// Set default API response

// Import contact controller

var productDetailsgetByUser =require( './productgetbyzipUser')

var GlobalDatafetch = require('../globalData/globalDataControl');


        router.route('/:zipcode/products/user/getcatg')      //user side
        .get(productDetailsgetByUser.view)

        router.route('/:zipcode/products/user/getproduct') 
        .get(productDetailsgetByUser.fatchDataByProductId)

        router.route('/product/user/getdata') 
        .get(GlobalDatafetch.view)

        router.route('/product/user/getdata/homepage') 
        .get(GlobalDatafetch.homepage)
     

module.exports = router;