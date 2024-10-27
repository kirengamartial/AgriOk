import { apiSlice } from "../apiSlice";
const BASE_URL = "/users"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/register`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useRegisterMutation
} = userApiSlice