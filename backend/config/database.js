// const mongoose = require('mongoose')

// const connectDatabase = async ()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URI).then((con)=>{
//             console.log('Connected to database: ',con.connection.host);
//         }).catch((e)=>{
//             console.log(e);
//         })
//     }catch(e){
//         console.log(e)
//     }
// }

// module.exports=connectDatabase;

const mongoose = require("mongoose");

let isConnected = false; // Track connection state

const connectDatabase = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
