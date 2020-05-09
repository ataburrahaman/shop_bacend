let router = require('express').Router();
// Set default API response

// Import contact controller

var deliveryDataControl =require('./deleveryDateControl')


    // Contact routes
router.route('/admin')
        .get(deliveryDataControl.getdata)
        .put(deliveryDataControl.update)
        .delete(deliveryDataControl.delete)


router.route('/admin/getall')
        .get(deliveryDataControl.index)



module.exports = router;