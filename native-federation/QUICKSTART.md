# Quick Start Guide

This guide will help you get the Native Federation PoC up and running in minutes.

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Navigate to the remote project
cd native-federation/remote
npm install

# Navigate to the host project
cd ../host
npm install
```

### 2. Build the Applications

```bash
# Build the remote application
cd native-federation/remote
npm run build:fed

# Build the host application
cd ../host
npm run build:fed
```

### 3. Run the Applications

**Terminal 1 - Start the Remote:**
```bash
cd native-federation/remote
npm run serve
```

This will start the remote application on http://localhost:5001

**Terminal 2 - Start the Host:**
```bash
cd native-federation/host
npm run serve
```

This will start the host application on http://localhost:5000

### 4. View the Result

Open your browser and navigate to:
- **Host Application**: http://localhost:5000
- **Remote Application** (standalone): http://localhost:5001

## What You'll See

### Host Application (http://localhost:5000)

The host application displays:
- **Local Button** - A button from the host application itself
- **Remote Button** - A button dynamically loaded from the remote micro-frontend at runtime
- Information about the Native Federation setup

The remote button is loaded dynamically and works exactly like a local component!

### Remote Application (http://localhost:5001)

The remote application runs standalone and:
- Exposes the Button component for consumption by other applications
- Can be tested independently
- Can be deployed and updated without affecting the host

## Available NPM Scripts

### Remote Application

- `npm run dev` - Start Vite development server
- `npm run build:fed` - Build with Native Federation
- `npm run serve` - Serve the built application (port 5001)
- `npm run lint` - Run ESLint

### Host Application

- `npm run dev` - Start Vite development server
- `npm run build:fed` - Build with Native Federation  
- `npm run serve` - Serve the built application (port 5000)
- `npm run lint` - Run ESLint

## Understanding the Federation

### How the Remote Exposes Components

In `remote/federation.config.cjs`:
```javascript
exposes: {
  './Button': './src/components/Button.tsx',
}
```

This makes the Button component available at the `./Button` path.

### How the Host Consumes Components

1. **Initialize Federation** (in `main.tsx`):
```typescript
await initFederation({
  remote: 'http://localhost:5001/remoteEntry.json',
});
```

2. **Load Remote Module** (in `App.tsx`):
```typescript
const RemoteButton = lazy(() =>
  loadRemoteModule('remote', './Button')
);
```

3. **Use Component**:
```tsx
<Suspense fallback={<div>Loading...</div>}>
  <RemoteButton label="Click me" onClick={handler} />
</Suspense>
```

## Troubleshooting

### Port Already in Use

If ports 5000 or 5001 are already in use, you can change them:

**For Remote** (in `package.json`):
```json
"serve": "npx serve dist -p 5002 --cors"
```

**For Host** (in `package.json`):
```json
"serve": "npx serve dist -p 5003 --cors"
```

Remember to update the remote URL in `host/federation.config.cjs` if you change the remote port.

### Build Errors

If you encounter build errors:

1. Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Make sure you're using Node.js 18 or higher:
```bash
node --version
```

### Import Map Errors

If you see "Failed to resolve module specifier" errors:
- Make sure you've run `npm run build:fed` (not just `npm run build`)
- Check that the import map is properly injected in `dist/index.html`
- Verify the remote is running before starting the host

## Next Steps

- Explore the code in `remote/src/components/Button.tsx`
- Modify the Button component and rebuild to see changes
- Try exposing additional components from the remote
- Experiment with different shared dependency configurations
- Check out the full [README.md](README.md) for advanced topics

## Production Deployment

For production deployment, consider:
- Hosting the remote on a CDN
- Using absolute URLs for remote entry points
- Implementing version management
- Adding proper error boundaries
- Setting up monitoring and logging

Happy micro-frontend building! 🚀
