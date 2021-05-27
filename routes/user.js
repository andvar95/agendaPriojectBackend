//importgin required modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");


//route to register a new user
router.post("/registerUser",async(req,res)=>{
    //cheking that the user doesn't already exists
    let val_user1= await User.findOne({email:req.body.email})

    //if it already exists
    if (val_user1) return res.status(400).send("This email already exists")

    //cheking that the user doesn't already exists
    let val_user2 = await User.findOne({email:req.body.user})

    //if it already exists
    if (val_user2) return res.status(400).send("This user already exists")

    //if it doesn`'t exists -> encrypt the password

    const hash = await bcrypt.hash(req.body.password,10);

    // user object  with incoming information
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        lastName:req.body.lastName,
        phone:req.body.phone,
        user:req.body.user,
        password:hash
    })

    //saving in mongodb
    const result = await user.save();

    if(result){
        const jwtToken = user.generateJWT();
        res.status(200).send({jwtToken})
    }
    else{
        return res.status(400).send("Registration failed")
    }

})


//exporting module
module.exports = router;