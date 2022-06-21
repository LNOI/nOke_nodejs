const express = require('express')
const routes=require("./routers")
const engine=require("express-handlebars")
const path =require('path');
const morgan = require('morgan');
const session = require('express-session')
var methodOverride = require('method-override')
const education= require("./config/db/index")
education.connect()

const app = express()

app.engine('handlebars',engine.engine({
    helpers:{
        sum: (a,b)=> a+b,
    }
}))
app.use(methodOverride('_method'))
app.set("view engine",'handlebars')
app.set('views', path.join(__dirname,"resources/views"));
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'serect-key',
    resave: false,
    saveUninitialized: true,
}))
const port=3000

routes(app);
app.listen(port,()=>{
    console.log(`The webapp listening on port  http://localhost:${port}`)
})