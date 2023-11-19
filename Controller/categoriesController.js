const categoriesModel = require("../Model/categoriesModel");

const category = async (req,res)=>{
    try {
        const {name,details,slug} = req.body;
        try {
            const checkdata = await categoriesModel.find({name:name});
            if(!checkdata){
                await categoriesModel({
                    name,
                    details,
                    slug,
                }).save();
                res.status(200).send({massage:"categories Uploaded"})
            }else{
                res.status(404).send({massage:"categories all ready exists"})
            }
        } catch (error) {
            res.status(500).send({massage:"Internal server error"});
            
        }
    } catch (error) {
        res.status(501).send({massage:"fatching value error"})
        
    }
}

const updateCategory = async(req,res)=>{
    try {
        const {_id,name,details,slug} = req.body;
        if(!id || !name || !details || !slug){
            res.status(401).send({massage:"fill proper data"})
        }else{

            const checkdata = await categoriesModel.findOne({_id:_id});
            if(checkdata){
                await categoriesModel.findByIdAndUpdate(_id,{name,details,slug},{new:true});
                res.status(200).send({massage:"update succesfully"});
            }else{
                res.status(404).send({success:false,massage:"category not found"});
            }
        }

    } catch (error) {
        res.status(500).send({massage:"internal server error"});

        
    }
}

const getCategory = async (req, res)=>{
    try {
        const data = await categoriesModel.find();
        res.status(200).send({data});

    } catch (error) {
        res.status(500).send({success:false,massage:"internal server error"});
    }
}

const categoriesDelete = async (req,res)=>{
    try {
      const {_id}=req.body;
      const checkdata = await categoriesModel.findOne(_id);
      if(checkdata){
        await categoriesModel.findByIdAndRemove(_id);
        res.status(200).send({success:true});
      }else{
        res.status(404).send({success:false,massage:"category not found"});
      }
    } catch (error) {
      res.status(500).send({success:false,massage:"internal server error"});
    }
  }

module.exports = {
category,
updateCategory,
getCategory,
categoriesDelete
}