import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:JSON.parse(localStorage.getItem("userData")),
    userRole:localStorage.getItem("userRole")
}



const authSlice =createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setRole:(state,action)=>{
            state.userRole=action.payload
        },
        setUserPhoto:(state,action)=>{
            state.user.ogrenciFotograf=action.payload
        },
        logout:(state)=>{
            state.user=null
            localStorage.clear()
        },
    
    }
})

export const {setUser,setUserPhoto,logout,setRole} =authSlice.actions
export default authSlice.reducer