import React from 'react';
import './ConfirmModal.css';

export default function ConfirmModal({ open, title, message, onCancel, onConfirm, confirmText = 'Delete', showCancel = true }) {
  if (!open) return null;
  return (
    <div className="confirm-modal-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        <h3 className={confirmText === 'Delete' ? 'confirm-title-error' : 'confirm-title-success'}>{title}</h3>
        <p>{message}</p>
        <div className="confirm-modal-actions">
          {showCancel && <button className="confirm-cancel-btn" onClick={onCancel}>Cancel</button>}
          <button className={confirmText === 'Delete' ? 'confirm-delete-btn' : 'confirm-success-btn'} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
} 