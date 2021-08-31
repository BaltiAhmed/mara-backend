const mongoose =require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
const schema = mongoose.Schema;

const userSchema = new schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlenght:8},
    tel:{type:String,required:true},
    adresse:{type:String,required:true},
    gouvernorat:{type:String,required:true},
    bloquage:{type:String,required:true},
    evenements:[{type:mongoose.Types.ObjectId,required:true,ref:'evenement'}],
    bonPlans:[{type:mongoose.Types.ObjectId,required:true,ref:'bonPlan'}],
    
    

})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('user',userSchema)