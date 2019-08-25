var express=require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var url="mongodb://localhost/sampledb";

var product=require("../model/productmodel");

const router=express.Router();
router.use(bodyparser.urlencoded({extended:true}))

var brand_arr=[{
    "bid":"b01",
    "bname":"Adidas"
},
{
    "bid":"b02",
    "bname":"Nike"
},
{
    "bid":"b03",
    "bname":"Puma"
},
{
    "bid":"b04",
    "bname":"Sketchers"
},
{
    "bid":"b05",
    "bname":"Converse"
}];

var multer=require("multer");
var upload=multer({dest:'uploads/'})
var type=upload.single('file1');

mongoose.connect(url,function(err)
{
    if(err)
    throw err;
    else
        console.log("DB Connected!");
})

router.get("/",function(req,res)
{
    res.render("product");
})

// router.get("/product",function(req,res)
// {
//     res.redirect("/product")
// })

router.post('/upload',type,function(req,res)
{
    var p1 = new product();
    p1.pid = req.body.pid;
    p1.pname = req.body.pname;
    p1.brand = req.body.brand;
    p1.size = req.body.size;
    p1.price = req.body.price;
    p1.qty = req.body.qty;
    p1.image = req.file.filename;
    p1.save((err)=>{
        if (err) throw err;
        else
        {
            console.log("Product Added.");
            res.redirect("/product");
        }
    })
})
router.get("/view/:image",function(req,res){
    res.sendFile(__dirname+'/uploads/'+req.params.image)
})

router.get("/view",function(req,res){
    product.find({},function(err,result){
        if (err) throw err;
        else{
            console.log(result)
            res.render("productdetails",{productoutput:result});
        }
    })
    
})



module.exports=router;