var mongoose = require('mongoose');

// Setup schema
var productbyZipSchema = mongoose.Schema({
     zipCode: {
        type: Number,
        required: true
        },
  
        productDetails: {} ,
        price:{
            type:Number,
            required: true
        },
        discountPrice:{
            type:Number,
            required: true
        },
        offer:{
            type: String,
            required: true
        },
        weight:{
            type: String,
            required: true
        },
  
},
{
    timestamps: true,versionKey: false
});
// Export Contact model
var productbyZipSchema = module.exports = mongoose.model('productswithzip', productbyZipSchema);
 module.exports.get = function (callback, limit) {
    productbyZipSchema.find(callback).limit(limit);
} 