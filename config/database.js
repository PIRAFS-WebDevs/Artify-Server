const mongoose =  require("mongoose");

const connectDatabase = async() => {
  try{
      const conn = await mongoose.connect(process.env.DB_URI)
      console.log(`Mongodb connected with server: ${conn.connection.host}`);
    }
  catch(error){
    console.log(`Error in Mongodb ${error}`);
  }
};

module.exports=connectDatabase;
