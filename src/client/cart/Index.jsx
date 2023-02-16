import React, { useEffect, useState } from 'react';
// import { getCart, removeFromCart } from './request.api';
import { getCart,removeFromCart } from 'api/request.api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch the current contents of the cart from the backend
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setCartItems(response.data.items);

      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();

  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await removeFromCart(itemId);
      setCartItems(response.data.items);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ?
        <p>Your cart is empty</p> :
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item._id}>
                <td>{item.book.title}</td>
                <td>{item.quantity}</td>
                <td>{item.book.price}</td>
                <td><button onClick={() => handleRemoveItem(item._id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default Cart;
