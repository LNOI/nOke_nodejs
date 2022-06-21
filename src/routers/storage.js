const express= require("express")
const router=express.Router()

const storageController=require("../app/controllers/StorageController")

router.get("/",storageController.index)
router.get("/add",storageController.add_get)
router.post("/add",storageController.add_post)

router.get("/edit",storageController.edit)
router.delete("/delete/:_id",storageController.delete)

router.post("/addtocart",storageController.addtocart)
router.post("/deletecart",storageController.deletecart)
router.get("/update/:_id",storageController.update_get)
router.put("/update/:_id",storageController.update_put)

module.exports= router