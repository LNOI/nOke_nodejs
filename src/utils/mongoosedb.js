module.exports = {
    mutipleMongooseToObject: function(mongooses){
        return  mongooses.map(mg => mg.toObject())
    },
    mongooseToObject: function(mongoose){
        return mongoose? mongoose.toObject(): mongoose;
    }
}