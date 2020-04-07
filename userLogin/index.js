let router = require('express').Router();
// Set default API response

// Import contact controller

var userLoginControl = require('./userLoginControl')


        router.route('/getdata/user')      //user side
        .get(userLoginControl.getuser);

        router.route('/updateuser/update')
        .put(userLoginControl.update);

     

module.exports = router;