const Shoes= require("../models/shoes")
const Accounts=require("../models/accounts")
const { mongooseToObject,mutipleMongooseToObject } = require("../../utils/mongoosedb")

class StorageController{
    index(req,res,next){
        res.render("storage")
    }
    add_get(req,res,next){
        res.render("storages/add")
    }
    add_post(req,res,next){
        const data={
            name: req.body.name,
            value: req.body.value,
            size:req.body.size,
            link_img:{
                img1:req.body.img1,
                img2:req.body.img2,
                img3:req.body.img3,
                img4:req.body.img4,
            },
            description: req.body.description
        }
        console.log(req.body)
        const add_shoes=new Shoes(data);
        add_shoes.save().then(()=>{
            res.redirect("/")
        }).catch(()=>{
            console.log("Error add");
        })
    }
    
    edit(req,res,next){
        Shoes.find({},function(err,shoes) {
            if(!err){
                console.log("Success")
                res.render("storages/edit",{shoes:mutipleMongooseToObject(shoes)})
            }else{
                res.status(400).json({error:"ERROR!!!"})
            }
        })
    }
    update_get(req,res,next){
        Shoes.findById(req.params._id).then(
            shoes=>{
                res.render("storages/update",{shoes:mongooseToObject(shoes)})
            } 
        ).catch(next)
    }
    update_put(req,res,next){
        const data={
            name: req.body.name,
            value: req.body.value,
            link_img:{
                img1:req.body.img1,
                img2:req.body.img2,
                img3:req.body.img3,
                img4:req.body.img4,
            },
            description: req.body.description
        }
        Shoes.updateOne({_id: req.params._id},data).then(()=>{
            res.redirect("/")
        }).catch(next)
    }
    delete(req,res,next){
        Shoes.deleteOne({_id: req.params._id}).then(()=>{
            res.redirect("/storage/edit")
        })
    }

    addtocart(req,res,next){
        Accounts.findOne({username:req.session.viewUsername},(err,acc)=>{
            if(!err){
                const cart=acc.cart
                cart.push(req.body.name+"-"+req.body.size+"-"+req.body.price)
                Accounts.findOneAndUpdate({username:req.session.viewUsername},{cart:cart}).then(()=>{
                    Shoes.findOne({name: req.body.name}).then(shoes=>{
                       
                        res.json({
                            msg:"success",
                            linkcart:shoes.link_img.img1,
                            name:req.body.name,
                            size:req.body.size,
                            price:req.body.price,
                            index:cart.length-1
                        })

                    }).catch(next)
                }).catch(next)
        
               
            }
        })
    }
    deletecart(req,res,next){
        if (req.session.viewUsername){
            Accounts.findOne({username:req.session.viewUsername},(err,account)=>{
                if(!err){
                    const cart=[]
                    for(var i=0;i<account.cart.length;i++){
                        if(i!=req.body.index){
                            cart.push(account.cart[i])
                        }
                    }
                    Accounts.findOneAndUpdate({username:req.session.viewUsername},{cart:cart}).then(()=>{
                        console.log(cart)
                        res.json({
                            msg:"success",
                            cart:cart
                        })
                    }).catch(next)
                   
                
                }else{
            
                }
            })
        }
    }
}
module.exports=new StorageController