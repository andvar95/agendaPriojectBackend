//importing required modules

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

/*user fields - crear registrar usuario (nombres-apellidos-correo-telefono-user-pass)*/

//creating user Schema
const userSchema = new mongoose.Schema({
    name:String,
    lastName:String,
    password:String,
    email:String,
    phone:String,
    user:String,
    date:{type:Date,default:Date.now}
})


//method to generate the JWT
userSchema.methods.generateJWT = function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        iat:moment().unix()
    },"Andvar")
}

//Creatign collection in mongo
const User = mongoose.model("user",userSchema);

//exporting user model
module.exports = User;