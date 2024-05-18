import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:localStorage.getItem("userData"),
    userRole:localStorage.getItem("userRole")
}



const authSlice =createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
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

export const {setUser,setUserPhoto,logout,setUserRole} =authSlice.actions
export default authSlice.reducer