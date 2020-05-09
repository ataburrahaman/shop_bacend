let router = require('express').Router();
// Set default API response

// Import contact controller

var userAddressControl = require('./userAddressControl')


        router.route('/getalladdress')    //user side
        .get(userAddressControl.getuseraddress)
        //.get(userLoginControl.getuser);

        router.route('/setaddress')
        .post(userAddressControl.new);

        router.route('/addressupdate')
        .put(userAddressControl.update);

        router.route('/addressdelete')
        .delete(userAddressControl.delete);

        router.route('/setcurrentaddress')
        .put(userAddressControl.currenAddress);

       /*  router.route('/setcurrentaddress')
        .put(userAddressControl.currenAddress);
 */

       // .put(userLoginControl.update);

     

module.exports = router;