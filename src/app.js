const express = require('express')
require("./db/conn")
const User = require('./models/schema')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

// require("../node_modules/bootstrap/scss/forms/")
const staticPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

// middleware
app.use(express.urlencoded({extended:false}))
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/scss")))
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")))
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")))
app.use(express.static(staticPath))
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialPath)



// Routing and create server
app.get("/", (req, res)=>{
    res.render("index")
});

app.get("/about", (req,res)=>{
    res.render("about")
});

app.post("/contact", async(req, res)=>{

try{
    const userData = new User(req.body)
    await userData.save()
    res.status(201).render("index")
}catch(err){
    res.status(500).send(err)
}    
    
});

app.listen(port, ()=>{
    console.log(`i am listening port numbber ${port}`)
});