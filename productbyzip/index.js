let router = require('express').Router();
// Set default API response

// Import contact controller
var productbyZipControl = require('./productbyzipControl');
var productDetailsbyZipControl = require ('./productDetailsbyZipControl');


// Contact routes

// router.route('/')
   // .get(productbyZipControl.index)
   // .post(productbyZipControl.new);

//router.route('/:zipcode')
//  
   // .get(productbyZipControl.view)
   // .patch(productControl.update)
  //  .put(productControl.update)
  // .delete(productbyZipControl.delete);

 /*  router.route('/:zipcode/products')
        .get(productbyZipControl.view)
        .post(productbyZipControl.newproduct); */


router.route('/products/admin') //admin side
    .get(productDetailsbyZipControl.getwithproduct) 
    .post(productDetailsbyZipControl.newproduct)
    .patch(productDetailsbyZipControl.update)
    .put(productDetailsbyZipControl.update);
    
router.route('/products/admin/delete/:delprodid') 
    .delete(productDetailsbyZipControl.delete);




// Export API routes
module.exports = router;