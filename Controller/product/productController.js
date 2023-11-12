const productModel = require("../../Model/productModel");

const createProduct = async(req,res)=>{
    try {
        const{product_id,product_name,product_price,product_owner} = req.body;
        try {
            const data = await new productModel({
                product_id,
                product_name,
                product_price,
                product_owner
            }).save();

            res.status(201).send(true);
            
        } catch (error) {
            console.log("error while saving the product data ",error);
            
        }
    } catch (error) {
        console.log("error in get the value ",error);
        
    }
}

const GetAllProduct = async (req,res)=>{
    try {
        const productData = await productModel.find();
        res.status(200).send(productData);
    } catch (error) {
        
    }
}

const SingleProduct = async (req,res)=>{
    try {
        const {_id}= req.body;
        if(_id){

            try {
                const singleData = productModel.findById({_id:_id});
                if(singleData){
                    res.status(200).send(singleData)
                }else{
                    res.status(401).send({"massage":"product not found"});
                }
            
            } catch (error) {
                console.log("error while search the product",error);
                
            }
        }

        
    } catch (error) {
        console.log("error get the value",error);
    }
}

const productUpdate = async(req, res)=>{
    try {
        let _id= req.params._id;
        let {product_name,product_id,product_price,product_owner} = req.body;
        //console.log('updateValue',updateValue);
        if(_id && updateValue){
            try {
                const updateValue = await productModel.findByIdAndUpdate({_id:_id},{product_name,product_id,product_owner,product_price},{new:true});

            }catch(e){
                
            }
        }
    }catch(e){

    }
}

module.exports ={
    createProduct,
    GetAllProduct,
    SingleProduct,
    productUpdate,
}