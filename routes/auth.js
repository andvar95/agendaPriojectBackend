//rquire modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//model
const User = require("../models/user");

//login router
router.post("/login",async(req,res)=>{
    const user = await User.findOne({user:req.body.user})

    //does user exist?
    if(!user) return res.status(400).send("User not correct")

    const hash = await bcrypt.compare(req.body.password,user.password);

    //if password is incorrect
    if(!hash) return res.status(400).send("Password not correct");

    //login succesfully
    const jwtToken = user.generateJWT();
    return res.status(200).send({jwtToken})
})

module.exports = router;