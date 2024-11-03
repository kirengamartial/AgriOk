import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `/register`,
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `/login`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `/logout`,
                method: 'POST'
            })
        }),
        getProfile: builder.query({
            query: () => ({
                url: `/profile`,
                method: 'GET'
            })
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `/profile/update`,
                method: 'PUT',
                body: data
            })
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: `/profile/change-password`,
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdatePasswordMutation
} = userApiSlice