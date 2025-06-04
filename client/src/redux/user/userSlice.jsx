import {createSlice} from "@reduxjs/toolkit"

const initialState={
    currentUser:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload
        },
       
        signOut:(state)=>
        {
            state.currentUser=null
        }
    }
})


export const {signInSuccess,updateUserSuccess,deleteUserSuccess,signOut}=userSlice.actions
export default userSlice.reducer