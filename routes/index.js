let router = require('express').Router();
// Set default API response
/* router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
}); */
// Import contact controller
//var contactController = require('../contacts/index');

var productControl = require('../product/index')

var prodictzipControl=require('../productbyzip/index');
var prodictUserControl=require('../userProductFetch/index');

var globalDatafetch = require('../globalData/index')

var userLogin  = require('../userLogin/index')


// Contact routes
/* router.use('/contacts',
contactController
) */

router.use('/products',
productControl
)

router.use('/productbyzip',
prodictzipControl
)
router.use('/v1/productbyzip',
prodictUserControl
)
router.use('/global',
globalDatafetch
)


router.use('/userlogin/v1',
userLogin
)



    


// Export API routes
module.exports = router;