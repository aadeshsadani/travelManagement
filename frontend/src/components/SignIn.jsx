import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import '@fontsource/roboto/400.css';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../state/reducers/userReducer'
import { useEffect } from 'react';
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


export default function SignIn() {
    const getDataFromStor = useSelector((data) => data.userReducer);
    const token = localStorage.getItem('token') || null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInput, setUserInput] = useState({
        email : '',
        password : ''
    })
    const handleChange = (e) => {
        e.preventDefault();
        setUserInput({...userInput,[e.target.name]: e.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(userLogin(userInput));
        setUserInput({
            email : '',
            password : ''
        });

    };
    useEffect(() => {
        if(getDataFromStor.message === 'active' && token !== null){
            navigate('/dashboard');
        }
    },[getDataFromStor])
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={userInput.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={userInput.password}
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                        >   
                            <LockOpenIcon sx={{  mr: 2 }} />
                            Sign In
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >   
                            <GoogleIcon sx={{  mr: 2 }} />
                            Sign In With Google
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link variant="body2" to="/" style={styles.link}>
                                    Back to home
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link variant="body2" to="/signup" style={styles.link}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    );
}