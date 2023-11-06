const userloginModel= require("../../Model/userModel");
const { hashPassword } = require("../../middleware/bcrypt");

const userSingup = async (req,res)=>{
    const {fullName,userName,email,phoneNumber,countryName,address,password} = req.body;
    console.log("hello");
    if(!fullName || !userName || !email || !phoneNumber || !countryName || !address || !password){
        res.status(401).send(false);
    }else{
        try
        {const encryptPassword = hashPassword(password);
        const smUserName = username.toLowerCase();
        const adduser = await new userloginModel({
            full_name:fullName,
            user_name: smUserName,
            email: email,
            phoneNumber:phoneNumber,
            countryName:countryName,
            address:address,
            password:encryptPassword,
        }).save();}
        catch(e){
            console.log(e);
        }

        res.status(200).send(true);
    }
}


const userLogin = async (req,res)=>{

    const {usernameOrEmail,password} = req.body;

    if(usernameOrEmail || password){

        try{
            const data = userloginModel.findOne({$or: [
                { user_name: usernameOrEmail },
                { email: usernameOrEmail }
              ]});

              if(data){
                comparePasswords(password, data.password)
                        .then((isMatch) => {
                            if (isMatch) {
                            console.log('Passwords match. Authentication successful.');
                            res.status(200).send(true);
                            } else {
                            console.log('Passwords do not match. Authentication failed.');
                            res.status(404).send(true);
                            }
                        })
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