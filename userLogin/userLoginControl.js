var userModer =require('./userModel')

exports.getuser =  async (req, res)=> {
    let userid = req.query.userid;
    if(!req.query.userid) {
        return res.status(400).send({
            message: "userid empty !"
        });
    }

    await userModer.find({uid: userid})
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

exports.update =  async (req, res)=> {

    let userid = req.body.userid;
    if(!req.body.userid) {
        return res.status(400).send({
            message: "userid empty !"
        });
    }
    
    let name= req.body.name;
    let phoneNo= req.body.phoneNo;
    let address= req.body.address;

    var counts = await userModer.find({ uid: userid}).count();
    if(counts==0){
        var userLogin = new userModer({
           uid: userid,
           phoneNo, 
        });
        await userLogin.save()
            .then(userdata=>{
                res.send({
                    message: 'Set User Data',
                    data: userdata
                });
            })
            .catch(err=>{
                res.status(500).send({
                    message: err.message || "Some error occurred while creating User Data."
                });
            })
    }else{
        await userModer.update(
            {uid: userid},
               {
                    name,
                    address
                  },{ new: true,useFindAndModify: false})
                  .then(userdata => {
                   if(!userdata) {
                       return res.status(404).send({
                           message: "UID not found  !"
                       });
                   }
                   res.send(
                       {
                           message: 'user Data Update!',
                           data: userdata
                       }
                   );
               }).catch(err => {
                   if(err.kind === 'ObjectId') {
                       return res.status(404).send({
                           message: "UID not found ! "
                       });                
                   }
                   return res.status(500).send({
                       message: "Error updating user data !"
                   });
               });
    }

};