import React from 'react';
import ReactDOM from 'react-dom';
import Toast from '../components/ToastMsg/ToastMsg';

export const showToast = (message) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  ReactDOM.render(<Toast message={message} />, container);

  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  }, 3000);
}