var express = require("express");
var blogTable = require("../model/table")

var router = express.Router()

const invalidChars = (body) => {
    const {title} = body;
    // 'Miss-'.split('').filter(v=>!/[a-z-]/.test(v.toLowerCase()))
    return title?.split('').filter(v=>!/[a-z-]/.test(v.toLowerCase()))
}

router.post("/addInfo",(req,res) => {console.log("API Working",req.body)
// if(invalidChars({...res.body}).length > 0){ return res.status(400).json({saveData:"Validation Failed!"})}
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

router.get("/getData", (request, response) => {
     if (request.query.search) {
      // finding
      console.log("Finding for: ", request.query.search);
      Blog.findOne({ title: request.query.search })
       .then((data) => {
        return response.status(200).json({ data });
       })
       .catch((error) => {
        return response.status(400).json({ data: error });
       });
     }
     else {
      Blog.find()
       .then((data) => {
        return response.status(200).json({ data });
       })
       .catch((error) => {
        return response.status(400).json({ data: error });
       });
     }
    });

module.exports = router;
