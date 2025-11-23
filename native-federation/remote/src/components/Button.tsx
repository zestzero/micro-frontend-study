import React from 'react';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label = 'Click Me', onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#0056b3';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#007bff';
      }}
    >
      {label}
    </button>
  );
};

export default Button;
