const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.json());

const userData = {
    users: [
        {
            id: "123",
            name: "Andy",
            email: "andy@myapp.com",
            password: "andy@123",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "Becky",
            email: "becky@myapp.com",
            password: "becky@123",
            entries: 0,
            joined: new Date()
        },
        {
            id: "125",
            name: "Carl",
            email: "carl@myapp.com",
            password: "carl@123",
            entries: 0,
            joined: new Date()
        }
    ]
}


app.get("/", (req, res)=>{
    res.send("get is working");
});
app.post("/signin", (req,res)=>{
    
    if(req.body.email=== userData.users[2].email && req.body.password===userData.users[2].password){
    res.json("signing");
}
else res.json("errr");
});
app.listen (3000, ()=>{
    console.log("app is running on port 3000");
});

/*
/ --> res = this is working
/signin --> POST = success/fail 
/register --> POST = user
/profile/:userId --> GET = user
/image--> PUT --> user
*/