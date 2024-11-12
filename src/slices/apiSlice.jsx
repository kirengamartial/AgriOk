import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://agriok-api.onrender.com/api',
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userInfo?.access_token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["User", "Cart", "Product", "Order", "Insights", "Farmlands"],
    endpoints: (builder) => ({}),
})