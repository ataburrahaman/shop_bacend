var mongoose = require('mongoose');
// Setup schema
var productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    productid:{
        type: Number,
        required: true
    },
    imageurl:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    category:[String]
},{
    timestamps: true,versionKey: false
}
);
// Export Contact model
var Product = module.exports = mongoose.model('products', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}