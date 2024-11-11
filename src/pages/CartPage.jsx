import React, { useEffect, useState } from 'react';
import HeroSection from '../components/ShopHeroSection';
import EmptyCart from '../components/EmptyCart';
import { useNavigate } from 'react-router-dom';
import { 
  useGetCartQuery, 
  useUpdateCartMutation, 
  useDeleteFromCartMutation, 
  useClearCartMutation,
  usePlaceOrderMutation
} from '../slices/userSlices/userApiSlice';
import Spinner from '../components/Loader';
import { Trash2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CartPage = () => {
  const navigate = useNavigate()
  const [localCart, setLocalCart] = useState(null);
  const [isCheckout, setIsCheckout] =useState(false)
  
  const { data: cart, isLoading, refetch } = useGetCartQuery();

  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteFromCartMutation();
  const [clearCart, { isLoading: isClearing }] = useClearCartMutation();
  const [placeOrder, {isLoading: isPlacingOrder}] = usePlaceOrderMutation()

  const {userInfo} = useSelector(state => state.auth)

  useEffect(() => {
    if (cart) {
      setLocalCart(cart);
    }
  }, [cart]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await updateCart({ id: itemId, quantity: newQuantity }).unwrap();
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
      await deleteItem(itemId).unwrap();
      setLocalCart(prevCart => ({
        ...prevCart,
        0: {
          ...prevCart[0],
          items: prevCart[0].items.filter(item => item.id !== itemId)
        }
      }));
      await refetch();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
      setLocalCart(cart);
    }
  };

  const handleClearCart = async () => {
    try {
        await clearCart().unwrap();
        setLocalCart({ 0: { items: [] } });
        toast.success('Cart cleared successfully');
    } catch (error) {
        toast.error('Failed to clear cart');
    }
};

  const calculateSubtotal = (items) => items?.reduce((total, item) => total + (item.product.price * item.quantity), 0) || 0;

  const handleCheckout = async() => {
    setIsCheckout(true)
  try {
    const token = userInfo.access_token
    const res = await fetch('https://agriok-api.onrender.com/api/order/place',{
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()  
    setLocalCart({ 0: { items: [] } });
    await refetch();
    toast.success('Placed Order successfully');
    navigate(`/checkout/${data.order_id}`)
  } catch (error) {
    console.log(error)
    toast.error('Failed to Place Order');
      setLocalCart(cart);
      await refetch();
  }finally {
    setIsCheckout(false)
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

  if (!displayCart?.[0]?.items?.length) return <EmptyCart/>
    
  
  const subtotal = calculateSubtotal(displayCart[0]?.items);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection/>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm relative"> 

          {(isUpdating || isDeleting || isClearing || isPlacingOrder) && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
              <Spinner />
            </div>
          )}
          
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
                    <td className="px-6 py-4">Rwf {Number(item.product.price).toFixed(0)}</td>
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
                      Rwf {(item.product.price * item.quantity).toFixed(0)}
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
                <span className="font-medium">Rwf {subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-medium">Total</span>
                <span className="font-medium text-lg">Rwf {subtotal.toFixed(0)}</span>
              </div>
                
                <button onClick={handleCheckout} className="w-full bg-yellow-400 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
                  {isCheckout ? 'checkout...': 'Proceed to Checkout'} 
                </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;