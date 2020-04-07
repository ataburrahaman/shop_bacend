Product = require('./productModel');
// Handle index actions
exports.index =  async (req, res)=> {
    await Product.find()
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

// Handle create contact actions
exports.new = async (req, res) =>{
    if(!req.body.title) {
        return res.status(400).send({
            message: "Product title can not be empty !"
        });
    }
   /*  if(!req.body.price) {
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
    } */
    if(!req.body.imageurl) {
        return res.status(400).send({
            message: "Product imageurl can not be empty !"
        });
    }
    if(!req.body.amount) {
        return res.status(400).send({
            message: "Product amount can not be empty !"
        });
    } 
    if(!req.body.productid) {
        return res.status(400).send({
            message: "productid can not be empty !"
        });
    }


    var product = new Product({
        title : req.body.title,
        /* price : req.body.price,
        discountPrice : req.body.discountPrice,
        offer : req.body.offer ,
        weight : req.body.weight , */
        imageurl : req.body.imageurl ,
        amount : req.body.amount,
        category: req.body.category, 
        productid: req.body.productid
    });
    
// save the contact and check for errors
await product.save()
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


// Handle view contact info
exports.view = async (req, res)=> {
   await Product.findById(req.params.product_id)
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


// Handle update contact info
exports.update = async (req, res)=> {
    if(!req.body.title) {
        return res.status(400).send({
            message: "Product title can not be empty !"
        });
    }
   /*  if(!req.body.price) {
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
    } */
    if(!req.body.imageurl) {
        return res.status(400).send({
            message: "Product imageurl can not be empty !"
        });
    }
    if(!req.body.amount) {
        return res.status(400).send({
            message: "Product amount can not be empty !"
        });
    }



   await Product.findByIdAndUpdate(req.params.product_id, {
     
            title :req.body.title ,
           /*  price : req.body.price ,
            discountPrice : req.body.discountPrice,
            offer : req.body.offer,
            weight : req.body.weight, */
            imageurl : req.body.imageurl ,
            amount : req.body.amount,
            category: req.body.category, 
           
             
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


// Handle delete contact
exports.delete = async (req, res) =>{
   await Product.findByIdAndRemove(req.params.product_id,{useFindAndModify: true})
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