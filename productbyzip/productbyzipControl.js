ProductbyZip = require('./productbyzipModel');
Products =require('../product/productModel');

ProductDetailsbyZip= require('../model/productDetailsbyZip');

// Handle index actions
exports.index =  async (req, res)=> {
    await ProductbyZip.find()
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
    
};


exports.new = async (req, res) =>{
    if(!req.body.zipCode) {
        return res.status(400).send({
            message: "Product zipCode can not be empty !"
        });
    }
    var productbyZip = new ProductbyZip({
        zipCode : req.body.zipCode,
      //  product : req.body.product,
        
    });
    
// save the contact and check for errors
await productbyZip.save()
        .then(product => {
            res.send({
                message: 'New product created!',
                data: product
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
          });
       

};



exports.view = async (req, res)=> {

    await ProductbyZip.find({ zipCode: req.params.zipcode})
     .then(product => {
         if(!product) {
             return res.status(404).send({
                 message: "Product not found ! " 
             });            
         }
         res.send({
             message: 'product Found!',
             data: product
         });
     }).catch(err => {
         if(err.kind === 'ObjectId') {
             return res.status(404).send({
                 message: "Product not found ! "
             });                
         }
         return res.status(500).send({
             message: "Error retrieving product ." 
         });
     });
 };
 
 exports.delete = async (req, res) =>{
   var myquery = { zipCode: req.params.zipcode };  
    await ProductbyZip.remove(myquery)
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
 };


 // New Product add for specific zipcode

 exports.newproduct = async (req, res) =>{

  //console.log("Zipcode:",req.params.zipcode);

  const{productid,price,zipCode}=req.body;
  //const productbyZip =  await ProductbyZip.find({ zipCode: req.params.zipcode});
  /* var productDetailsbyZip = new ProductDetailsbyZip({
    zipCode:zipCode,
    price:price
  }) */

  

  var product= await Products.find({ productid: productid});

  productDetailsbyZip.productDetails = product[0],

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