import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
export const userLogin = createAsyncThunk('login/userLogin', async (data) => {
    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }
    try {
        const userData = await fetch('http://localhost:2929/login',options);
        return userData.json();
    } catch (error) {
        return error
    }
});

export const getUser = createAsyncThunk('getUser/getUser', async (data) =>{
    try {
        const options = {
            method : 'GET',
            headers : {
                'Content-Type':'application/json',
                'Authorization' : data
            }
        }    
        const response = await fetch('http://localhost:2929/',options);
        return response.json();   
    } catch (error) {
        return error
    }
})

export const addWeather = createAsyncThunk('weather/addWeather', async (data) => {
    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : data.token
        },
        body : JSON.stringify({cityName : data.cityName})
    }
    try {
        const response = await fetch('http://localhost:2929/addWeather',options);
        return response.json();
    } catch (error) {
        return error
    }
});

export const removeWeather = createAsyncThunk('deleteWeater/removeWeather', 
    async (data) => {
        const options = {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : data.token 
            }
        }
        try {
            const response = await fetch(`http://localhost:2929/deleteWeather/:${data.index}`, options);
            return response.json();
        } catch (error) {
            return error;
        }
        
    }
)

const user = createSlice({
    name :[
        'login',
        'getUser',
        'weather',
        'deleteWeather'
    ],
    initialState: {
        value : null,
        status : 'idle',
        error : null,
        message : null
    },
    reducers : {
        logout : (state, action) =>{
            state.value = null;
            state.status = 'idle';
            state.error = null;
            state.message = null;
        },
        //
        datatoStore: (state,action)=>{
            let stateData = {...state.value.user};
            let data = {user : stateData, weather : [action.payload.result]}
            // state.value = data
            console.log("state.payload",data)
        }
        //
    },
    extraReducers : (builder) => {
        builder
            .addCase(userLogin.pending, (state,action)=>{
                state.status = 'pending'
            })
            .addCase(userLogin.fulfilled, (state, action) =>{
                state.status = 'succeeded';
                // console.log(action.payload);
                if(action.payload.validationError){
                    alert(`${action.payload.validationError[0].msg}`);
                }else if(action.payload.error){
                    alert(`${action.payload.error}`)
                }else if(action.payload.token){
                    localStorage.setItem('token',action.payload.token);
                    state.value = action.payload.userData;
                    state.message = 'active';
                }
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })

            //get user data if have token 
            .addCase(getUser.pending, (state,action)=>{
                state.status = 'pending'
            })
            .addCase(getUser.fulfilled, (state, action) =>{
                state.status = 'succeeded';
                if(action.payload.errorToken){
                    localStorage.removeItem('token');
                    state.value = null;
                    state.message = null;
                }else{
                    state.value = action.payload.userData;
                    state.message = 'active';
                }
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })

            // add weather
            .addCase(addWeather.pending, (state,action)=>{
                state.status = 'pending'
            })
            .addCase(addWeather.fulfilled, (state, action) =>{
                state.status = 'succeeded';
                // console.log(action.payload);
                if(action.payload.result){
                    let stateData = {...state.value.user};
                    state.value = {user : stateData, weather : [action.payload.result]}
                    // console.log('stateData',stateData);
                }else if(action.payload.existingError){
                    alert(`${action.payload.existingError}`)
                }
                
            })
            .addCase(addWeather.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })

            /// remove weather 

            .addCase(removeWeather.pending, (state,action)=>{
                state.status = 'pending'
            })
            .addCase(removeWeather.fulfilled, (state, action) =>{
                state.status = 'succeeded';
                console.log(action.payload);
                if(action.payload.result){
                    let stateData = {...state.value.user};
                    state.value = {user : stateData, weather : [action.payload.result]}
                    console.log('stateData',stateData);
                }else if(action.payload.error){
                    state.error = action.payload.error;
                }
                
            })
            .addCase(removeWeather.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })
    }    
});
export const { logout ,datatoStore} = user.actions;
export default  user.reducer