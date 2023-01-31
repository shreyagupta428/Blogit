import mongoose from "mongoose";



const Connection = async(username,password)=>{
    const URL=`mongodb://${username}:${password}@ac-ufo9b5b-shard-00-00.zfmo9wz.mongodb.net:27017,ac-ufo9b5b-shard-00-01.zfmo9wz.mongodb.net:27017,ac-ufo9b5b-shard-00-02.zfmo9wz.mongodb.net:27017/?ssl=true&replicaSet=atlas-1jvhwe-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL,{useNewUrlParser:true});
        console.log("Database connection successful")
    }
    catch(error)
    {
        console.log(error)
    }
}
export default Connection;