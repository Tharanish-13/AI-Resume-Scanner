import React from 'react';

export const Link = ({ href, children, className = '' }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
      }}
      className={className}
    >
      {children}
    </a>
  );
};
