import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import UserData from '../models';


// Décision Technique pour mes requetes API:
//Réduction du code : Moins de code à écrire grâce à l’automatisation des requêtes et mutations.
//Gestion des états : RTK Query gère automatiquement les états de chargement, succès et échec.
//Cache automatique : Réduit les requêtes réseau répétées et améliore les performances.
//Optimisation : Mise à jour optimiste des données pour une expérience utilisateur plus fluide.

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
