import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const signupUser =async (req,res)=>{

  const { name, email, username, password } = req.body;
  if (!email || !password || !name ||!username)
    return res.json({ error: "Please add all the fields" });
  else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (savedUser)
          {
            return res.json({ error: "User already exists with that email" });}
        else {
          User.findOne({username:username})
          .then((savedUser)=>{
            if(savedUser)
             return res.json({ error: "Username already exist" });
             else 
             {
                bcrypt.hash(password, 12).then((hashedpassword) => {
                  const user = new User({
                    email: email,
                    password: hashedpassword,
                    name: name,
                    username: username
                  });
                  user
                    .save()
                    .then((user) => {
                      res.json({ message: "saved successfully" });
                    })
                    .catch((err) => console.log(err));
                });
             }
          })
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // try{
  //   const user=req.body;
  //   const newUser=new User(user);
  //   await newUser.save();
  //   return res.status(200).json({message:"Signup successful"})
  // }catch(error)
  // {
  //   return res.status(500).json({message:"Error while signing up"})
  // }
}



export const loginUser = (req,res)=>{
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ error: "Please provide username and password" });
  } else {
    User.findOne({ username: username })
      .then((savedUser) => {
        if (!savedUser) return res.json({ error: "invalid user or password" });
        else {
          bcrypt
            .compare(password, savedUser.password)
            .then((doMatch) => {
              if (doMatch === true) {

                const token = jwt.sign({ _id: savedUser._id }, "hkkfdwrilewjsi");
                const { _id, email, name, username } = savedUser;
                res.json({ token, user: { _id, name, email, username } });

              } 
              else 
                return res.json({ error: "invalid username or password" });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
}