import {createApi,} from '@reduxjs/toolkit/query/react'
import {fetchBaseQuery} from "@reduxjs/toolkit/query";

//import {baseQueryWithReauth} from "@/app/api/baseQueryWithReauth.ts";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: () => ({}),


})