const mongoose=require('mongoose')

async function connect(){
    try {
        await mongoose.connect("mongodb://localhost:27017/education",{
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        console.log("Success Connection")
        
    } catch (error) {
        console.log("Failure Connection")
    }
}
module.exports= {connect}