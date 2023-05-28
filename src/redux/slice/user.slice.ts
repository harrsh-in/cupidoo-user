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

        updateProfileSetupStep: (state, action) => {
            if (state.details && state.details.details) {
                state.details.details.profileSetupStep = action.payload;
            }
        },
    },
});

export const { resetUserDetails, setUserDetails, updateProfileSetupStep } =
    userSlice.actions;

export default userSlice.reducer;
