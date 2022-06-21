const mongoose= require('mongoose')
const Schema= mongoose.Schema
const slug = require('mongoose-slug-generator');

const Accounts=new Schema({
    email: {type: String, maxlength:20},
    username: {type: String, maxlength:10,  unique:true},
    password: {type:String},
    isAdmin: {type:Boolean,default:false},
    cart:{type:Array},
    createAt:{type:Date, default: Date.now},
    updateAt:{type:Date, default: Date.now},
})
module.exports= mongoose.model('Accounts',Accounts)