const mongoose= require('mongoose')
const Schema= mongoose.Schema
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Shoes=new Schema({
    name: {type: String, maxlength:1000},
    value: {type: String, maxlength:1000},
    size:{type:Array},
    link_img: {type:Object},
    description: {type:String, maxlength:5000},
    createAt:{type:Date, default: Date.now},
    updateAt:{type:Date, default: Date.now},
    slug: {type:String, slug: "name", unique:true},
})
module.exports= mongoose.model('Shoes',Shoes)