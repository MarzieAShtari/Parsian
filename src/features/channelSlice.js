import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeChannel : null
}

export const channelSlice = createSlice ({
    name: 'channel',
    initialState,
    reducers: {
        setActiveChannel: (state,action) => {
            state.activeChannel = action.payload
        }
    }
})


export const {setActiveChannel} = channelSlice.actions;
export default channelSlice.reducer;