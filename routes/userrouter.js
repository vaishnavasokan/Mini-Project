var express=require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var url="mongodb://localhost/sampledb";

var user=require("../model/usermodel")

const router=express.Router();
router.use(bodyparser.urlencoded({extended:true}))

mongoose.connect(url,function(err)
{
    if(err)
    throw err;
    else
        console.log("DB Connected!");
})

router.get("/",function(req,res)
{
    res.redirect("/register")
})

router.post("/login",function(req,res)
{
    var un=req.body.uname;
    var pwd=req.body.pswd;

    user.find({uname:un,password:pwd},function(err,result)
    {
        if(err)
            throw err;
        else
        {
            if(result.length==0)
            res.redirect("/index")
            else
            res.redirect("/user/productdetails");
        }
    })
})

router.post("/newuser",function(req,res)
{
    var u1=new user();
    u1.uname=req.body.uname;
    u1.email=req.body.email;
    u1.password=req.body.pswd;
    u1.role=req.body.role;
    u1.save(function(err){
        if(err) throw err
        else
        {
            res.redirect("/");

        }
    });

})


/*router.get("/view",function(req,res)
{
    res.send("View Employee")
})*/

router.get("/view",function(req,res)
{
    emp.find({},function(err,result)
    {
        if(err)
        throw err;
        else
        {
            //console.log(result);
            res.render("viewemp",{empdata:result});
        }
            
    })
})

router.get("/edit/:id",function(req,res)
{
    var id=req.params.id;
    console.log(id);
    //emp.findOne({},function(err,result))
    //empdata.eid
    emp.find({eid:id},function(err,result)
    {
        if(err)
        throw err;
        else
        {
            console.log(result);
            res.render("editemp",{empdata:result});
        }      
    })

});

router.post("/update",function(req,res)
{
    emp.update({eid:req.body.eid},{$set:{ename:req.body.ename,salary:req.body.sal}},function(err,result)
    {
        if(err)
        throw err;
        else
        emp.find({},function(err,result)
        {
            if(err)
            throw err;
            else
            {
                console.log(result);
                res.render("viewemp",{empdata:result});
            }
        })
    })
    
})

router.get("/delete/:id", function(req,res)
{
    var id=req.params.id;
    emp.deleteOne({eid:id},function(err)
    {
        if(err)
        throw err;
        else
        {
            //console.log(result);
            res.redirect("/emp/view");
        }
    })
})

module.exports=router;