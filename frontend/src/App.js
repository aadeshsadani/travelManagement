// import { Cards } from '@mui/material';
import './App.css';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Cards from './components/Cards';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { useEffect, useState } from 'react';
import { getUser, datatoStore } from './state/reducers/userReducer';
import io from "socket.io-client";
import { useDispatch } from 'react-redux';
const serverUrl = "http://localhost:2929";
const socket = io.connect(serverUrl);




function App() {
  const [passData, setPassData] = useState(null)
  const dispatch = useDispatch();
  //
  // useEffect(()=>{
  //   socket.on("weatherData",data=>{
  //     console.log(data)
  //     // setPassData(data)
  //     // dispatch(datatoStore(data))
  //   })
  // },[]);
  //
  useEffect(()=> {
    if(localStorage.getItem('token')){
      dispatch(getUser(localStorage.getItem('token')))
      socket.on("weatherData",data=>{
        console.log('app js',data)
        // setPassData(data)
        dispatch(datatoStore(data))
      })
    }
  },[])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Cards data={passData} />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/signup' element={<SignUp />}/>
        </Routes> 
      </BrowserRouter>
    </>
  );
}

export default App;
