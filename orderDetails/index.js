let router = require('express').Router();
// Set default API response

// Import contact controller

var orderDetailsControl =require('./orderDetailsControl')


         router.route('/user/details')      //user side
       .get(orderDetailsControl.getOrderDetails)
       // .put(globalDataControl.update)


       router.route('/admin/getdetails') 
       .get(orderDetailsControl.getDeliveryOrderDetails)
       .delete(orderDetailsControl.delete)
      

       router.route('/admin/setdelivar') 
       .put(orderDetailsControl.setDeliverStatus)

        router.route('/user/set') 
        .post(orderDetailsControl.new)
      

     

module.exports = router;