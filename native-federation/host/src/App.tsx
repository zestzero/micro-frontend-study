import { useState, lazy, Suspense } from 'react';
import { loadRemoteModule } from '@softarc/native-federation';
import './App.css';

// Dynamically load the remote Button component
const RemoteButton = lazy(() =>
  loadRemoteModule('remote', './Button').then((module) => ({
    default: module.default,
  }))
);

function App() {
  const [count, setCount] = useState(0);
  const [remoteClickCount, setRemoteClickCount] = useState(0);

  return (
    <>
      <div>
        <h1>🏠 Host Application</h1>
        <p>This is the host/shell application consuming remote micro-frontend components</p>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>Local Button (Host)</h2>
        <button onClick={() => setCount((count) => count + 1)}>
          Local count is {count}
        </button>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>Remote Button (From Remote MFE)</h2>
        <Suspense fallback={<div>Loading remote button...</div>}>
          <RemoteButton
            label={`Remote clicks: ${remoteClickCount}`}
            onClick={() => setRemoteClickCount((c) => c + 1)}
          />
        </Suspense>
        <p style={{ marginTop: '1rem', fontSize: '14px', color: '#888' }}>
          ✨ This button is loaded from the remote micro-frontend at runtime!
        </p>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📚 Native Federation PoC</h3>
        <ul style={{ textAlign: 'left', fontSize: '14px' }}>
          <li>Framework: React 18 + TypeScript</li>
          <li>Bundler: esbuild via @softarc/native-federation</li>
          <li>Remote module loaded dynamically at runtime</li>
          <li>Shared dependencies: React & ReactDOM (singleton)</li>
        </ul>
      </div>
    </>
  );
}

export default App;
