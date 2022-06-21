
const home=require("./home")
const shoes=require("./shoes")
const login=require("./login")
const signup=require("./signup")
const storage=require("./storage")
const payment=require("./payment")
function route(app){
    app.use("/login",login)
    app.use("/logout",login)
    app.use("/signup",signup)
    app.use("/shoes",shoes)
    app.use("/storage",storage)
    app.use("/my/payment",payment)
    app.use("/",home)
}
module.exports = route