import React from 'react';

export const Table = ({
  table,
  title,
  className = '',
  trClassNames = [],
  tdClassNames = [],
}) => {
  const tableHeader = table[0];
  const tableBody = table.slice(1);
  return (
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid #e5e7eb',
      fontSize: '14px',
      color: '#111827',
    }} className={className}>
      <thead>
        {title && (
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <th
              colSpan={tableHeader.length}
              style={{
                padding: '10px',
                fontWeight: 'bold',
                border: '1px solid #e5e7eb',
                textAlign: 'left',
              }}
            >
              {title}
            </th>
          </tr>
        )}
        <tr style={{ backgroundColor: '#f9fafb' }}>
          {tableHeader.map((item, idx) => (
            <th
              key={idx}
              style={{
                padding: '10px',
                fontWeight: '600',
                border: '1px solid #e5e7eb',
                textAlign: 'left',
              }}
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableBody.map((row, rowIdx) => (
          <tr key={rowIdx} className={trClassNames[rowIdx]}>
            {row.map((item, colIdx) => (
              <td
                key={colIdx}
                className={tdClassNames[colIdx]}
                style={{
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'left',
                }}
              >
                {item}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
