//mongoose
const mongoose = require("mongoose");

/* - registrar recordatorio (idUsuario-nombreActividad-fechaInicio(fechasistema)-descripcion)*/
//Schema
const reminderSchema = new mongoose.Schema({
    userId:String,
    name:String,
    startDate:{type:Date,default:Date.now},
    description:String
})

const Reminder = mongoose.model("reminders",reminderSchema);

//exports

module.exports = Reminder;

