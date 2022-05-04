import app from "./app";
import connectDb from "./db/mongoose";
import dotenv from 'dotenv'
dotenv.config();

const port = process.env.PORT || 3500

connectDb();


app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
})