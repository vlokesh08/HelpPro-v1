// chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  receiverId: null,
  userId : null,
  roomId : null,
  lastMessage: null,
  extraData: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatData: (state, action) => {
        // console.log(action.payload);
      state.receiverId = action.payload.receiverId;
      state.userId = action.payload.userId;
      state.roomId = action.payload.roomId;
      state.lastMessage = action.payload.lastMessage;
      state.extraData = action.payload.extraData;
    },
    resetChatData: (state) => {
      state.receiverId = null;
      state.userId = null;
      state.roomId = null;
      state.lastMessage = null;
      state.extraData = null;
    },
  },
});

export const { setChatData, resetChatData } = chatSlice.actions;
export const Uid = (state : any) => state.user.receiverId;
export default chatSlice.reducer;