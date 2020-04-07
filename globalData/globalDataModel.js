var mongoose = require('mongoose');

// Setup schema
var productbyglobaldataSchema = mongoose.Schema({
    bestSelingItem:[String],
    todayTreding:[String],  
    modelid: {
        type:Number,
        default: 1
    }
},
{
    timestamps: true,versionKey: false
});
// Export Contact model
var productbyglobaldataSchema = module.exports = mongoose.model('globaldata', productbyglobaldataSchema);
 module.exports.get = function (callback, limit) {
    productbyglobaldataSchema.find(callback).limit(limit);
} 