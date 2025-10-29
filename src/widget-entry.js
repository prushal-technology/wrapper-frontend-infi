import React from 'react';
import ReactDOM from 'react-dom';
import WidgetWrapper from './WidgetWrapper';

// Expose global render function as `infiWidget`
window.infiWidget = (containerId) => {
  const el = document.getElementById(containerId);
  if (!el) return console.error('Container not found:', containerId);

  ReactDOM.render(<WidgetWrapper />, el);
};

// Optional: unmount the widget
window.infiWidgetUnmount = (containerId) => {
  const el = document.getElementById(containerId);
  if (!el) return console.error('Container not found:', containerId);

  ReactDOM.unmountComponentAtNode(el);
};
