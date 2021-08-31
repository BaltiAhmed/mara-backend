const mongoose =require("mongoose")
const schema = mongoose.Schema;

const bonPlanSchema = new schema({
    titre:{type:String,required:true},
    description:{type:String,required:true},
    Ddebut:{type:String,required:true},
    Dfin:{type:String,required:true},
    type:{type:String,required:true},
    
})

module.exports = mongoose.model('bonPlan',bonPlanSchema)