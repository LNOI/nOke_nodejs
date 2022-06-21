const Accounts=require("../models/accounts")
const { mongooseToObject, mutipleMongooseToObject } = require("../../utils/mongoosedb")
const crypto=require("crypto")

const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

class LoginController{
    index(req,res,next){
        const notify={
            notify_wrong:false
        }
        req.session.viewUsername=""
        res.render("login",notify)
    }
    login(req,res,next){
        const hash=crypto.createHash("sha512")
        let pass=req.body.password
        pass=hash.update(pass).digest('hex')
        Accounts.findOne({email:req.body.em_us,password:pass},(err,account)=>{
            if(!err){
                const acc=mongooseToObject(account)
                if(acc!=null){
                    req.session.viewUsername=acc.username
                    res.redirect("/")
                }else{
                    const notify={
                        notify_wrong:true
                    }
                    req.session.viewUsername=""
                    res.render("login",notify)
                }
            }else{
                req.session.viewUsername=""
                const notify={
                    notify_wrong:true
                }
                res.render("login",notify)
            }
        })
    }
 
}

module.exports=new LoginController