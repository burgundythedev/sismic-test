import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersState } from "../models/index";  // Correct import

const initialState: UsersState = {
    searchQuery: '',
    showActiveOnly: false,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        toggleShowActiveOnly(state) {
            state.showActiveOnly = !state.showActiveOnly;
        },
    },
});

export const { setSearchQuery, toggleShowActiveOnly } = usersSlice.actions;

export default usersSlice.reducer;  
