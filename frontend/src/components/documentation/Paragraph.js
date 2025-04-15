import React from 'react';

export const Paragraph = ({
  smallMarginTop = false,
  children,
  className = '',
}) => {
  return (
    <p
      style={{
        marginTop: smallMarginTop ? '0.8em' : '1.5em',
        fontSize: '18px',
        color: '#4b5563',
      }}
      className={className}
    >
      {children}
    </p>
  );
};
