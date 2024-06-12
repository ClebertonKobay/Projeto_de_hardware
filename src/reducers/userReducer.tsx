import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface userState {
    username: string | null;
}

const initialState: userState = {
    username: null,
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
            }
        },
        // createdUser:(state,action)=>{},
        deleteUser: (state,action:PayloadAction<userState>)=>{
            console.log(action.payload)
            return {
                username:null,
            }

        },
        // deletedUser: (state,action)=>{},
        updateUser: (state,action:PayloadAction<userState>)=>{
            console.log(action.payload)
            return {
                ...state,
                username:action.payload.username,
            }
        },
        // updatedUser: (state,action)=>{},
        fetchUser: (state,action:PayloadAction<userState>)=>{
            console.log(action.payload)
            return {
                ...state,
                username:action.payload.username,
            }
        },
        // fetchedUser: (state,action)=>{},
        login:(state,action:PayloadAction<userState>)=>{
            console.log(action.payload)
            return {
                ...state,
                username:action.payload.username,
            }
        }
    }
})

// export const {createUser,deleteUser,fetchUser,updateUser, createdUser,deletedUser,fetchedUser,login,updatedUser} = userSlice.actions 
export const {createUser,deleteUser,fetchUser,updateUser,login} = userSlice.actions 

export default userSlice.reducer