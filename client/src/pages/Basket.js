import React, { useContext } from 'react';
import { Context } from '../index';
import './Basket.css'

const Basket = () => {
  const { device } = useContext(Context);
  const { basket, removeFromBasket } = device;

  // Calculate the total price of all items in the basket
  const totalPrice = basket.reduce((acc, device) => acc + device.price, 0);

  return (
    <div className="basket">
      <h1>Basket</h1>
      {basket.map((device) => (
        <div key={device.id} className="basket-item">
          <p>
            {device.name} - ₪{device.price}
          </p>
          <button onClick={() => removeFromBasket(device.id)}>Delete</button>
        </div>
      ))}
      <div className="basket-total">
        <p>Total price: ₪{totalPrice}</p>
        <button onClick={() => alert('Payment successful!')}>Pay</button>
      </div>
    </div>
  );
};

export default Basket;

