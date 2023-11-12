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
        if(_id && updateValue){
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

            }catch(e){
                
            }
        }
    }catch(e){

    }
}

const ProductShowForUser = async(req,res)=>{
    try {
        const data = await productModel.find({status:true})
       // console.log(data.name);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
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
                res.status(404).send(`Product with ID ${item.id} not found`);
            }
    
            // Calculate the total price for the item
            const itemPrice = parseFloat(product.price) * item.quantity;
            totalPrice += itemPrice;
    
            // Decrease the stock of the product
            product.quantity -= item.quantity;
            await product.save();
        }
    } catch (error) {
        
    }
}

module.exports ={
    createProduct,
    GetAllProduct,
    SingleProduct,
    productUpdate,
    ProductShowForUser,
    BuyProduct

}