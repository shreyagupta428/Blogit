import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
// import "../../App.css";
import M from "materialize-css";

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl  } from '@mui/material';
// import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation,useParams } from 'react-router-dom';

// import { API } from '../../service/api';
import { DataContext } from '../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    username: '',
    createdDate: new Date()
}

const UpdateBlog = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const [post, setPost] = useState(initialPost);
    const { userContext } = useContext(DataContext);

    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    useEffect(() => {
        post.username = userContext.username;
    }, [])

    useEffect(() => {
        const fetchData = async () => { 
            console.log(id)
            let response = await axios.get(`http://localhost:8000/blogDetail/${id}`,
                {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("jwt"),
                    }
                }
                )
                console.log(response)
            if (response) {
               setPost(response.data)
            }
            else
            {
                console.log(response)
            }
        }
        fetchData();
    }, []);

    const updateBlog = ()=>{
        console.log(post)
        axios.put(`http://localhost:8000/update/${id}`,post, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            }})
            .then((res) => {
                M.toast({
                  html: res.data.message,
                  classes: "#43a047 green darken-1",
                });
              })
              .catch((err) => console.log(err));

              navigate('/');

    }


    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                {/* <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                /> */}
                <InputTextField onChange={(e) => handleChange(e)} value={post.title}name='title' placeholder="Title" />
                <Button onClick={()=>updateBlog()} variant="contained" color="primary">Update</Button>
            </StyledFormControl>

            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                value={post.description}
                onChange={(e) => handleChange(e)} 
            />
        </Container>
    )
}

export default UpdateBlog;