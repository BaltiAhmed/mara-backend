const mongoose =require("mongoose")
const schema = mongoose.Schema;

const notificationSchema = new schema({
    message:{type:String,required:true},
    type:{type:String,required:true},
    image:{type:String,required:true},
    id:{type:String,required:true}   
})

module.exports = mongoose.model('notification',notificationSchema)