import React from 'react';
import '../styles/components.css';

export function Button({ text, type = 'button', ...rest }) {
  return (
    <button type={type} className="global-btn" {...rest}>
      {text}
    </button>
  );
}