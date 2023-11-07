const userloginModel= require("../../Model/userModel");
const { hashPassword,comparePasswords } = require("../../middleware/bcrypt");
const { createToken } = require("../../middleware/jsonwebtoken");

const userSingup = async (req,res)=>{
    const {firstName,lastName,email,phoneNumber,countryName,address,password} = req.data;
    console.log("hello");
    if(!firstName || !email || !password){
        res.status(401).send(false);
    }else{
        try
        {const encryptPassword = await hashPassword(password);
            console.log(encryptPassword);
         const smUserName = firstName.toLowerCase();
        const adduser = await new userloginModel({
            full_name:firstName+" "+lastName,
            user_name: smUserName+(Math.floor(1000 + Math.random() * 9000)),
            email: email,
            phoneNumber:phoneNumber,
            countryName:countryName,
            address:address,
            password:encryptPassword,
        }).save();

        const token = await createToken(email);
        
        // res.cookie("_t", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'Strict', 
        //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        //   });
    
    }
        catch(e){
            console.log(e);
        }

        res.status(200).send(true);
    }
}


const userLogin = async (req,res)=>{

    const {email,password} = req.data;

    if(email || password){

        try{
            const data = await userloginModel.findOne({$or: [
                { user_name: email },
                { email: email }
              ]});

              //console.log(data.password);

              if(data){
                const isMatch  = await comparePasswords(password, (data.password))
            
                            if (isMatch) {
                            console.log('Passwords match. Authentication successful.');
                            res.status(200).send(true);
                            } else {
                            console.log('Passwords do not match. Authentication failed.');
                            res.status(404).send(true);
                            }
                    
              
                            const token = await createToken(data.email);
                            console.log(token);
        
                            // res.cookie("_t", token, {
                            //     httpOnly: true,
                            //     secure: true,
                            //     sameSite: 'Strict', 
                            //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                            //   });
                                      }
              
        }catch(e){
            console.log(e);
        }
    }


}

module.exports ={
    userSingup,
    userLogin,

}