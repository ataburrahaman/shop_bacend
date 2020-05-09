
var userOrderDetailsModer =require('./orderDetailsModel')

exports.new = async (req, res) =>{
    if(!req.body.userid) {
        return res.status(400).send({
            message: "userId not empty !"
        });
    }
    if(!req.body.pincode) {
        return res.status(400).send({
            message: "pincode not empty !"
        });
    }
    if(!req.body.addressId) {
        return res.status(400).send({
            message: "deliveryAddress not empty !"
        });
    }


    var orderDetails = new userOrderDetailsModer({
        uid : req.body.userid,
        pincode: req.body.pincode,
        totalAmount:req.body.totalAmount,
        deliverySlot:req.body.slotDetails,
        deliveryDate:req.body.deliveryDate,
        paymentDetails:req.body.paymentMode,
        address:req.body.addressId,
        orderDetails:req.body.orderDetails,
    });
    
// save the contact and check for errors
await orderDetails.save()
        .then(address => {
            res.send({
                message: 'New Order Done!',
                data: address
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while Ordering."
            });
          });
       

};


exports.getOrderDetails =  async (req, res)=> {
    let userid = req.body.userid;
    if(!req.body.userid) {
        return res.status(400).send({
            message: "userid empty !"
        });
    }

    await userOrderDetailsModer.find({uid: userid},{updatedAt:0})
    .sort({createdAt: -1})
    .populate('address')
    .then(userdata => {
        res.json({
            status: "success",
            message: "Data retrive successfully",
            data: userdata
        });
        
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while retrieving Data."
        });
    })
    
}

exports.getDeliveryOrderDetails = async(req,res) =>{
    if(!req.body.pincode) {
        return res.status(400).send({
            message: "pincode empty !"
        });
    }
    if(!req.body.slotDetails) {
        return res.status(400).send({
            message: "slotDetails empty !"
        });
    }
    if(!req.body.deliveryDate) {
        return res.status(400).send({
            message: "order Date empty !"
        });
    }


    await userOrderDetailsModer.find({
         pincode: req.body.pincode,
         deliverySlot:req.body.slotDetails,
         deliveryDate:req.body.deliveryDate
        },{updatedAt:0})
    .sort({createdAt: -1})
    .populate('address')
    .then(userdata => {
        res.json({
            status: "success",
            message: "Data retrive successfully",
            data: userdata
        });
        
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while retrieving Data."
        });
    })
    

}


exports.setDeliverStatus= async (req,res) =>{

    if(!req.body.order_id) {
        return res.status(400).send({
            message: "Order id empty !"
        });
    }
    var orderId = req.body.order_id;

    await userOrderDetailsModer.findByIdAndUpdate(
        orderId,
           {
              // bestSelingItem:req.body.bestSelingItem,
              deliverStatus:true
              
           }).then(product => {
           
            res.send({
                status: "success",
                message: "Order Update successfully!"
            });
        })
           
           .catch(err => {
               if(err.kind === 'ObjectId') {
                   return res.status(404).send({
                       message: "Product not found ! "
                   });                
               }
               return res.status(500).send({
                   message: "Error updating product !"
               });
           }); 
}




exports.delete = async (req, res) =>{
    await userOrderDetailsModer.findByIdAndRemove(req.body.order_id,{useFindAndModify: true})
     .then(product => {
         if(!product) {
             return res.status(404).send({
                 message: "Order not found ! "
             });
         }
         res.send({
             status: "success",
             message: "Order deleted successfully!"
         });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Order not found ! "
             });                
         }
         return res.status(500).send({
             message: "Could not delete Product ! "
         });
     });
    
 };
