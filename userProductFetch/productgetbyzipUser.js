ProductDetailsbyZip= require('../model/productDetailsbyZip');


exports.view = async (req, res)=> {
    let catagor = req.query.catagory;

    await ProductDetailsbyZip.find({
        $and:[
            { zipCode: req.params.zipcode},
            {
                "productDetails.category" : catagor
            }
             ]})
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

 exports.fatchDataByProductId = async (req, res)=> {
    let productid = req.body.productid;
    if(!req.body.productid) {
        return res.status(400).send({
            message: "Product price can not be empty !"
        });
    }

    await ProductDetailsbyZip.find({
        $and:[
            { zipCode: req.params.zipcode}, 
            {
                "productDetails.productid" : {
                    "$in" : productid
                }
            }
            ] 
        })
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