import { createSlice } from '@reduxjs/toolkit';
import { UserResponseType } from '../../types/user';

export interface UserState {
    details: UserResponseType | {};
}

const initialState: UserState = {
    details: {},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDetails: (state, action) => {
            state.details = action.payload;
        },

        resetDetails: (state) => {
            state.details = {};
        },
    },
});

export const { resetDetails, setDetails } = userSlice.actions;

export default userSlice.reducer;
