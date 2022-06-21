const mongoose=require('mongoose')

async function connect(){
    try {
        await mongoose.connect("mongodb://mongo:27017/education",{
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        require("./initdb")
        console.log("Success Connection")
        
    } catch (error) {
        console.log("Failure Connection")
    }
}
module.exports= {connect}