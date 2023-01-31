import {Link} from "react-router-dom";
import {Button,styled } from '@mui/material';
import {useEffect, useState} from "react";
import axios from "axios"
// import "../../App.css";
import { Grid, Box } from '@mui/material';
import M from "materialize-css";
import Post from './Post';

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

const Home=()=>{

    const [allBlogs,setAllBlogs]=useState([]);

        useEffect(() => {
            const fetchData = async () => { 
                let response = await axios.get("http://localhost:8000/allBlogs",
                    {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: "Bearer " + localStorage.getItem("jwt"),
                        }}
                    )
                    console.log(response)
                if (response) {
                    setAllBlogs(response.data);
                }
            }
            fetchData();
        }, []);


    return (
        <div>
        
        
        <Box style={{marginLeft:"250px",marginRight:"250px",marginTop:"20px"}}>
        {
            allBlogs?.length ? allBlogs.map(post => (
                <Grid item lg={3} sm={4} xs={12}>
                      {console.log("Post",post)}
                        <Post post={post} />
                    
                </Grid>
            )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                    No data is available for selected category
                </Box>
        }
        </Box>
        <Box style={{marginLeft:"500px",marginRight:"500px"}}>
        <Link to="/create" >
            <StyledButton variant="contained" style={{textDecoration:'none'}}>Create a new Blog</StyledButton>
        </Link>
        </Box>
        </div>
    )
}

export default Home;