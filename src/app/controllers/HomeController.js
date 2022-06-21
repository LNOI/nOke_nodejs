const Shoes= require("../models/shoes")
const Accounts=require("../models/accounts")
const { mutipleMongooseToObject} = require("../../utils/mongoosedb")

class HomeController{
    index(req,res,next){
        const search=req.query.search
        
        const page=parseInt(req.query.page)?parseInt(req.query.page):1
        const limit=parseInt(req.query.limit)?parseInt(req.query.limit):8
        const startIndex=(page-1)*limit
        const endIndex=page*limit
        const result={};
        const acc={};
        if (req.session.viewUsername){
            Accounts.findOne({username:req.session.viewUsername},(err,account)=>{
                if(!err){
                    acc.username=req.session.viewUsername
                    acc.isAdmin=account.isAdmin
                    acc.number_cart=account.cart.length
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

        Shoes.find({name: new RegExp(search,'i') }).then(shoes =>{
            const arr_s=mutipleMongooseToObject(shoes)
            if(startIndex>0){
                result.previous={
                    page:page-1,
                    limit:limit
                }
            }
            if(endIndex < arr_s.length){
                result.next={
                    page:page+1,
                    limit:limit
                }
            }
            result.page= new Array(parseInt(arr_s.length/8)).fill("null")
            result.result=arr_s.slice(startIndex,endIndex)
            res.render("home",{result,acc})
        }).catch(next)
    }
}

module.exports=new HomeController