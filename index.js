//importing expres and mongoose
const express = require("express");
const mongoose = require("mongoose");

//Routes
const User = require("./routes/user");
const Auth = require("./routes/auth");
const Reminder = require("./routes/reminder");



//app variable 
const app = express();



//Use
app.use(express.json());
app.use("/api/users/",User);
app.use("/api/auth/",Auth)
app.use("/api/reminder/",Reminder)



//port variable
const port = process.env.PORT || 3003;

//START to listen in the port
app.listen(port,()=>console.log("Backend server running in port: "+port))

//connection with mongodb using mongoose
mongoose.connect("mongodb://localhost:27017/agendaDB",{
    useNewUrlParser: true, //
    useUnifiedTopology: true, //mongo can use mongo commands
    useFindAndModify: false, //doesn't send information by console
    useCreateIndex: true, //let createdb from index
})
.then(res=>console.log("Mongodb connected"))
.catch(err=>console.log("Mongodb no connected: ",err))