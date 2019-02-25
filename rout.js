const express = require('express');
const router =express.Router();
const userModel =require("./user_schema");
const todoModel=require("./todo_schema");
const auth=require("basic-auth");   

router.post('/register',function(req,res)
{
let temp=new userModel ( {
    id:req.body.id,
    name:req.body.name,
    pass:req.body.pass
    } )

    temp.save( (err,temp) => {
     if(err) { console.log(err); res.send("Error inserting record.Check log for more details.");}
    else  res.send("Successfully Created");
    } )
} );

router.post("/create",function(req,res) {
    let temp=new todoModel ( {
        id:req.body.id,
        user:req.body.user,
        task:req.body.task,
        target:req.body.target,
        status:req.body.status
        } )
    
        temp.save( (err,temp) => {
         if(err)
         { console.log(err); res.send("Error inserting record.Check log for more details."); }
       else {console.log("Successfully Created"); res.send("Successfully Created a Todo"); }
        } )
} );

router.post("/login",function(req,res) { 
var cred = auth(req);

if(cred)
{
        userModel.find( {"name":cred.name,"pass":cred.pass},function(err,result) {
               if(Object.keys(result).length)
                {console.log("Access Granted"); res.redirect("/show/"+cred.name); }
                else { console.log("Access Denied"); res.send("Access Denied"); }
        } );
}
else console.log("Improper Credentials");
});

router.get("/show/:user",function(req,res) {
    todoModel.find({"user":req.params.user},function(err,result) {
        if(err){ console.log(err); res.send("Error accessing records,check log for more details."); }
        else{console.log("Query Successful"); res.send(result) }
    })
})

router.put("/changePass",function(req,res) { 
    userModel.update( {"name":req.query.name},{$set:req.body},function(err,result) {
    if(err){ console.log(err); res.send("Error inserting record.Check log for more details."); }
    else{console.log("Updated Successfully"); res.send("Password Updated Successfully") }
    } );
} );

router.put("/update", function(req,res) { 
    todoModel.update( {"user":req.query.name,"id":req.query.id},{$set:req.body},function(err,result) {
        if(err){ console.log(err); res.send("Error inserting record.Check log for more details."); }
        else{console.log(result); res.send("Records Updated Successfully") }
    } )
} )

router.delete('/delete', function(req,res) {
	let temp=todoModel.remove({"id":req.query.id,"user":req.query.name},function(err,temp) {
		if(err) { console.log(err); res.send("Error accessing record.Check log for more details."); }
        else {console.log("Deleted Successfully"); res.send("Deleted Successfully");}
    } );
} );
    
    router.delete('/remove',function(req,res) {
     userModel.remove( { "user":req.body.name,"pass":req.body.pass},function (err,result) {
        if(err) { console.log(err); res.send("Error accessing record.Check log for more details."); }
        else {console.log("User Deleted Successfully"); res.send("Deleted Successfully");}
     } );
    } );
	
	


module.exports=router;