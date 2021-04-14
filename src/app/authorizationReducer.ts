import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from '../config/axios';

interface ILogin {
    login: string,
    password: string
}

export const submitLogin = createAsyncThunk(
    'authorization/submitLogin',
    async (data: ILogin) => {
        const login = axios.post(`/authorization/login?login=${data.login}&password=${data.password}`)
        .then( response => response.data)
        .then( data => { return data })
        .catch( err => console.error(err) )
        return login
    }
);

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: {
        token: ""
    },
    reducers: { },
    extraReducers: builder => {
        builder.addCase(submitLogin.fulfilled, (state, action: PayloadAction<string>) => {
            state.token = action.payload
        });
    }
})

export default authorizationSlice.reducer 