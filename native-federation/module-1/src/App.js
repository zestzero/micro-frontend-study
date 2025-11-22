import React, { useState } from 'react';

// Simulating design-system components (in real scenario, these would be imported)
const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseStyles = {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  };

  const variantStyles = {
    primary: { backgroundColor: '#007bff', color: 'white' },
    secondary: { backgroundColor: '#6c757d', color: 'white' },
    success: { backgroundColor: '#28a745', color: 'white' }
  };

  return (
    <button style={{ ...baseStyles, ...variantStyles[variant] }} onClick={onClick}>
      {children}
    </button>
  );
};

const Card = ({ title, children, footer }) => {
  const cardStyles = {
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px 0',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const titleStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333'
  };

  return (
    <div style={cardStyles}>
      {title && <div style={titleStyles}>{title}</div>}
      <div>{children}</div>
      {footer && <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #dee2e6' }}>{footer}</div>}
    </div>
  );
};

const Container = ({ children }) => {
  return <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>{children}</div>;
};

const Header = ({ title, subtitle }) => {
  return (
    <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', marginBottom: '20px' }}>
      <h1 style={{ fontSize: '28px', margin: '0 0 10px 0' }}>{title}</h1>
      {subtitle && <p style={{ fontSize: '16px', color: '#61dafb', margin: 0 }}>{subtitle}</p>}
    </header>
  );
};

const products = [
  { id: 1, name: 'Laptop', price: 999, description: 'High-performance laptop' },
  { id: 2, name: 'Smartphone', price: 699, description: 'Latest smartphone model' },
  { id: 3, name: 'Headphones', price: 199, description: 'Noise-canceling headphones' },
  { id: 4, name: 'Tablet', price: 499, description: 'Portable tablet device' },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div>
      <Header 
        title="Product Catalog" 
        subtitle="Module 1 - Browse our amazing products"
      />
      <Container>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          {products.map(product => (
            <Card 
              key={product.id}
              title={product.name}
              footer={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                    ${product.price}
                  </span>
                  <Button onClick={() => addToCart(product)} variant="success">
                    Add to Cart
                  </Button>
                </div>
              }
            >
              <p>{product.description}</p>
            </Card>
          ))}
        </div>
        {cart.length > 0 && (
          <Card title="Cart Summary">
            <p>Items in cart: {cart.length}</p>
            <p>Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</p>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default App;
