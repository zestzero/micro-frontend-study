import { useState } from 'react'
import './App.css'
import Button from './components/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>🔹 Remote Application</h1>
        <p>This is a standalone remote micro-frontend that exposes a Button component.</p>
      </div>
      <div className="card">
        <h2>Testing the Button Component</h2>
        <Button
          label={`Clicks: ${count}`}
          onClick={() => setCount((c) => c + 1)}
        />
        <p style={{ marginTop: '1rem', fontSize: '14px', color: '#888' }}>
          This button is exposed and can be consumed by the host application.
        </p>
      </div>
    </>
  )
}

export default App
