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
                url: `/products/create`,
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
        createCart: builder.mutation({
            query: (data) => ({
                url: `/cart/add`,
                method: 'POST',
                body: data
            })
        }),
        getCart: builder.query({
            query: () => ({
                url: `/cart`,
                method: 'GET'
            })
        }),
        updateCart: builder.mutation({
            query: (data) => ({
                url: `/cart/${data.id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteFromCart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE'
            })
        }),
        clearCart: builder.mutation({
            query: () => ({
                url: `/cart`,
                method: 'DELETE'
            })
        }),
        getOrder: builder.query({
            query: () => ({
                url: `/order/history`,
                method: 'GET'
            })
        }),
        placeOrder: builder.mutation({
            query: () => ({
                url: `/order/place`,
                method: 'POST',
            })
        }),
        getSingleOrder: builder.query({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'GET',
            })
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            })
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: `/orders`,
                method: 'GET',
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
    useGetProductQuery,
    useCreateCartMutation,
    useGetCartQuery,
    useUpdateCartMutation,
    useDeleteFromCartMutation,
    useClearCartMutation,
    useGetOrderQuery,
    usePlaceOrderMutation,
    useGetSingleOrderQuery,
    useDeleteOrderMutation,
    useGetAllOrdersQuery
} = userApiSlice