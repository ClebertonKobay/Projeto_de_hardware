import { createSlice } from "@reduxjs/toolkit";

export interface userState {
    username: string,
    password:string
}


const userSlice = createSlice({
    name:'user',
    initialState:{
        username:'',
        password:''
    },
    reducers:{
        createUser:(state,action)=>{},
        deleteUser: (state,action)=>{},
        updateUser: (state,action)=>{},
        fetchUser: (state,action)=>{},
        login:(state,action)=>{}
    }
})

export const {createUser,deleteUser,fetchUser,updateUser} = userSlice.actions 

export default userSlice.reducer