import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import '@fontsource/roboto/400.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userRegister } from '../state/reducers/userReducer'
const theme = createTheme({
    palette: {
        primary: {
            main: "#026ca0"
        },
        secondary: {
            main: '#026ca0',
        },
    },
});

const styles = {
    
    link : {
      textDecoration : "none",
      color: "black"
    }
  };


export default function SignUp() {
   const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        fName : '',
        lName : '',
        email : '',
        password : ''
    });
    const getDataHandle = (e) => {
        e.preventDefault();
        setUserInput({...userInput,[e.target.name] : e.target.value})
    }
    async function userRegister(data){
        const insertUserData = {
            name : `${data.fName} ${data.lName}`,
            email : `${data.email}`,
            password : `${data.password}`
        }
        const passData = {
            method : 'POST',
            headers :{
                'Content-Type':'application/json'
            },
            data : JSON.stringify(insertUserData)
        }
        try {
            let response = await axios('http://localhost:2929/add',passData)
            let response2 = await response.data
            return response2
        } catch (error) {
            // console.log(error);
            if(error.response.data.validationError){
                return alert(`${error.response.data.validationError[0].msg}`)
            }else{
                return alert(`${error.response.data.error}`);
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await userRegister(userInput).then((response) => {
            if(response.message){
                alert(response.message);
                setUserInput({
                    fName : '',
                    lName : '',
                    email : '',
                    password : ''
                });
                navigate('/signin');

            }
        }).catch((e)=>{
            console.log(e);
        })
    };

    return (
        <ThemeProvider theme={theme}>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ width: 60, height: 60, m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="fName"
                                    required
                                    fullWidth
                                    id="fName"
                                    label="First Name"
                                    autoFocus
                                    onChange={getDataHandle}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="lName"
                                    id="lName"
                                    label="Last Name"
                                    autoComplete="family-name"
                                    onChange={getDataHandle}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={getDataHandle}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={getDataHandle}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link variant="body2" to="/signin" style={styles.link}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider>
    );
}