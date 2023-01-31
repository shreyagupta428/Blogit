import { styled, Box, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { DataContext } from '../context/DataProvider';
import axios from 'axios';
// import "../../App.css";
import M from "materialize-css";
import {useEffect, useState,useContext} from "react";
import {Link, useNavigate} from "react-router-dom";


const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Post = ({ post }) => {
    const navigate = useNavigate();
    const url = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    const { userContext } = useContext(DataContext);

    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    const deleteBlog=()=>{
        axios.delete(`http://localhost:8000/deleteBlog/${post._id}`,{
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            }
        })
        .then((res)=>{
            M.toast({
                html: res.data.message,
                classes: "#43a047 green darken-1",
              });
        })
        .catch(err=>console.log(err))
   navigate("/");
    }

    return (
        <Container>
            <Image src={url} alt="post" />
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.description, 100)}</Details>
            <Box style={{ float: 'right' }}>
                {   
                    userContext.username === post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </>
                }
            </Box>
            
        </Container>
    )
}

export default Post;