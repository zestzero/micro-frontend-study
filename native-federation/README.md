# Native Federation Micro-Frontend Application

This project demonstrates a micro-frontend architecture using **Module Federation** (Native Federation) with React. It showcases best practices for building scalable, independently deployable frontend applications.

## 📐 Architecture Overview

### What is Micro-Frontend?

Micro-frontend architecture is an approach to frontend development where a single application is composed of multiple smaller, independent applications (micro-apps). Each micro-app can be:
- Developed independently by different teams
- Deployed independently
- Built with different technologies (though we use React throughout for simplicity)
- Owned by different teams with clear boundaries

### Module Federation

**Module Federation** is a Webpack 5 feature that enables JavaScript applications to dynamically load code from other applications at runtime. This eliminates the need for:
- Monolithic builds
- Publishing packages to npm
- Version management nightmares

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Shell Application                       │
│                    (Host - Port 3000)                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Navigation & Layout                                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Module 1   │  │   Module 2   │  │   Module 3   │     │
│  │   (Remote)   │  │   (Remote)   │  │   (Remote)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         ▲                 ▲                 ▲               │
│         │                 │                 │               │
└─────────┼─────────────────┼─────────────────┼───────────────┘
          │                 │                 │
    ┌─────┴─────┐     ┌─────┴─────┐     ┌─────┴─────┐
    │ Module 1  │     │ Module 2  │     │ Module 3  │
    │ Server    │     │ Server    │     │ Server    │
    │ Port 3001 │     │ Port 3002 │     │ Port 3003 │
    └───────────┘     └───────────┘     └───────────┘
          │                 │                 │
          └─────────────────┴─────────────────┘
                          │
                  ┌───────┴────────┐
                  │ Design System  │
                  │ (Shared Lib)   │
                  └────────────────┘
```

## 🏗️ Project Structure

```
native-federation/
├── package.json                 # Root workspace configuration
├── README.md                    # This file
│
├── design-system/              # Shared UI component library
│   ├── src/
│   │   ├── components.js       # Reusable components (Button, Card, etc.)
│   │   └── index.js            # Main export
│   ├── package.json
│   └── rollup.config.js        # Build configuration
│
├── shell/                      # Host application (Port 3000)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js              # Main app with routing
│   │   └── index.js            # Entry point
│   ├── package.json
│   └── webpack.config.js       # Module Federation config
│
├── module-1/                   # Product Catalog (Port 3001)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js              # Product catalog component
│   │   └── index.js
│   ├── package.json
│   └── webpack.config.js       # Exposes './App'
│
├── module-2/                   # Shopping Cart (Port 3002)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js              # Shopping cart component
│   │   └── index.js
│   ├── package.json
│   └── webpack.config.js       # Exposes './App'
│
└── module-3/                   # User Profile (Port 3003)
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js              # User profile component
    │   └── index.js
    ├── package.json
    └── webpack.config.js       # Exposes './App'
```

## 🔑 Key Concepts

### 1. **Host Application (Shell)**
- The shell acts as the container/orchestrator
- Manages routing between different modules
- Loads remote modules dynamically
- Provides common navigation and layout

### 2. **Remote Applications (Modules)**
- Each module is a standalone React application
- Can be developed and deployed independently
- Exposes components via Module Federation
- Can run standalone or be consumed by the shell

### 3. **Design System**
- Shared component library
- Ensures UI consistency across all modules
- Contains reusable components: Button, Card, Header, Container
- Each module imports and uses these components

### 4. **Module Federation Configuration**

**Shell (Host) Configuration:**
```javascript
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    module1: 'module1@http://localhost:3001/remoteEntry.js',
    module2: 'module2@http://localhost:3002/remoteEntry.js',
    module3: 'module3@http://localhost:3003/remoteEntry.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
})
```

**Remote Module Configuration:**
```javascript
new ModuleFederationPlugin({
  name: 'module1',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
})
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd micro-frontend-study/native-federation
   ```

2. **Install dependencies for all projects**
   ```bash
   npm install
   ```

3. **Install dependencies for each module individually**
   ```bash
   cd design-system && npm install && cd ..
   cd shell && npm install && cd ..
   cd module-1 && npm install && cd ..
   cd module-2 && npm install && cd ..
   cd module-3 && npm install && cd ..
   ```

### Running the Application

You need to start all applications simultaneously in separate terminals:

**Terminal 1 - Module 1 (Product Catalog):**
```bash
cd module-1
npm start
# Runs on http://localhost:3001
```

**Terminal 2 - Module 2 (Shopping Cart):**
```bash
cd module-2
npm start
# Runs on http://localhost:3002
```

**Terminal 3 - Module 3 (User Profile):**
```bash
cd module-3
npm start
# Runs on http://localhost:3003
```

**Terminal 4 - Shell Application:**
```bash
cd shell
npm start
# Runs on http://localhost:3000
```

**Access the application at: http://localhost:3000**

### Building for Production

Build all modules:
```bash
npm run build:all
```

Or build individually:
```bash
npm run build:design-system
npm run build:module-1
npm run build:module-2
npm run build:module-3
npm run build:shell
```

## 📦 Module Descriptions

### Design System
A shared component library providing:
- **Button**: Reusable button with variants (primary, secondary, success)
- **Card**: Container component with title and footer
- **Header**: Page header component
- **Container**: Layout container with max-width

### Module 1: Product Catalog
- Displays a grid of products
- Add to cart functionality
- Shows cart summary
- Uses design system components

### Module 2: Shopping Cart
- Displays cart items
- Quantity management (increase/decrease)
- Remove items
- Apply discount
- Calculate totals

### Module 3: User Profile
- Display user information
- Edit profile functionality
- Account statistics
- Save/cancel changes

## 🎯 Best Practices Demonstrated

1. **Independent Deployment**: Each module can be deployed separately
2. **Shared Dependencies**: React and ReactDOM are shared as singletons
3. **Design System**: Common UI components ensure consistency
4. **Lazy Loading**: Remote modules are loaded on-demand
5. **Error Boundaries**: Graceful handling of module loading failures
6. **Clear Boundaries**: Each module has a specific responsibility
7. **Routing**: React Router manages navigation in the shell
8. **Development Mode**: All modules can run independently for development

## 🔄 Communication Between Modules

While this example focuses on independent modules, in production you might need:
- **State Management**: Redux, Zustand, or Context API
- **Event Bus**: Custom events for cross-module communication
- **Shared Services**: API clients, authentication services
- **Props**: Pass data through Module Federation exports

## 🛠️ Technology Stack

- **React 18**: UI library
- **Webpack 5**: Module bundler with Module Federation
- **@module-federation/enhanced**: Enhanced Module Federation plugin
- **React Router**: Client-side routing
- **Rollup**: Design system bundler

## 📝 Notes

- All modules use the same React version to ensure singleton sharing works correctly
- Each module can be accessed standalone at its respective port
- The design system components are duplicated in each module for simplicity (in production, you'd import from the shared package)
- CORS is not an issue because all apps run on localhost

## 🚦 Deployment Considerations

For production deployment:
1. Deploy each module to separate domains/subdomains
2. Update remote URLs in the shell's webpack config
3. Configure CORS appropriately
4. Implement proper error boundaries and fallbacks
5. Use a CDN for static assets
6. Implement monitoring and logging
7. Version your remotes carefully

## 📚 Further Reading

- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [Micro-Frontend Architecture](https://martinfowler.com/articles/micro-frontends.html)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning and development.
