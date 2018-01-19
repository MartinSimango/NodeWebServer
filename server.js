const express= require('express');
const hbs= require('hbs');
const fs= require('fs');
var app= express();


app.set('view engine','hbs');//set the view engine 

app.use((req,res,next)=>{  //middleware for logging
    var now= new Date().toString();
    var log=now+": "+ req.method+" "+ req.url;
    console.log(log);
    fs.appendFile("server.log",log+"\n",(err)=>{
        if(err){
            console.log("Unable to write to log file");
        }
    });

next(); 

});  //middleware for maintenance
/*app.use((req,res,next)=>{
    res.render("maintenance.hbs",{
        pageTitle:'Maintenace Page',
        welcomeMessage: 'We are currently under maintaince'
    });
})*/
//use this static dir
app.use(express.static(__dirname+"/public"));

hbs.registerPartials(__dirname+"/views/partials"); //pretty much like the includes in PHP
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
//set what happens when user visits root of site
app.get("/",(request,response)=>{
    response.render("home.hbs",{
        welcomeMessage:"Welcome to the home page",
        pageTitle:"Home page",
        
    })
/*response.send({
    name:"Martin",
    likes:[
        'Squash',
        'Food'
    ]
});*/
});
app.get("/about",(req,res)=>{
    res.render("about.hbs",{
        pageTitle: "About page",
    });
})
app.get("/bad",(req,res)=>{
    res.send({
        
        errorMessage:"Page not found",
        errorCode:404
    })
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});