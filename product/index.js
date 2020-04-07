let router = require('express').Router();
// Set default API response

// Import contact controller
var productControl = require('./productControl');
// Contact routes
router.route('/')
    .get(productControl.index)
    .post(productControl.new);


router.route('/:product_id')
    .get(productControl.view)
    .patch(productControl.update)
    .put(productControl.update)
    .delete(productControl.delete);


// Export API routes
module.exports = router;