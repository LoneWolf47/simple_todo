//Required Modules

const express = require('express');
const router =express.Router();
const model =require("./Schema.js");



router.get('/',function(req,res) { 
  res.send("Get Method to HomePage");
});


router.post('/',function(req,res) { 
  res.send("Post Method to HomePage");
});



router.post('/create',function(req,res) {
	let temp = new model(  {
		id:req.body.id,
		task:req.body.task,
		target:req.body.target,
		status:req.body.status
	}
	);
	
	temp.save(function(err,temp){
		if(err) throw err;
	 res.send("Successfully Created");
	} );
	 	
} );	



router.post('/showall',function(req,res) {
	let temp=model.find(function(err,temp){
		if(err) throw err;
		res.send(temp);
	} );
	
} );



router.put('/update',function(req,res){
	let temp=model.update({"id":req.query.id},{$set:req.body},function(err,temp) {
		if(err) throw err;
		 res.send("Updated Successfully");
		
	});
} );




router.post('/show',function(req,res) {
	let temp=model.find({"id":req.query.id},function(err,temp){
		if(err) throw err;
		res.send(temp);
	} );
	
} );


router.delete('/delete', function(req,res) {
	let temp=model.remove({"id":req.query.id},function(err,temp) {
		if(err) throw err;
        res.send("Deleted Successfully");
	} );
	
	} );
	
	
router.delete('/deleteall',function(req,res) {
 model.remove((err)=>{if(err) throw err;
 res.send("All documents removed")} );
} ); 

module.exports =router;