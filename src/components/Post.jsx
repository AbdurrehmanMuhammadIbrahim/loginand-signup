import React from "react";
import '../App.css'; 
import axios from 'axios';
// import {useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import { baseurl } from '../core';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import Button from "@mui/material/Button";
import * as Yup from 'yup';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';

// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
const SignupSchema = Yup.object({
  firstName: Yup
  .string('Enter your First Name')
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Enter your FirstName'),
  lastName: Yup
  .string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Enter your LastName'),
//   email: Yup

//   .string('Enter your Email')
//   .email('Enter a valid Email')
//   .min(6, 'Too Short!')
//   .max(50, 'Too Long!')
//   .required('Required'),
//   password:Yup
//   .string('Enter your Password')
// .required('Enter a password')
//   .min(6, 'password is weak!')
//   .required('Please enter password here'),
});






function Posts() {
  // let history = useHistory();


  const [users, setUsers] = useState([]);
  const [toggleGetUser, setToggleGetUser] = useState(false);


  const Submit= (values) =>{
    console.log("values: ", values)
    axios.post(`${baseurl}/api/v1/login`,
    {
        firstName: values.firstName,
        lastName:values.lastName,
    
    })

    .then(res=>{
      console.log(res.data);
      setToggleGetUser(!toggleGetUser)
    })
   
  }
 

  useEffect(() => {
    
    axios.get(`${baseurl}/api/v1/Login`)
      .then(res => {
        console.log(res.data);
        setUsers(res.data)
      });
      return () => {
        console.log("cleanup");
      };
    }, [toggleGetUser]);


  const formik = useFormik({
    validationSchema: SignupSchema,
    initialValues: {
      firstName:'',
      lastName:'',
     
    },
   

    onSubmit: Submit

  });

    return (


<div className="form">

<h2>What's on your mind</h2>

 <form onSubmit={formik.handleSubmit}>
 <Stack spacing={2}>
 <TextField
     fullWidth
     className="text"
     color="secondary"

     id="firstName"
     name=""
     label="name"
     value={formik.values.firstName}
     onChange={formik.handleChange}
     error={formik.touched.firstName && Boolean(formik.errors.firstName)}
     helperText={formik.touched.firstName && formik.errors.firstName}
   />
 <TextField
     fullWidth
     className="text"
     color="secondary"
     id="lastName"
     name="lastName"
     label="Post"
     value={formik.values.lastName}
     onChange={formik.handleChange}
     error={formik.touched.lastName && Boolean(formik.errors.lastName)}
     helperText={formik.touched.lastName && formik.errors.lastName}
   />
  
   <Button color="secondary" variant="contained" fullWidth type="submit">
     Submit
   </Button>
   </Stack>
 </form>
 {/* {users?} */}

 {users.map(eachUser => {
        return <>
          <h1>{eachUser.name}</h1>
          <h3>{eachUser.email}</h3>
          <h3>{eachUser.address}</h3>
        </>
      })}


 </div>

      


        );
      }
      export default Posts;
     