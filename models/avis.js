const mongoose =require("mongoose")
const schema = mongoose.Schema;

const avisSchema = new schema({
    score:{type:String,required:true},
    description:{type:String,required:true}
    
})

module.exports = mongoose.model('avis',avisSchema)