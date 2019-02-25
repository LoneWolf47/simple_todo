//Schema of our object(Todo):

const mongoose = require("mongoose");
const schema = new mongoose.Schema({
	id:{type:Number, required:true},
    user:{type:String,required:true},
	task:{type:String, required:true},
	target:{type:Date, required:true},
	status:{type:Boolean, required:true}
	
},{collection:"todo"});

module.exports = mongoose.model("todo",schema);
