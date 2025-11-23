# Native Federation Proof of Concept

This is a complete Proof of Concept (PoC) demonstrating a Micro-frontend architecture using React and the `@softarc/native-federation` library with esbuild.

## 📁 Project Structure

```
native-federation/
├── host/          # The consumer/shell application
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── bootstrap.tsx
│   ├── federation.config.cjs
│   ├── build.js
│   └── package.json
│
└── remote/        # The micro-frontend providing components
    ├── src/
    │   ├── components/
    │   │   └── Button.tsx    # Exposed component
    │   ├── App.tsx
    │   └── main.tsx
    ├── federation.config.cjs
    ├── build.js
    └── package.json
```

## 🛠 Technology Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: esbuild (via `@softarc/native-federation-esbuild`)
- **Federation Library**: `@softarc/native-federation` v3.3.6
- **Module Loading**: Import Maps (browser-native)
- **Shared Dependencies**: React & ReactDOM with singleton strategy

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies for both projects:**

```bash
# Install remote dependencies
cd native-federation/remote
npm install

# Install host dependencies  
cd ../host
npm install
```

### Dependencies Added

Both projects require these packages:

```bash
npm install @softarc/native-federation @softarc/native-federation-esbuild esbuild
```

## 📦 Federation Configuration

### Remote Configuration (`remote/federation.config.cjs`)

The remote exposes a Button component:

```javascript
const { withNativeFederation, shareAll } = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'remote',
  filename: 'remoteEntry.json',
  exposes: {
    './Button': './src/components/Button.tsx',
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
  skip: [],
});
```

### Host Configuration (`host/federation.config.cjs`)

The host consumes remote modules:

```javascript
const { withNativeFederation, shareAll } = require('@softarc/native-federation/build');

module.exports = withNativeFederation({
  name: 'host',
  remotes: {
    remote: 'http://localhost:5001/remoteEntry.json',
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
  skip: [],
});
```

## 🔨 Build Process

Both projects use a custom `build.js` script that:

1. Initializes the Native Federation builder with esbuild adapter
2. Builds the main application using esbuild
3. Generates federation artifacts (shared modules, import maps, remoteEntry.json)
4. Injects the import map into index.html

### Build Commands

```bash
# Build remote
cd native-federation/remote
npm run build:fed

# Build host
cd native-federation/host
npm run build:fed
```

The build script generates:
- `remoteEntry.json` - Federation metadata
- `importmap.json` - Module import mappings
- Shared dependency bundles (React, ReactDOM, etc.)
- Application bundles

## ▶️ Running the Applications

### Start the Remote Application

```bash
cd native-federation/remote
npm run build:fed  # Build first
npm run serve      # Serves on http://localhost:5001
```

### Start the Host Application

```bash
cd native-federation/host
npm run build:fed  # Build first
npm run serve      # Serves on http://localhost:5000
```

**Important**: The remote must be running before starting the host, as the host loads modules from the remote at runtime.

## 💡 How It Works

### 1. Remote Module Federation

The remote application exposes the Button component in its `federation.config.cjs`:

```javascript
exposes: {
  './Button': './src/components/Button.tsx',
}
```

### 2. Host Initialization

The host application initializes federation in `main.tsx` before bootstrapping:

```typescript
import { initFederation } from '@softarc/native-federation';

(async () => {
  // Initialize federation with remote mapping
  await initFederation({
    remote: 'http://localhost:5001/remoteEntry.json',
  });

  // Import and bootstrap the app after federation is ready
  const { default: bootstrap } = await import('./bootstrap');
  bootstrap();
})();
```

### 3. Loading Remote Modules

The host loads remote components dynamically using `loadRemoteModule`:

```typescript
import { loadRemoteModule } from '@softarc/native-federation';

const RemoteButton = lazy(() =>
  loadRemoteModule('remote', './Button').then((module) => ({
    default: module.default,
  }))
);

// Use with React Suspense
<Suspense fallback={<div>Loading remote button...</div>}>
  <RemoteButton label="Click me" onClick={handleClick} />
</Suspense>
```

## 📋 Package.json Scripts

### Remote Scripts
- `build:fed` - Build with Native Federation
- `serve` - Serve the dist folder on port 5001
- `dev` - Vite development server (for local development)

### Host Scripts  
- `build:fed` - Build with Native Federation
- `serve` - Serve the dist folder on port 5000
- `dev` - Vite development server (for local development)

## 🔍 Key Features Demonstrated

1. **Runtime Module Loading** - Components are loaded from the remote at runtime
2. **Shared Dependencies** - React and ReactDOM are shared as singletons to avoid duplication
3. **Independent Deployment** - Remote and host can be built and deployed independently
4. **Type Safety** - Full TypeScript support across federated modules
5. **Import Maps** - Uses browser-native import maps for module resolution

## 🎯 What Gets Generated

After building, each application creates:

```
dist/
├── index.html              # Entry HTML with injected import map
├── main.js                 # Application bundle
├── remoteEntry.json        # Federation metadata
├── importmap.json          # Import map for dependencies
├── Button-[hash].js        # Exposed components (remote only)
└── react-[hash].js         # Shared dependencies
    react-dom-[hash].js
    ...
```

## 🧪 Testing the PoC

1. Build and start the remote: `cd remote && npm run build:fed && npm run serve`
2. Build and start the host: `cd host && npm run build:fed && npm run serve`
3. Open http://localhost:5000 in your browser
4. You should see:
   - A local button from the host application
   - A remote button loaded dynamically from the remote application
   - Both buttons are functional and maintain their own state

## 📝 Notes

- **React Version**: Using React 18.x (Native Federation has better compatibility with React 18 than React 19)
- **Build Tool**: esbuild is used instead of Webpack for faster builds
- **Import Maps**: Modern browsers support import maps natively; polyfills may be needed for older browsers
- **CORS**: The serve command includes `--cors` flag to allow cross-origin requests

## 🔗 Useful Resources

- [Native Federation Documentation](https://www.npmjs.com/package/@softarc/native-federation)
- [Module Federation Concepts](https://www.angulararchitects.io/en/blog/)
- [Import Maps Specification](https://github.com/WICG/import-maps)

## 🎓 Learning Points

This PoC demonstrates:
- Setting up Native Federation with React and esbuild
- Configuring module sharing and exposing components
- Runtime loading of remote modules
- Build process integration with custom scripts
- Import map generation and injection
- Independent deployment capabilities

## ⚠️ Production Considerations

For production use, consider:
- Adding proper error boundaries
- Implementing loading states
- Adding version management for remotes
- Setting up proper CDN hosting
- Implementing fallback strategies
- Adding monitoring and logging
- Using import map polyfills for browser compatibility
