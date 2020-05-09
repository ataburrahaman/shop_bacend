

ProductDetailsbyZip= require('../model/productDetailsbyZip');
Products =require('../product/productModel');

 exports.newproduct = async (req, res) =>{

    //console.log("Zipcode:",req.params.zipcode);
       if(!req.body.price) {
        return res.status(400).send({
            message: "Product price can not be empty !"
        });
    }
    if(!req.body.discountPrice) {
        return res.status(400).send({
            message: "Product discountPrice can not be empty !"
        });
    }
    if(!req.body.offer) {
        return res.status(400).send({
            message: "Product offer can not be empty !"
        });
    }
    if(!req.body.weight) {
        return res.status(400).send({
            message: "Product weight can not be empty !"
        });
    }  
    if(!req.body.zipCode) {
        return res.status(400).send({
            message: "zipCode can not be empty !"
        });
    }
    if(!req.body.productid) {
        return res.status(400).send({
            message: "productid can not be empty !"
        });
    } 
   
    const{offer,price,zipCode,discountPrice,weight}=req.body;
    var productDetailsbyZip = new ProductDetailsbyZip({
      zipCode:zipCode,
      price:price,
      discountPrice:discountPrice,
      offer:offer,
      weight:weight
    })
    
  
    var product= await Products.find({ "productid": req.body.productid});
   
    const{category,title,imageurl,amount,productid,_id } =product[0];
  
    productDetailsbyZip.productDetails = {
        category,title,imageurl,amount,productid,_id
    }
  
   await productDetailsbyZip.save()
          .then(product => {
              res.send({
                  message: 'New product  added in zipcode!',
                  data: product
              });
          }).catch(err => {
              res.status(500).send({
                  message: err.message || "Some error occurred while creating the Product."
              });
            });
         
  
  };

  exports.getwithproduct =async(req,res)=>{
     // console.log("iuhiu:");
    await ProductDetailsbyZip.find()
    .then(productsbyZip => {
        res.json({
            status: "success",
            message: "Products retrieved successfully",
            data: productsbyZip
        });
        
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while retrieving Products."
        });
    });
  }

  exports.update = async (req, res)=> {

    if(!req.body.price) {
        return res.status(400).send({
            message: "Product price can not be empty !"
        });
    }
    if(!req.body.discountPrice) {
        return res.status(400).send({
            message: "Product discountPrice can not be empty !"
        });
    }
    if(!req.body.offer) {
        return res.status(400).send({
            message: "Product offer can not be empty !"
        });
    }
    if(!req.body.weight) {
        return res.status(400).send({
            message: "Product weight can not be empty !"
        });
    }  
    if(!req.body.zipCode) {
        return res.status(400).send({
            message: "zipCode can not be empty !"
        });
    }
    if(!req.body.productid) {
        return res.status(400).send({
            message: "productid can not be empty !"
        });
    } 
    if(!req.body.id) {
        return res.status(400).send({
            message: "id can not be empty !"
        });
    }
    var product= await Products.find({ "productid": req.body.productid});

    const{offer,price,zipCode,discountPrice,weight}=req.body;
   
    const{category,title,imageurl,amount,productid,_id } =product[0];


   await ProductDetailsbyZip.findByIdAndUpdate(req.body.id, {
     
    offer,
    price,
    zipCode,
    discountPrice,
    weight,
    productDetails:{
        category,title,imageurl,amount,productid,_id
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

};


exports.delete = async (req, res) =>{
    await ProductDetailsbyZip.findByIdAndRemove(req.params.delprodid)
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