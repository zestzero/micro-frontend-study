import React, { useState } from 'react';

// Simulating design-system components
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

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
    bio: 'Software developer passionate about micro-frontends and modern web technologies.'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    boxSizing: 'border-box'
  };

  return (
    <div>
      <Header 
        title="User Profile" 
        subtitle="Module 3 - Manage your account information"
      />
      <Container>
        <Card 
          title="Profile Information"
          footer={
            <div style={{ display: 'flex', gap: '10px' }}>
              {isEditing ? (
                <>
                  <Button onClick={handleSave} variant="success">Save Changes</Button>
                  <Button onClick={handleCancel} variant="secondary">Cancel</Button>
                </>
              ) : (
                <Button onClick={handleEdit} variant="primary">Edit Profile</Button>
              )}
            </div>
          }
        >
          <div style={{ display: 'grid', gap: '15px' }}>
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Name:</label>
              {isEditing ? (
                <input 
                  style={inputStyle}
                  value={editedProfile.name} 
                  onChange={(e) => handleChange('name', e.target.value)} 
                />
              ) : (
                <p style={{ margin: 0 }}>{profile.name}</p>
              )}
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Email:</label>
              {isEditing ? (
                <input 
                  style={inputStyle}
                  type="email"
                  value={editedProfile.email} 
                  onChange={(e) => handleChange('email', e.target.value)} 
                />
              ) : (
                <p style={{ margin: 0 }}>{profile.email}</p>
              )}
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Phone:</label>
              {isEditing ? (
                <input 
                  style={inputStyle}
                  value={editedProfile.phone} 
                  onChange={(e) => handleChange('phone', e.target.value)} 
                />
              ) : (
                <p style={{ margin: 0 }}>{profile.phone}</p>
              )}
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Address:</label>
              {isEditing ? (
                <input 
                  style={inputStyle}
                  value={editedProfile.address} 
                  onChange={(e) => handleChange('address', e.target.value)} 
                />
              ) : (
                <p style={{ margin: 0 }}>{profile.address}</p>
              )}
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Bio:</label>
              {isEditing ? (
                <textarea 
                  style={{ ...inputStyle, minHeight: '80px' }}
                  value={editedProfile.bio} 
                  onChange={(e) => handleChange('bio', e.target.value)} 
                />
              ) : (
                <p style={{ margin: 0 }}>{profile.bio}</p>
              )}
            </div>
          </div>
        </Card>

        <Card title="Account Statistics">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>42</div>
              <div style={{ color: '#666' }}>Orders</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>$2,847</div>
              <div style={{ color: '#666' }}>Total Spent</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#6c757d' }}>5</div>
              <div style={{ color: '#666' }}>Wishlist Items</div>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default App;
