import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SIMPLES } from "../constants/keyboard_types";

export interface userState {
    username: string | null;
    keyboardType: string;
}

const initialState: userState = {
    username: null,
    keyboardType: ''
};


const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        createUser:(state,action:PayloadAction<userState>)=>{
            console.log(action.payload)
            return {
                ...state,
                username:action.payload.username,
                keyboardType:action.payload.keyboardType
            }
        },
        // createdUser:(state,action)=>{},
        deleteUser: (state,action:PayloadAction<userState>)=>{
            console.log(action.payload)
            return {
                username:null,
                keyboardType:SIMPLES
            }

        },
        // deletedUser: (state,action)=>{},
        updateUser: (state,action:PayloadAction<userState>)=>{
            console.log(action.payload)
            return {
                ...state,
                username:action.payload.username,
                keyboardType:action.payload.keyboardType
            }
        },
        // updatedUser: (state,action)=>{},
        fetchUser: (state,action:PayloadAction<userState>)=>{
            console.log(action.payload)
            return {
                ...state,
                username:action.payload.username,
                keyboardType:action.payload.keyboardType
            }
        },
        // fetchedUser: (state,action)=>{},
        login:(state,action:PayloadAction<userState>)=>{
            console.log(action.payload)
            return {
                ...state,
                username:action.payload.username,
                keyboardType:action.payload.keyboardType
            }
        }
    }
})

// export const {createUser,deleteUser,fetchUser,updateUser, createdUser,deletedUser,fetchedUser,login,updatedUser} = userSlice.actions 
export const {createUser,deleteUser,fetchUser,updateUser,login} = userSlice.actions 

export default userSlice.reducer