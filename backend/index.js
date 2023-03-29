const express = require("express");
require("dotenv").config()
const {connection} = require("./configs/db") 
const {userRouter} = require("./routes/user.routes")
const cors = require("cors")
const app = express()
app.use(express.json())


// server part//

app.listen(process.env.port,async()=>{

    try{
           await connection 
        console.log(`Server is running at port ${process.env.port}`)
    }
    catch(err){
        console.log(err.message)
    }
})


