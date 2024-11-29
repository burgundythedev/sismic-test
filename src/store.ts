import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from "./services/usersApi"

const store = configureStore({
    reducer: {
    
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware), 
});

export default store;
