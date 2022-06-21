const express= require("express")
const router=express.Router()

const paymentController=require("../app/controllers/PaymentController")


router.get("/", paymentController.index)


module.exports= router