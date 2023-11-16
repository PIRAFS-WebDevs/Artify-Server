const cartModel = require("../../Model/cartModel");
const productModel = require("../../Model/productModel");

const createProduct = async(req,res)=>{
    try {
        const {
            id,
            name,
            slug,
            description,
            type_id,
            price,
            shop_id,
            sale_price,
            min_price,
            max_price,
            quantity,
            in_stock,
            status,
            image,
        } = req.body;
       // console.log("hello")
        try {
            const data = await new productModel({
                id,
            name,
            slug,
            description,
            type_id,
            price,
            shop_id,
            sale_price,
            min_price,
            max_price,
            quantity,
            in_stock,
            status,
            image,
            }).save();

            res.status(201).send(true);
            
        } catch (error) {
            console.log("error while saving the product data ",error);
            res.status(500).send({success:false,massage:"internal server error"});
            
        }
    } catch (error) {
        console.log("error in get the value ",error);
        res.status(500).send({success:false,massage:"internal server error"});
        
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
                    res.status(200).send({success:true,singleData})
                }else{
                    res.status(401).send({success:false,massage:"product not found"});
                }
            
            } catch (error) {
                console.log("error while search the product",error);
                res.status(500).send({success:false,massage:"internal server error"});
                
            }
        }

        
    } catch (error) {
        console.log("error get the value",error);
        res.status(500).send({success:false,massage:"internal server error"});
    }
}

const productUpdate = async(req, res)=>{
    try {
        let _id= req.params._id;
        let {id,
            name,
            slug,
            description,
            type_id,
            price,
            shop_id,
            sale_price,
            min_price,
            max_price,
            quantity,
            in_stock,
            status,
            image,} = req.body;
        //console.log('updateValue',updateValue);
        const checkdata = await productModel.findOne(_id);
        if(checkdata){
            try {
                const updateValue = await productModel.findByIdAndUpdate({_id:_id},{id,
                    name,
                    slug,
                    description,
                    type_id,
                    price,
                    shop_id,
                    sale_price,
                    min_price,
                    max_price,
                    quantity,
                    in_stock,
                    status,
                    image,},{new:true});

                    res.status(200).send({succes:true,updateValue})

            }catch(e){
                res.status(404).send({success:false,massage:"internal server error"});
            }
        }else{
            res.status(404).send({success:false,massage:(`Product with ID ${_id} not found`)});
        }
    }catch(e){
        res.status(404).send({success:false,massage:"internal server error"});
    }
}

const ProductShowForUser = async(req,res)=>{
    try {
        const data = await productModel.find({status:true})
       // console.log(data.name);
        res.status(200).send({success:true,data});
    } catch (error) {
        console.log(error)
        res.status(404).send({success:false,massage:"internal server error"});
    }
}


const BuyProduct = async(req,res) =>{
    try {
        const _id = req.params._id
        const cartData = await cartModel.findOne({user_id:_id})
        const items = cartData.item;
        let totalPrice = 0;
    
        for (const item of items) {
            const product = await productModel.findById(item.id);
            if (!product) {
            res.status(404).send({success:false,massage:(`Product with ID ${item.id} not found`)});
            }
    
            // Calculate the total price for the item
            const itemPrice = parseFloat(product.price) * item.quantity;
            totalPrice += itemPrice;
    
            // Decrease the stock of the product
            product.quantity -= item.quantity;
            await product.save();
        }
    } catch (error) {
        res.status(404).send({success:false,massage:"internal server error"});
        
    }
}
const ProductDelete = async (req,res)=>{
    try {
      const {_id}=req.body;
      const checkdata = await productModel.findOne(_id);
      if(checkdata){
        await productModel.findByIdAndRemove(_id);
        res.status(200).send({success:true});
      }else{
        res.status(404).send({success:false,massage:"product not found"});
      }
    } catch (error) {
      res.status(500).send({success:false,massage:"internal server error"});
    }
  }


const productRatings = async (req,res)=>{
    try {
        const {prod_id,user_id,number,text1}= req.body;
        const text ={
            user_id:user_id,
            text:text1
        }
        try {
            const checkData = productModel.findOne(
                { _id: prod_id, 'activity.ratings.user_id': user_id });
                if (checkData) {
                    Product.findOneAndUpdate(
                      { _id: prod_id, 'activity.ratings.user_id': user_id },
                      {
                        $set: { 'activity.ratings.$.number': number },
                        $push: { 'activity.comment': text },
                      },
                      { new: true },
                      (updateErr, updatedProduct) => {
                        if (updateErr) {
                          console.error('Error updating product:', updateErr);
                        } else {
                          console.log('Updated product:', updatedProduct);
                        }
                      }
                    );
                  } else {
                    Product.findByIdAndUpdate(
                      prod_id,
                      {
                        $push: { 'activity.ratings.user_id': user_id,'activity.ratings.$.number': number, 'activity.comment': text },
                      },
                      { new: true },
                      (updateErr, updatedProduct) => {
                        if (updateErr) {
                          console.error('Error updating product:', updateErr);
                        } else {
                          console.log('Updated product:', updatedProduct);
                        }
                      }
                    );
                  
                }
        } catch (error) {
            res.status(500).send({success:false,massage:"internal server error"});
        }
    } catch (error) {
        res.status(500).send({success:false,massage:"internal server error"});
    }
}
module.exports ={
    createProduct,
    GetAllProduct,
    SingleProduct,
    productUpdate,
    ProductShowForUser,
    BuyProduct,
    ProductDelete,
    productRatings

}