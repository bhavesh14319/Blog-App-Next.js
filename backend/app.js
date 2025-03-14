const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const useRoutes = require("./Routes/User");
const blogRouter = require("./Routes/Blog")



dotenv.config();

let allowedDomains = ['http://localhost:3000', 'https://bloggle-next.vercel.app'];
app.use(cors({
    // origin: 'http://localhost:3000',
    // origin:'*',
     origin:function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);
   
      if (allowedDomains.indexOf(origin) === -1) {
        let msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    optionsSuccessStatus: 200 ,// some legacy browsers (IE11, various SmartTVs) choke on 204,
    credentials:true
}))
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )

    console.log("Content-Length:", req.headers["content-length"]);
    next()
  })

app.use(require("cookie-parser")())

app.use(express.json({
    limit: "10mb"
}))



app.use("/api/v1", useRoutes)
app.use("/api/v1", blogRouter);

module.exports = app;
