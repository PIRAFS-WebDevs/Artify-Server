const productModel = require("../../Model/productModel");


const findProducts = async (req,res) =>{
    try {
        const text = req.params.text;
        console.log(text)
        if(text != " "){

          try {
              const products = await productModel.find(
                  {
                    $or: [
                      { name: { $regex: new RegExp(text, 'i') } },
                      { categories: { $in: [text] } },
                      { tags: { $in: [text] } },
                      { layout: { $regex: new RegExp(text, 'i') } },
                    ],
                  }
                )
                .sort({ name: 1 });
                console.log(products)
                if(products.length != 0){
  
                    res.status(200).send({success:true,products});
                }else{
                  res.status(400).send({success:false,massage:"product not found"})
                }
            
          } catch (error) {
              res.status(500).send({success:false,massage:"internal server error"});
          }
        }else{
          try {
              const products = await productModel.find(
                  // {
                  //   $or: [
                  //     { name: { $regex: new RegExp(text, 'i') } },
                  //     { categories: { $in: [text] } },
                  //     { tags: { $in: [text] } },
                  //     { layout: { $regex: new RegExp(text, 'i') } },
                  //   ],
                  // }
                )
                .sort({ name: 1 });
                console.log(products)
                if(products.length != 0){
  
                    res.status(200).send({success:true,products});
                }else{
                  res.status(400).send({success:false,massage:"product not found"})
                }
            
          } catch (error) {
              res.status(500).send({success:false,massage:"internal server error"});
          }
        }
    } catch (error) {
        res.status(500).send({success:false,massage:"internal server error"});
    }
}

  module.exports = {
    findProducts
  }