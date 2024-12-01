import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import UserData from '../models';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://6749ba9c8680202966325fec.mockapi.io/' }), 
  endpoints: (builder) => ({
    getUsers: builder.query<UserData[], void>({
      query: () => `users`, 
    }),
    
    createUser: builder.mutation<UserData, Partial<UserData>>({
      query: (newUser) => ({
        url: `users`, 
        method: 'POST',
        body: newUser,
      }),
    }),

    deleteUser: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation
} = usersApi;
