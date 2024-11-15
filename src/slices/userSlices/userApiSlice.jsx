import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // User/Auth endpoints
        register: builder.mutation({
            query: (data) => ({
                url: `/register`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `/login`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        logout: builder.mutation({
            query: () => ({
                url: `/logout`,
                method: 'POST'
            }),
            invalidatesTags: ['User']
        }),
        getProfile: builder.query({
            query: () => ({
                url: `/profile`,
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `/profile/update`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: `/profile/change-password`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        // Product endpoints
        createProduct: builder.mutation({
            query: (data) => ({
                url: `/products/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        getProducts: builder.query({
            query: () => ({
                url: `/products`,
                method: 'GET'
            }),
            providesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/products/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        getProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'GET'
            }),
            providesTags: ['Product']
        }),

        // Cart endpoints
        createCart: builder.mutation({
            query: (data) => ({
                url: `/cart/add`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Cart'],
            async onQueryStarted({ product_id, quantity }, { dispatch, queryFulfilled, getState }) {
                // Get the current product details if available in cache
                const productDetails = await dispatch(
                    userApiSlice.endpoints.getProduct.select(product_id)(getState())
                )?.data;
        
                if (!productDetails) return; // If product details not in cache, skip optimistic update
        
                // Optimistically update the cart cache
                const patchResult = dispatch(
                    userApiSlice.util.updateQueryData('getCart', undefined, (draft) => {
                        const currentCart = draft ? draft : { 0: { items: [] } };
                        const newItem = {
                            id: Date.now(), // temporary ID
                            quantity: quantity,
                            product: productDetails
                        };
        
                        if (!currentCart[0]) {
                            currentCart[0] = { items: [] };
                        }
                        
                        currentCart[0].items.push(newItem);
                        return currentCart;
                    })
                );
        
                try {
                    await queryFulfilled;
                } catch {
                    // If the mutation fails, undo the optimistic update
                    patchResult.undo();
                }
            }
        }),
        
        getCart: builder.query({
            query: () => ({
                url: `/cart`,
                method: 'GET'
            }),
            providesTags: ['Cart']
        }),
        updateCart: builder.mutation({
            query: (data) => ({
                url: `/cart/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Cart']
        }),
        deleteFromCart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart']
        }),
        clearCart: builder.mutation({
            query: () => ({
                url: `/cart`,
                method: 'DELETE'
            }),
            // Ensure we're invalidating ALL cart-related queries
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
            // Add an async onQueryStarted to handle the cache update
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Reset the getCart query data in the cache
                    dispatch(
                        userApiSlice.util.updateQueryData('getCart', undefined, () => ({
                            0: { items: [] }
                        }))
                    );
                } catch {}
            }
        }),

        // Order endpoints
        getOrder: builder.query({
            query: () => ({
                url: `/order/history`,
                method: 'GET'
            }),
            providesTags: ['Order']
        }),
        placeOrder: builder.mutation({
            query: () => ({
                url: `/order/place`,
                method: 'POST',
            }),
            invalidatesTags: ['Order', 'Cart'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Reset the getCart query data in the cache
                    dispatch(
                        userApiSlice.util.updateQueryData('getCart', undefined, () => ({
                            0: { items: [] }
                        }))
                    );
                } catch {}
            }
        }),
        getSingleOrder: builder.query({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'GET',
            }),
            providesTags: ['Order']
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order']
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: `/orders`,
                method: 'GET',
            }),
            providesTags: ['Order']
        }),
        getInsights: builder.query({
            query: () => ({
                url: `/insights`,
                method: 'GET',
            }),
            providesTags: ['Insights']
        }),
        getFarmlands: builder.query({
            query: () => ({
                url: `/farmlands`,
                method: 'GET',
            }),
            providesTags: ['Farmlands']
        }),
        getSingleFarmlands: builder.query({
            query: (id) => ({
                url: `/farmlands/${id}`,
                method: 'GET',
            }),
            providesTags: ['Farmlands']
        }),
        createFarmlands: builder.mutation({
            query: (data) => ({
                url: `/farmlands`,
                method: 'POST',
                body: data
            }),
            providesTags: ['Farmlands']
        }),
        editFarmlands: builder.mutation({
            query: (data) => ({
                url: `/farmlands/${data.id}`,
                method: 'PUT',
                body: data
            }),
            providesTags: ['Farmlands']
        }),
        deleteFarmlands: builder.mutation({
            query: (id) => ({
                url: `/farmlands/${id}`,
                method: 'DELETE'
            }),
            providesTags: ['Farmlands']
        }),
        CreateTrending: builder.mutation({
            query: (data) => ({
                url: `/posts`,
                method: 'POST',
                body: data
            }),
            providesTags: ['Trending']
        }),
        EditTrending: builder.mutation({
            query: (data) => ({
                url: `/posts/${data.id}`,
                method: 'PUT',
                body: data
            }),
            providesTags: ['Trending']
        }),
        getTrending: builder.query({
            query: () => ({
                url: `/posts`,
                method: 'GET'
            }),
            providesTags: ['Trending']
        }),
        getSingleTrending: builder.query({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'GET'
            }),
            providesTags: ['Trending']
        }),
        deleteTrending: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            }),
            providesTags: ['Trending']
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
    useGetAllOrdersQuery,
    useGetInsightsQuery,
    useGetFarmlandsQuery,
    useCreateFarmlandsMutation,
    useEditFarmlandsMutation,
    useDeleteFarmlandsMutation,
    useGetSingleFarmlandsQuery,
    useCreateTrendingMutation,
    useEditTrendingMutation,
    useGetTrendingQuery,
    useGetSingleTrendingQuery,
    useDeleteTrendingMutation
} = userApiSlice