var mongoose = require('mongoose');

// Setup schema
var userAddressSchema = mongoose.Schema({
    uid:String,
    isCurrentAddress:{
        type:Boolean,
        default: true
   },
   latitude:Number,
   longitude:Number,
   postCode:Number,
   name:String,
   flateNo:String,
   streetName:String,
   addressType:String,
   other:String
},
{
    timestamps: true,versionKey: false
});
// Export Contact model
var userAddressSchema = module.exports = mongoose.model('useraddress', userAddressSchema);
 module.exports.get = function (callback, limit) {
    userAddressSchema.find(callback).limit(limit);
} 