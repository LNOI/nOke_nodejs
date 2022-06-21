const Accounts=require("../models/accounts")
const crypto=require("crypto")


class SignupController{
    index(req,res,next){
        if(req.method=="GET"){
            const notify={
                notify_success:false,
                notify_user:false
            }
            res.render("signup",notify)
        }else if (req.method=="POST"){
           const hash=crypto.createHash("sha512")
           const formdata=req.body
           let password=req.body.password
           password=hash.update(password).digest('hex')
           formdata.password=password
           console.log(formdata.password)
            
           Accounts.findOne({email:formdata.email},(err,acc)=>{
             if(acc){
                const notify={
                    notify_success:false,
                    notify_user:true
                }
                res.render("signup",notify)
             }else{
                    Accounts.create(formdata).then(()=>{
                        const notify={
                            notify_success:true,
                            notify_user:false
                        }
                        res.render("signup",notify)
                    }).catch(next)
             }
           })

         
        }
    }
}

module.exports=new SignupController