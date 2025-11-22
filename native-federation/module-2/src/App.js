import React, { useState } from 'react';

// NOTE: For simplicity, design-system components are duplicated here.
// In production, these would be imported from the design-system package:
// import { Button, Card, Container, Header } from 'design-system';
// or shared via Module Federation. This duplication is intentional for this demo
// to avoid additional build complexity and keep each module self-contained.
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

const initialCart = [
  { id: 1, name: 'Laptop', price: 999, quantity: 1 },
  { id: 2, name: 'Smartphone', price: 699, quantity: 2 },
  { id: 3, name: 'Headphones', price: 199, quantity: 1 },
];

function App() {
  const [cartItems, setCartItems] = useState(initialCart);
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyDiscount = () => {
    setDiscount(10); // 10% discount
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  return (
    <div>
      <Header 
        title="Shopping Cart" 
        subtitle="Module 2 - Review and manage your cart"
      />
      <Container>
        {cartItems.length === 0 ? (
          <Card title="Empty Cart">
            <p>Your cart is empty. Start shopping to add items!</p>
          </Card>
        ) : (
          <>
            {cartItems.map(item => (
              <Card 
                key={item.id}
                footer={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <Button onClick={() => updateQuantity(item.id, -1)} variant="secondary">-</Button>
                      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Qty: {item.quantity}</span>
                      <Button onClick={() => updateQuantity(item.id, 1)} variant="secondary">+</Button>
                    </div>
                    <Button onClick={() => removeItem(item.id)} variant="secondary">Remove</Button>
                  </div>
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 10px 0' }}>{item.name}</h3>
                    <p style={{ margin: 0, color: '#666' }}>Price: ${item.price}</p>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                    ${item.price * item.quantity}
                  </div>
                </div>
              </Card>
            ))}
            
            <Card title="Order Summary">
              <div style={{ fontSize: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', color: '#28a745' }}>
                    <span>Discount ({discount}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', fontSize: '20px', fontWeight: 'bold', borderTop: '2px solid #333', paddingTop: '10px' }}>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                {discount === 0 && (
                  <Button onClick={applyDiscount} variant="success">Apply 10% Discount</Button>
                )}
                <Button onClick={() => alert('Checkout functionality coming soon!')} variant="primary">
                  Checkout
                </Button>
              </div>
            </Card>
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
