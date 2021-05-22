const mongoose =require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
const schema = mongoose.Schema;

const userSchema = new schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlenght:8},
    tel:{type:String,required:true},
    photo:{type:String,required:true},
    bloquage:{type:String,required:true},
    

})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('user',userSchema)