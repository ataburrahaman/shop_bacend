var mongoose = require('mongoose');

// Setup schema
var OrderDetailsSchema = mongoose.Schema({
    uid:{
        type:String,
        require:true
    },
    pincode:{
        type:String,
        require:true
    },
    totalAmount:Number,
    deliverySlot:String,
    deliveryDate:String,
    orderDetails:[],
    paymentDetails:String,
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'useraddress'
    },
    deliverStatus:{
        type:Boolean,
        default: false
    }
},
{
    timestamps: true,versionKey: false
});
// Export Contact model
var OrderDetailsSchema = module.exports = mongoose.model('orderdetails', OrderDetailsSchema);
 module.exports.get = function (callback, limit) {
    OrderDetailsSchema.find(callback).limit(limit);
} 