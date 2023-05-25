import { createSlice } from '@reduxjs/toolkit';
import { UserResponseType } from '../../types/user';

export interface UserState {
    details: UserResponseType | undefined;
}

const initialState: UserState = {
    details: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.details = action.payload;
        },

        resetUserDetails: (state) => {
            state.details = undefined;
        },
    },
});

export const { resetUserDetails, setUserDetails } = userSlice.actions;

export default userSlice.reducer;
