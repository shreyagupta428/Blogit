import {Box,TextField,Button,Typography} from '@mui/material';
import { useState,useContext } from 'react';
import axios from "axios"
import "../../App.css";
import M from "materialize-css";
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';


const Login=({setUserAuthenticated})=>{

    const [account,setAccount]=useState("login");

    const {setUserContext}=useContext(DataContext);

    const [user,setUser]=useState({
        name:'',
        email:'',
        username:'',
        password:''
       });

    const navigate=useNavigate();

    const [loginUser,setLoginUser]=useState({username:'',
    password:''});


    const handleAccount=()=>{
        if(account==='login')
        setAccount("signup")
        else
        setAccount("login")
    }

    const onInputChange=(e)=>{
        if(account==='signup')
        setUser({...user,[e.target.name]:e.target.value})
        else
        setLoginUser({...loginUser,[e.target.name]:e.target.value})
    }



    const handleSingup =(e)=>{
        // e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(user.password)) {
      M.toast({
        html:
          "Password must contain atleast 6 characters,including UPPER/lowercase and numbers",
        classes: "#c62828 red darken-3",
      });
      return;
    }

        axios
      .post("http://localhost:8000/signup", user)
      .then((res) => {

        if (res.data.error)
          M.toast({ html: res.data.error, classes: "#c62828 red darken-3" });

        else {

          M.toast({
            html: "Signed up successfully",
            classes: "#43a047 green darken-1",
          });

        //   history.push("/home");
        console.log("Signed up successfully")

        }
      })

      .catch((err) => console.log(err));
    }

    const handleLogin =()=>{

        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(loginUser.password)) {
            M.toast({
              html:
                "Password must contain atleast 6 characters,including UPPER/lowercase and numbers",
              classes: "#c62828 red darken-3",
            });
            return;
          }

          axios
          .post("http://localhost:8000/login", loginUser)

          .then((res) => {

            if (res.data.error)

              M.toast({ html: res.data.error, classes: "#c62828 red darken-3" });

            else {
                setUserAuthenticated(true);
              localStorage.setItem("jwt", res.data.token);

              localStorage.setItem("user", JSON.stringify(res.data.user));
              setUserContext({username:res.data.user.username,email:res.data.user.email,name:res.data.user.name})
            //   dispatch({ type: "USER", payload: res.data.user });

              M.toast({
                html: "Signed in successfully",
                classes: "#43a047 green darken-1",
              });
              
              
              navigate('/')
            //   history.push("/home");

            
            }
          })

          .catch((err) => console.log(err));

    }

   return (
    <Box>
    {account === 'login' ? 
    <Box className="LoginBox">
        <h2 style={{fontFamily:"Raleway",textAlign:"center",marginTop:"20px"}}>Login</h2>

        <Box style={{padding: "25px 35px", display:"flex",flex:1,flexDirection:"column", marginTop:"20px"}}>

        <TextField variant="standard" label="Enter username" onChange={(e)=>onInputChange(e)}  name="username"/>

        <TextField variant="standard" label="Enter password"onChange={(e)=>onInputChange(e)}  type='Password' name="password"/>

        <Box style={{marginTop:"20px",display:"flex",flex:1,flexDirection:"column"}}>

        <Button variant="contained"onClick={()=>handleLogin()}>Login</Button>

        <Typography style={{textAlign:'center'}}>OR</Typography>

        <Button style={{boxShadow:"0px 2px 4px 0px rgb(0 0 0/20%)"}} onClick={()=>handleAccount()}>Create an account</Button>

        </Box>

        </Box>
    </Box>
        :
        <Box className="LoginBox">

            <h2 style={{fontFamily:"Raleway",textAlign:"center",marginTop:"20px"}}>Signup</h2>

            <Box style={{padding: "25px 35px", display:"flex",flex:1,flexDirection:"column", marginTop:"20px"}}>

                <TextField variant="standard" label="Enter name" onChange={(e)=>onInputChange(e)} name="name" />

                <TextField variant="standard" label="Enter email" onChange={(e)=>onInputChange(e)} name="email" />

                <TextField variant="standard" label="Enter username" onChange={(e)=>onInputChange(e)} name="username"/>

                <TextField variant="standard" label="Enter password" onChange={(e)=>onInputChange(e)}  type='Password' name="password"/>

                    <Box style={{marginTop:"20px",display:"flex",flex:1,flexDirection:"column"}}>

                    <Button variant="contained" onClick={()=>handleSingup()}>Signup</Button>

                    <Typography style={{textAlign:'center'}}>OR</Typography>

                    <Button style={{boxShadow:"0px 2px 4px 0px rgb(0 0 0/20%)"}} onClick={()=>handleAccount()}>Already have an account</Button>

                    </Box>
        </Box>
    </Box>
   }
</Box>
   )
}
export default Login;