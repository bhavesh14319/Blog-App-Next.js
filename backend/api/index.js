const app = require('../app');
const serverless = require("serverless-http");

const connectDatabase = require('../config/database');
const cloudinary = require("cloudinary");



cloudinary.config({
  cloud_name: "dxx38ccfx",
  api_key: "549216885663435",
  api_secret: "DHSgyPTnPS59EawXBdgAXQ4J2Vw"
});

connectDatabase().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server running on port ', process.env.PORT);
    })
})

module.exports = serverless(app);