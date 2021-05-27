//require modules 
const express = require("express");
const router = express.Router();
const Board = require("../models/reminder");
const User = require("../models/user");
const middlewareAuth = require("../middleware/auth");

//register activity with middleware
router.post("/saveReminder",middlewareAuth,async(req,res)=>{

    //search user by id
    const user = await User.findById(req.user._id);

    //if user doesn't exist
    if(!user) return res.status(401).send("User no Authenticated");

    const reminder = new Board({
        userId:user._id,
        name:req.body.name,
        description:req.body.description
    })

    const result = await reminder.save()
    return res.status(200).send({result});


});

module.exports = router;