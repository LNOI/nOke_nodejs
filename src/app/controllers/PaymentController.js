
class PaymentController{
    index(req,res,next){
        res.render("payment")
    }
}

module.exports=new PaymentController