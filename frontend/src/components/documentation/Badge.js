import React from 'react';

export const Badge = ({ children }) => (
  <span style={{
    display: 'inline-flex',
    borderRadius: '4px',
    backgroundColor: '#ebf8ff',
    padding: '0 8px 2px 8px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#1e40af',
    border: '1px solid rgba(30, 64, 175, 0.1)',
    alignItems: 'center',
  }}>
    {children}
  </span>
);
