var DeliveryData = require('./deliveryModel');
// Handle index actions
exports.index =  async (req, res)=> {
   // console.log("get Dat")
     await DeliveryData.find()
    .then(products => {
        res.json({
            status: "success",
            message: "Products retrieved successfully",
            data: products
        });
        
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while retrieving Products."
        });
    }); 
    
};


exports.getdata =  async (req, res)=> {
    // console.log("get Dat")
    if(!req.body.pincode) {
        return res.status(400).send({
            message: "Product title can not be empty !"
        });
    }
    var counts = await DeliveryData.find({ "pincode": req.body.pincode}).count();

if(counts==0){
   
   

    var product = new DeliveryData({
        pincode : req.body.pincode,
    });
    
// save the contact and check for errors
await product.save()
        .then(product => {
            res.send({
                status: "success",
                message: "Products retrieved successfully",
                data: product
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
          });
       


}
else{
       await DeliveryData.find({ "pincode": req.body.pincode})
     .then(products => {
         res.json({
             status: "success",
             message: "Products retrieved successfully",
             data: products
         });
         
     }).catch(err => {
         res.status(500).send({
             status: "error",
             message: err.message || "Some error occurred while retrieving Products."
         });
     }); 
     
 }

}

// Handle create contact actions
exports.new = async (req, res) =>{
    if(!req.body.pincode) {
        return res.status(400).send({
            message: "Product title can not be empty !"
        });
    }
   

    var product = new DeliveryData({
        pincode : req.body.pincode,
    });
    
// save the contact and check for errors
await product.save()
        .then(product => {
            res.send({
                message: 'New Delivery Address!',
                data: product
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
          });
       

};


exports.update= async (req,res) =>{


    await DeliveryData.updateOne(
        {"pincode": req.body.pincode},
           {
              // bestSelingItem:req.body.bestSelingItem,
              //   todayTreding:req.body.todayTreding
              $set:{
             
                  "firstDate.slot1Avalable":req.body.firstslot1,
                  "firstDate.slot2Avalable":req.body.firstslot2,
                  "firstDate.slot3Avalable":req.body.firstslot3,
                  "firstDate.slot4Avalable":req.body.firstslot4,

                  "secondDate.slot1Avalable":req.body.secondslot1,
                  "secondDate.slot2Avalable":req.body.secondslot2,
                  "secondDate.slot3Avalable":req.body.secondslot3,
                  "secondDate.slot4Avalable":req.body.secondslot4,

                  "thirdDate.slot1Avalable":req.body.thirdslot1,
                  "thirdDate.slot2Avalable":req.body.thirdslot2,
                  "thirdDate.slot3Avalable":req.body.thirdslot3,
                  "thirdDate.slot4Avalable":req.body.thirdslot4,
              }
              

                  
              
              },{ new: true,useFindAndModify: false})
              .then(product => {
               if(!product) {
                   return res.status(404).send({
                       message: "Product not found  !"
                   });
               }
               res.send(
                   {
                       message: 'Product Update!',
                       data: product
                   }
               );
           }).catch(err => {
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
    await DeliveryData.findByIdAndRemove(req.body.delivery_id,{useFindAndModify: true})
     .then(product => {
         if(!product) {
             return res.status(404).send({
                 message: "Product not found ! "
             });
         }
         res.send({
             status: "success",
             message: "Product deleted successfully!"
         });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Product not found ! "
             });                
         }
         return res.status(500).send({
             message: "Could not delete Product ! "
         });
     });
     /* }, function (err, contact) {
         if (err)
             res.send(err);
         res.json({
             status: "success",
             message: 'Contact deleted'
         });
     }); */
 };

