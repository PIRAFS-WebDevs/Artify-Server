const tagsModel = require("../Model/tagsModel");

const tags = async (req,res)=>{
    try {
        const {name,slug} = req.body;
        try {
            const checkdata = await tagsModel.find({name:name});
            if(!checkdata){
                await tagsModel({
                    name,
                    slug,
                }).save();
                res.status(200).send({success: true,massage:"tags Uploaded"})
            }else{
                res.status(404).send({success: false,massage:"tags all ready exists"})
            }
        } catch (error) {
            res.status(500).send({success: false,massage:"Internal server error"});
            
        }
    } catch (error) {
        res.status(501).send({success: false,massage:"fatching value error"})
        
    }
}

const updatetags = async(req,res)=>{
    try {
        const {_id,name,slug} = req.body;
        if(!id || !name || !slug){
            res.status(401).send({success: false,massage:"fill proper data"})
        }else{

            const checkdata = await tagsModel.findOne({_id:_id});
            if(checkdata){
                await tagsModel.findByIdAndUpdate(_id,{name,slug},{new:true});
                res.status(200).send({success: true,massage:"update succesfully"});
            }
        }

    } catch (error) {
        res.status(500).send({success: false,massage:"internal server error"});

        
    }
}

const gettags = async (req, res)=>{
    try {
        const data = await tagsModel.find();
        res.status(200).send({success:true,data});

    } catch (error) {
        
    }
}

const tagsDelete = async (req,res)=>{
    try {
      const {_id}=req.body;
      const checkdata = await tagsModel.findOne(_id);
      if(checkdata){
        await tagsModel.findByIdAndRemove(_id);
        res.status(200).send({success:true});
      }else{
        res.status(404).send({success:false,massage:"tags not found"});
      }
    } catch (error) {
      res.status(404).send({success:false,massage:"internal server error"});
    }
  }

module.exports = {
tags,
updatetags,
gettags,
tagsDelete
}