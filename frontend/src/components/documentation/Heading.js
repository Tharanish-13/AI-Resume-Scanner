import React from 'react';

const HEADING_STYLES = {
  1: { fontSize: '24px', fontWeight: 'bold' },
  2: { fontSize: '20px', fontWeight: 'bold' },
  3: { fontSize: '18px', fontWeight: '600' },
};

export const Heading = ({ level = 1, children, className = '' }) => {
  const Tag = `h${level}`;
  return (
    <Tag style={{
      marginTop: '2em',
      color: '#1f2937',
      ...HEADING_STYLES[level],
    }} className={className}>
      {children}
    </Tag>
  );
};
