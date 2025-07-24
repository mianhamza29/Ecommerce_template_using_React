import React from 'react';
import './Alert.css';

export default function Alert({ type = 'info', message, onClose }) {
  if (!message) return null;
  return (
    <div className={`custom-alert custom-alert-${type}`}>
      <span>{message}</span>
      {onClose && (
        <button className="custom-alert-close" onClick={onClose} aria-label="Close alert">&times;</button>
      )}
    </div>
  );
} 