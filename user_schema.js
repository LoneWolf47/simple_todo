//Schema of our object(Todo):

const mongoose = require("mongoose");
const schema = new mongoose.Schema({
	id:{type:Number, required:true},
	name:{type:String, required:true},
	pass:{type:String, required:true}
},{collection:"user"});

module.exports = mongoose.model("user",schema);
