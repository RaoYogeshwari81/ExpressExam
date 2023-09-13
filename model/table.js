const mongoose = require("mongoose");
// const schema = mongoose.Schema
const {Schema} = mongoose

var tableStructure = new Schema({
    title:{type : String},
    blogdate :{BlogDate : Date},
    description:{type : String}
},
{timestamps : true})

var blog = mongoose.model("blogMst",tableStructure)

module.exports = blog;


