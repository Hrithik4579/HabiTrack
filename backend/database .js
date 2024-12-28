const mongoose = require('mongoose');

const connectToMongo = async ()=> {
    try{ 
    const conn = await mongoose.connect("mongodb+srv://hbhagat2053:hbhagat123@cluster1.pw8fq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", {
        useNewUrlParser:true,
        useUnifiedTopology:true,
     
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`)

     }catch(error){
         console.error(`Error: ${error.message}`);
         process.exit();

     }
}

module.exports= connectToMongo;