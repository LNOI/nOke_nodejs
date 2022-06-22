const Shoes= require("../models/shoes")
const Accounts=require("../models/accounts")
const { mongooseToObject } = require("../../utils/mongoosedb")

class ShoesController{
    index(req,res,next){
        var nameshoes=req.params.slug
        const acc={}
        if (req.session.viewUsername){
            Accounts.findOne({username:req.session.viewUsername},(err,account)=>{
                if(!err){
                    acc.username=req.session.viewUsername
                    acc.isAdmin=account.isAdmin
                    acc.number_cart=account.cart.length
                    acc.cart=account.cart
                    var linkimg=''
                    const cart=[]
                    account.cart.forEach(el => {
                        var linkimg=''
                        const name=el.split("-")[0]
                        Shoes.findOne({name: name}).then(shoes=>{
                            linkimg=shoes.link_img.img1
                            cart.push({
                                linkcart:linkimg,
                                name:el.split("-")[0],
                                size:el.split("-")[1],
                                price:el.split("-")[2]
                            })
                            acc.cart=cart
                            
                        }).catch(next)
                    });
                    
                }else{
                }
            })
        }
        Shoes.findOne({ slug:nameshoes}, (err,shoes)=>{
            if(!err){
                res.render("shoes_detail",{shoes:mongooseToObject(shoes),acc})
            }else{
                res.status(400).json({error:"Not Found Shoes"})
            }
        })
    }
}

module.exports=new ShoesController