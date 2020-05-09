var GlobalDataModel = require('./globalDataModel')

exports.view =  async (req, res)=> {
    var item =req.query.item;
    
    if(item=="bestSelingItem"){
    await GlobalDataModel.find(
        {modelid: 1},
        {todayTreding:0,_id: 0,modelid:0,createdAt:0 }
        )
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
}else if(item=="todayTreding"){
    await GlobalDataModel.find(
        {modelid: 1},
        {bestSelingItem:0,_id: 0,modelid:0,createdAt:0}
        )
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
}else{
    return res.status(400).send({
        message: "Please Select todayTreding/bestSelingItem !"
    });
}
    
};

exports.update = async (req, res)=> {
   
     if(!req.body.todayTreding){
        return res.status(400).send({
            message: "Today Treding can not be empty !"
        });
    } 
 
var counts = await GlobalDataModel.find({ "modelid": 1}).count();
if(counts===0){

 var product = new GlobalDataModel({
    todayTreding:req.body.todayTreding
    
});
await product.save()
    .then(product=>{
        res.send({
            message: 'Get Product',
            data: product
        });
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    })

    
}
else{
    
   await GlobalDataModel.update(
     {"modelid":1},
        {
           // bestSelingItem:req.body.bestSelingItem,
              todayTreding:req.body.todayTreding
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
   

};

exports.bestsellingupdate = async(req,res)=>{
    console.log("iehwiuh: ");
    if(!req.body.bestSelingItem) {
        return res.status(400).send({
            message: "BestSelingItem can not be empty !"
        });
    }
 
var counts = await GlobalDataModel.find({ "modelid": 1}).count();

if(counts===0){
 var product = new GlobalDataModel({
    bestSelingItem:req.body.bestSelingItem
    
});
await product.save()
    .then(product=>{
        res.send({
            message: 'Get Product',
            data: product
        });
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    })

    
}
else{
   await GlobalDataModel.updateOne(
     {"modelid":1},
        {
           // bestSelingItem:req.body.bestSelingItem,
           bestSelingItem:req.body.bestSelingItem
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
}}

exports.homepage=async(req,res)=>{

    GlobalDataModel.find({ "modelid":1 }, 
    { 
        "bestSelingItem": { $slice: 1},
        "todayTreding"  : { $slice: 1},
    }
        )
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

