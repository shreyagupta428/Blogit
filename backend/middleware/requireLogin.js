import  jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from "../model/user.js";

const requireLogin =(req,res,next)=>{
    
    const {authorization}=req.headers
    //console.log(5)
    //console.log(authorization)
    //authorization
    if(!authorization)
    {
        console.log(6)
        
       return  res.status(401).json({error:"Youuu must be logged in"})
    }
    else{
       console.log(7)
        const token = authorization.replace("Bearer ","")
        jwt.verify(token,"hkkfdwrilewjsi",(err,payload)=>{
            if(err){
             return   res.status(401).json({error:"you must be logged in"})
            }
    
            const {_id} = payload
            User.findById(_id).then(userdata=>{
                req.user = userdata
                next()
            })
        })    
    }
}
export default requireLogin;