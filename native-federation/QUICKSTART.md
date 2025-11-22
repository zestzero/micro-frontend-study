# Quick Start Guide

This guide will help you get the native-federation micro-frontend application up and running in minutes.

## Prerequisites

- Node.js v16 or higher
- npm or yarn
- A modern web browser

## Setup Steps

### 1. Install Dependencies

Navigate to the `native-federation` directory and install dependencies for all modules:

```bash
cd native-federation

# Install design-system dependencies
cd design-system && npm install && cd ..

# Install shell dependencies
cd shell && npm install && cd ..

# Install module-1 dependencies
cd module-1 && npm install && cd ..

# Install module-2 dependencies
cd module-2 && npm install && cd ..

# Install module-3 dependencies
cd module-3 && npm install && cd ..
```

### 2. Build the Design System (Optional)

The design system is a shared component library. You can build it if you want to test it:

```bash
cd design-system
npm run build
cd ..
```

### 3. Start All Applications

You'll need **4 terminal windows** to run all applications simultaneously:

#### Terminal 1: Start Module 1 (Product Catalog)
```bash
cd module-1
npm start
```
→ Runs on **http://localhost:3001**

#### Terminal 2: Start Module 2 (Shopping Cart)
```bash
cd module-2
npm start
```
→ Runs on **http://localhost:3002**

#### Terminal 3: Start Module 3 (User Profile)
```bash
cd module-3
npm start
```
→ Runs on **http://localhost:3003**

#### Terminal 4: Start Shell Application
```bash
cd shell
npm start
```
→ Runs on **http://localhost:3000**

### 4. Access the Application

Open your browser and navigate to:
- **Main Application**: http://localhost:3000

You can also access each module independently:
- **Product Catalog**: http://localhost:3001
- **Shopping Cart**: http://localhost:3002
- **User Profile**: http://localhost:3003

## What You Should See

### Shell Application (http://localhost:3000)
- A navigation bar with links to all modules
- A home page explaining the architecture
- Ability to navigate between different modules

### Module 1 - Product Catalog (http://localhost:3001)
- A grid of products with prices
- "Add to Cart" buttons
- Cart summary at the bottom

### Module 2 - Shopping Cart (http://localhost:3002)
- List of items in the cart
- Quantity controls (+/-)
- Remove item functionality
- Discount application
- Order summary with totals

### Module 3 - User Profile (http://localhost:3003)
- User information display
- Edit profile functionality
- Account statistics (orders, total spent, wishlist)

## Testing the Micro-Frontend Architecture

1. **Start all 4 applications** as described above
2. **Navigate to the shell** at http://localhost:3000
3. **Click on the navigation links** to see different modules load dynamically
4. **Notice** that each module is loaded from its respective server:
   - Module 1 from localhost:3001
   - Module 2 from localhost:3002
   - Module 3 from localhost:3003

## How Module Federation Works

When you navigate in the shell application:
1. The shell loads the remote module's JavaScript from the remote server
2. The module is rendered in the shell's routing context
3. React and React DOM are shared as singletons between shell and modules
4. Each module uses the same design system components for consistency

## Troubleshooting

### Port Already in Use
If you get an error that a port is already in use:
```bash
# Kill the process using the port (example for port 3000)
lsof -ti:3000 | xargs kill -9
```

### Module Not Loading
1. Make sure **all 4 applications are running**
2. Check the browser console for errors
3. Verify that the remote URLs in `shell/webpack.config.js` are correct
4. Clear browser cache and reload

### Build Errors
If you encounter build errors:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

- **Hot Module Replacement (HMR)** is enabled - changes are reflected automatically
- Each module can be developed **independently** without running the others
- The **shell must run last** since it depends on the remote modules
- Use the browser's **Network tab** to see module federation in action

## Production Build

To build all modules for production:

```bash
# From the native-federation directory
cd design-system && npm run build && cd ..
cd module-1 && npm run build && cd ..
cd module-2 && npm run build && cd ..
cd module-3 && npm run build && cd ..
cd shell && npm run build && cd ..
```

Build outputs will be in each module's `dist/` directory.

## Next Steps

1. **Explore the code** in each module
2. **Modify components** to understand the architecture
3. **Add new features** to practice micro-frontend development
4. **Read the main README.md** for detailed architecture explanation

## Need Help?

- Check the main **README.md** for architecture details
- Review the **webpack.config.js** files to understand Module Federation setup
- Inspect the **design-system** to see how shared components work
- Look at the **shell/src/App.js** to understand routing and module loading

Happy coding! 🚀
