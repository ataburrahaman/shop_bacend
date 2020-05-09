var mongoose = require('mongoose');

var Dates = mongoose.Schema({
    "9AM-10AM":{
        type: String,
        default:"9AM-10AM"
    }
})
// Setup schema
var productDeliveryDateSchema = mongoose.Schema({
    firstDate:{
        slot1:{
            type:String,
            default: '7 AM - 9 AM'
        },
        slot1Avalable:{
            type:Boolean,
            default:true
        },
        slot2:{
            type:String,
            default: '10 AM - 12 AM'
        },
        slot2Avalable:{
            type:Boolean,
            default:true
        },
        slot3:{
            type:String,
            default: '4 PM - 6 PM'
        },
        slot3Avalable:{
            type:Boolean,
            default:true
        },
        slot4:{
            type:String,
            default: '7 PM - 9 PM'
        },
        slot4Avalable:{
            type:Boolean,
            default:true
        }
    },
    secondDate:{
        slot1:{
            type:String,
            default: '7 AM - 9 AM'
        },
        slot1Avalable:{
            type:Boolean,
            default:true
        },
        slot2:{
            type:String,
            default: '10 AM - 12 AM'
        },
        slot2Avalable:{
            type:Boolean,
            default:true
        },
        slot3:{
            type:String,
            default: '4 PM - 6 PM'
        },
        slot3Avalable:{
            type:Boolean,
            default:true
        },
        slot4:{
            type:String,
            default: '7 PM - 9 PM'
        },
        slot4Avalable:{
            type:Boolean,
            default:true
        }
    },
    thirdDate:{
        slot1:{
            type:String,
            default: '7 AM - 9 AM'
        },
        slot1Avalable:{
            type:Boolean,
            default:true
        },
        slot2:{
            type:String,
            default: '10 AM - 12 AM'
        },
        slot2Avalable:{
            type:Boolean,
            default:true
        },
        slot3:{
            type:String,
            default: '4 PM - 6 PM'
        },
        slot3Avalable:{
            type:Boolean,
            default:true
        },
        slot4:{
            type:String,
            default: '7 PM - 9 PM'
        },
        slot4Avalable:{
            type:Boolean,
            default:true
        }
    },
    pincode:{
        type:Number
    }
},
{
    timestamps: true,versionKey: false
});
// Export Contact model
var productDeliveryDateSchema = module.exports = mongoose.model('deliverydate', productDeliveryDateSchema);
 module.exports.get = function (callback, limit) {
    productDeliveryDateSchema.find(callback).limit(limit);
} 