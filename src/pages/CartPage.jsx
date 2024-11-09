import React, { useEffect, useState } from 'react';
import BackgroundImage from '../../public/Background.png';
import { Link, useNavigate } from 'react-router-dom';
import { 
  useGetCartQuery, 
  useUpdateCartMutation, 
  useDeleteFromCartMutation, 
  useClearCartMutation,
  usePlaceOrderMutation
} from '../slices/userSlices/userApiSlice';
import Spinner from '../components/Loader';
import { Trash2, RefreshCw, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const CartPage = () => {
  const navigate = useNavigate()
  const [localCart, setLocalCart] = useState(null);
  
  const { data: cart, isLoading, refetch } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 1000,
  });

  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteFromCartMutation();
  const [clearCart, { isLoading: isClearing }] = useClearCartMutation();
  const [placeOrder, {isLoading: isPlacingOrder}] = usePlaceOrderMutation()


  useEffect(() => {
    if (cart) {
      setLocalCart(cart);
    }
  }, [cart]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await updateCart({ id: itemId, quantity: newQuantity }).unwrap();
      // Update local cart immediately
      setLocalCart(prevCart => ({
        ...prevCart,
        0: {
          ...prevCart[0],
          items: prevCart[0].items.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        }
      }));
      await refetch();
      toast.success('Cart updated successfully');
    } catch (error) {
      toast.error('Failed to update cart');
      // Revert local cart on error
      setLocalCart(cart);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      // Update local cart immediately
      setLocalCart(prevCart => ({
        ...prevCart,
        0: {
          ...prevCart[0],
          items: prevCart[0].items.filter(item => item.id !== itemId)
        }
      }));
      await deleteItem(itemId).unwrap();
      await refetch();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
      setLocalCart(cart);
    }
  };

  const handleClearCart = async () => {
    try {
  
      setLocalCart({ 0: { items: [] } });
      await clearCart().unwrap();
      await refetch();
      toast.success('Cart cleared successfully');
    } catch (error) {
      toast.error('Failed to clear cart');
      setLocalCart(cart);
      await refetch();
    }
  };

  const calculateSubtotal = (items) => {
    return items?.reduce((total, item) => total + (item.product.price * item.quantity), 0) || 0;
  };

  const handleCheckout = async() => {
  try {
    setLocalCart({ 0: { items: [] } });
    await placeOrder().unwrap
    await refetch();
    toast.success('Placed Order successfully');
    navigate('/orders')    
  } catch (error) {
    toast.error('Failed to Place Order');
      setLocalCart(cart);
      await refetch();
  }
  }
  const displayCart = localCart || cart;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!displayCart?.[0]?.items?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <ShoppingCart className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-medium text-gray-600">Your cart is empty</h2>
        <Link to="/shop" className="bg-yellow-400 text-white px-6 py-2 rounded hover:bg-yellow-500 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = calculateSubtotal(displayCart[0]?.items);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-48 bg-gray-900 mb-8">
        <div className="absolute inset-0">
          <img 
            src={BackgroundImage}
            alt="Hero background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm relative">
          {/* Loading Overlay */}
          {(isUpdating || isDeleting || isClearing || isPlacingOrder) && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
              <Spinner />
            </div>
          )}
          
          {/* Cart Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left">Product</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Quantity</th>
                  <th className="px-6 py-4 text-left">Subtotal</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayCart[0]?.items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.photo}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">{item.product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">${Number(item.product.price).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Actions */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center">
              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-600 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
              <button
                onClick={() => refetch()}
                className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Cart
              </button>
            </div>
          </div>
        </div>

        {/* Cart Totals */}
        <div className="mt-8 lg:w-1/3 ml-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Cart Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-medium">Total</span>
                <span className="font-medium text-lg">${subtotal.toFixed(2)}</span>
              </div>
                
                <button onClick={handleCheckout} className="w-full bg-yellow-400 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
                  Proceed to Checkout
                </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;