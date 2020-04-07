let router = require('express').Router();
// Set default API response

// Import contact controller

var globalDataControl =require('./globalDataControl')


         router.route('/admin/product/tranding')      //user side
       // .get(globalDataControl.view)
        .put(globalDataControl.update)

        router.route('/admin/product/bestselling') 
        .put(globalDataControl.bestsellingupdate)
      

     

module.exports = router;