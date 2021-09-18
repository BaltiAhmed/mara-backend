const mongoose =require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
const schema = mongoose.Schema;

const siteSchema = new schema({
    nom:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlenght:8},
    description:{type:String,required:true},
    adresse:{type:String,required:true},
    gouvernorat:{type:String,required:true},
    long:{type:String,required:true},
    lat:{type:String,required:true},
    tel:{type:String,required:true},
    photo:{type:String,required:true},
    categorie:{type:String,required:true},
    capacite:{type:String,required:true},
    scoreT:{type:Number,required:true},
    NRating:{type:Number,required:true},
    TRating:{type:Number,required:true},
    evenements:[{type:mongoose.Types.ObjectId,required:true,ref:'evenement'}],
    bonPlans:[{type:mongoose.Types.ObjectId,required:true,ref:'bonPlan'}],
    avis:[{type:mongoose.Types.ObjectId,required:true,ref:'avis'}],
    transports:[{type:mongoose.Types.ObjectId,required:true,ref:'transport'}],

})
siteSchema.plugin(uniqueValidator)

module.exports = mongoose.model('site',siteSchema)