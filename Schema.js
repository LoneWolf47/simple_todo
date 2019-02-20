//Schema of our object(Todo):

const mongoose = require("mongoose");
const schema = mongoose.Schema;

let model=new schema( {
	id: {type:Number, required:true},
	task:{type: String,required:true},
	target:{type:Date, required:true},
	status:{type:Boolean,required:true}
} );

module.exports = mongoose.model("todo",model)