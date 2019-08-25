var mongoose = require("mongoose");
var schema= mongoose.Schema; // instance created for schema

var userschema = new schema(             //schema structure
    {
        uname:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        role:{type:String,required:true}
    }
)

var usermodel=mongoose.model("users",userschema,"users");  
module.exports=usermodel;