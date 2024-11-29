import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import UserData from '../models';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://6749ba9c8680202966325fec.mockapi.io/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserData[], { limit?: number; page?: number }>({
      query: ({ limit = 20, page = 1 }) => `testsismicusers/users?limit=${limit}&page=${page}`, 
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
