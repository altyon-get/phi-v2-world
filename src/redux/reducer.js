import { createReducer } from "@reduxjs/toolkit";


export const userInfo = createReducer({
    loggedIn:false,
    isAdmin:false
}, {
    setAdmin: (state, action) => {
        const item = action.payload;
        state.isAdmin=item;
    },
    setLoggedIn:(state,action)=>{
        const item=action.payload;
        state.loggedIn=item;
    },
});