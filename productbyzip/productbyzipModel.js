var mongoose = require('mongoose');

var productSchema =require('../product/productModel')
// Setup schema
var productbyZipSchema = mongoose.Schema({
     zipCode: {
        type: Number,
        required: true
    },
  
    product:[] 
  
},
{
    timestamps: true,versionKey: false
});
// Export Contact model
var productbyZipSchema = module.exports = mongoose.model('productbyzip', productbyZipSchema);
/* module.exports.get = function (callback, limit) {
    productbyZipSchema.find(callback).limit(limit);
} */