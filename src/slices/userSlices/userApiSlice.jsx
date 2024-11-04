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
        createProduct: builder.mutation({
            query: (data) => ({
                url: `/products`,
                method: 'POST',
                body: data
            })
        }),
        getProducts: builder.query({
            query: () => ({
                url: `/products`,
                method: 'GET'
            })
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE'
            })
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/products/${data.id}`,
                method: 'PUT',
                body: data
            })
        }),
        getProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'GET'
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
    useUpdatePasswordMutation,
    useCreateProductMutation,
    useGetProductsQuery,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetProductQuery
} = userApiSlice