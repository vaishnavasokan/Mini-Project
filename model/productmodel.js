var mongoose = require("mongoose");
var schema= mongoose.Schema; // instance created for schema

var productschema = new schema(             //schema structure
    {
        pid:{type:String,required:true},
        pname:{type:String,required:true},
        brand:{type:String,required:true},
        size:{type:String,required:true},
        image:{type:String,required:true},
        price:{type:Number,required:true},
        qty:{type:Number,required:true},
    }
)

var productmodel=mongoose.model("product",productschema,"product");  
module.exports=productmodel;