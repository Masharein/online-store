import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';

export const Context = createContext(null);

const deviceStore = new DeviceStore();

deviceStore.addToBasket = (device) => {
  deviceStore.basket.push(device);
};

deviceStore.removeFromBasket = (deviceId) => {
  deviceStore.basket = deviceStore.basket.filter((device) => device.id !== deviceId);
};

ReactDOM.render(
  <Context.Provider value={{ user: new UserStore(), device: deviceStore }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
