import { createSlice } from "@reduxjs/toolkit";

export interface keyboardState {
    type:string
}


const keyboardSlice = createSlice({
    name:'keyboard',
    initialState:{
        keyType:'Simples'
    },
    reducers:{
        changeKeyboard:(state,action)=>{
            console.log("action.payload",action.payload)
            return { keyType:action.payload}}
    }
})

export const {changeKeyboard} = keyboardSlice.actions 

export default keyboardSlice.reducer