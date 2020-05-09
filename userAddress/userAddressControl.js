var userAddressModer =require('./userAddressModel')

exports.getuseraddress =  async (req, res)=> {
    let userid = req.body.userid;
    if(!req.body.userid) {
        return res.status(400).send({
            message: "userid empty !"
        });
    }

    await userAddressModer.find({uid: userid},{createdAt:0,updatedAt:0})
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
    });
    
};




// Handle create contact actions
exports.new = async (req, res) =>{


    if(!req.body.userid) {
        return res.status(400).send({
            message: "userId not empty !"
        });
    }
  

    var address = new userAddressModer({
        uid : req.body.userid,
        latitude: req.body.latitude,
        longitude:req.body.longitude,
        postCode:req.body.postCode,
        name:req.body.name,
        flateNo:req.body.flateNo,
        streetName: req.body.streetName,
        addressType:req.body.addressType,
        other: req.body.other
    });
    
// save the contact and check for errors
await address.save()
        .then(address => {
            setallCuttentStatus(req.body.userid,address._id);
            res.send({
                message: 'New Address created!',
                data: address
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Address."
            });
          });
       

};


setallCuttentStatus= async(uid,address_id)=>{
    await userAddressModer.updateMany(
        /* {"uid": req.body.userid, "id" :{$not: {$ne : req.body.address_id}} }, */
            {
                $and: [
                    {
                        "uid": uid
                    },
                    {
                        "_id" :{$ne : address_id}
                    }
                  ]
            },
            {
            isCurrentAddress: false,
              },{ new: true,useFindAndModify: false})
 }



exports.update =  async (req, res)=> {
    if(!req.body.userid) {
        return res.status(400).send({
            message: "userId not empty !"
        });
    }
    if(!req.body.address_id) {
        return res.status(400).send({
            message: "userId not empty !"
        });
    }

    await userAddressModer.findByIdAndUpdate(req.body.address_id, {
        uid : req.body.userid,
        latitude: req.body.latitude,
        longitude:req.body.longitude,
        postCode:req.body.postCode,
        name:req.body.name,
        flateNo:req.body.flateNo,
        streetName: req.body.streetName,
        addressType:req.body.addressType,
        other: req.body.other
       },{ new: true,useFindAndModify: false})
       .then(address => {
        if(!address) {
            return res.status(404).send({
                message: "Address not found  !"
            });
        }
        setCuttentStatus(req.body.userid,req.body.address_id);
        res.send(
            {
                message: 'Address Update!',
                data: address
            }
        );
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Address not found ! "
            });                
        }
        return res.status(500).send({
            message: "Error updating Address !"
        });
    });
};


exports.delete = async (req, res) =>{
    if(!req.body.address_id) {
        return res.status(400).send({
            message: "Address iD not empty !"
        });
    }

    await userAddressModer.findByIdAndRemove(req.body.address_id,{useFindAndModify: true})
     .then(address => {
         if(!address) {
             return res.status(404).send({
                 message: "Address not found ! "
             });
         }
         res.send({
             status: "success",
             message: "Address deleted successfully!"
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
    
 };

 setCuttentStatus= async(uid,address_id)=>{
    await userAddressModer.updateMany(
        /* {"uid": req.body.userid, "id" :{$not: {$ne : req.body.address_id}} }, */
            {
                $and: [
                    {
                        "uid": uid
                    },
                    {
                        "_id" :address_id
                    }
                  ]
            },
            {
            isCurrentAddress: true,
              },{ new: true,useFindAndModify: false})
 }

 exports.currenAddress = async (req, res) =>{

     if(!req.body.address_id) {
        return res.status(400).send({
            message: "Address iD not empty !"
        });
    } 

    await userAddressModer.updateMany(
        /* {"uid": req.body.userid, "id" :{$not: {$ne : req.body.address_id}} }, */
            {
                $and: [
                    {
                        "uid": req.body.userid
                    },
                    {
                        "_id" :{$ne : req.body.address_id}
                    }
                  ]
            },
            {
            isCurrentAddress: false,
              },{ new: true,useFindAndModify: false})
              .then(product => {
               if(!product) {
                   return res.status(404).send({
                       message: "Product not found  !"
                   });
               }
               setCuttentStatus(req.body.userid,req.body.address_id);
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
    
 };

