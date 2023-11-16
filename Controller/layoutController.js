const layoutModel = require("../Model/layoutModel");

const layout = async (req,res)=>{
    try {
        const {name,icon} = req.body;
        try {
            const checkdata = await layoutModel.find({name:name});
            if(!checkdata){
                await layoutModel({
                    name,
                    icon,
                }).save();
                res.status(200).send({success: true,massage:"layout Uploaded"})
            }else{
                res.status(404).send({success: false,massage:"layout all ready exists"})
            }
        } catch (error) {
            res.status(500).send({success: false,massage:"Internal server error"});
            
        }
    } catch (error) {
        res.status(501).send({success: false,massage:"fatching value error"})
        
    }
}

const updatelayout = async(req,res)=>{
    try {
        const {_id,name,icon} = req.body;
        if(!id || !name || !icon){
            res.status(401).send({success: false,massage:"fill proper data"})
        }else{

            const checkdata = await layoutModel.findOne({_id:_id});
            if(checkdata){
                await layoutModel.findByIdAndUpdate(_id,{name,icon},{new:true});
                res.status(200).send({success: true,massage:"update succesfully"});
            }else{
                res.status(404).send({success:false,massage:"layout not found"});
            }
        }

    } catch (error) {
        res.status(500).send({success: false,massage:"internal server error"});

        
    }
}

const getlayout = async (req, res)=>{
    try {
        const data = await layoutModel.find();
        res.status(200).send({success:true,data});

    } catch (error) {
        res.status(500).send({success:false,massage:"internal server error"});
        
    }
}

const layoutDelete = async (req,res)=>{
    try {
      const {_id}=req.body;
      const checkdata = await layoutModel.findOne(_id);
      if(checkdata){
        await layoutModel.findByIdAndRemove(_id);
        res.status(200).send({success:true});
      }else{
        res.status(404).send({success:false,massage:"layout not found"});
      }
    } catch (error) {
      res.status(404).send({success:false,massage:"internal server error"});
    }
  }

module.exports = {
layout,
updatelayout,
getlayout,
layoutDelete
}