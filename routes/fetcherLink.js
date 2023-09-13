var express = require("express");
var blogTable = require("../model/table")

var router = express.Router()
router.post("/addInfo",(req,res) => {console.log("API Working",req.body)
var blogs = new blogTable({
    title: req.body.title,
    blogDate:req.body.blogblogdate,
    description:req.body.description, 
})
blogs.save().then(
    (data)=>{
        console.log("Save data" , data)
        return res.status(200).json({saveData : data})
    }
).catch((error)=>{console.log("Error data" , error)
return res.status(400).json({saveData : error})})
})

router.get("/getData", (req, res) => {

    console.log("paramsData",req.params.title)
    blogTable
    .find()
    .then((data) => {
      return res.status(200).json({ getData: data });
    })
    .catch((error) => {
      console.log("Error data", error);
      return res.status(400).json({ getData: error });
    });
});

router.post("/update/:id",(req,res)=> {
    console.log("id",req.params.id)
    blogTable.findByIdAndUpdate({_id : req.params.id},{$set:req.body},{new: true}).then((data)=> {
        return res.status(200).json({ putData: "data Updated succesfully" });
    }).catch((error) => {
        console.log("Error data", error);
        return res.status(400).json({ putData: error });
    })
})

router.get("/getData/:title", (req, res) => {

    console.log("paramsData",req.params.title)
    blogTable
    .findById({_id : req.params.title},{$set:req.body},{new: true})
    // . get(_id, (req, res) => { const id = req.params.title; })
    .then((data) => {
      return res.status(200).json({ getData: data });
    })
    .catch((error) => {
      console.log("Error data", error);
      return res.status(400).json({ getData: error });
    });
});
module.exports = router;
