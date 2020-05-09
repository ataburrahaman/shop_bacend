var mongoose = require('mongoose');

// Setup schema
var userLoginSchema = mongoose.Schema({
    name:String,
    uid:String,
    phoneNo: {
            type: String,
            require:true
             },
   email: String,
   isEmailVerified:{
        type:Boolean,
        default: false
   } 
},
{
    timestamps: true,versionKey: false
});
// Export Contact model
var userLoginSchema = module.exports = mongoose.model('userdatabase', userLoginSchema);
 module.exports.get = function (callback, limit) {
    userLoginSchema.find(callback).limit(limit);
} 