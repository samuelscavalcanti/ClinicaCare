import React from 'react';
import '../styles/components.css';

export function Input({ label, id, type = 'text', placeholder, ...rest }) {
  return (
    <div className="input-group">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="input-field"
        {...rest}
      />
    </div>
  );
}