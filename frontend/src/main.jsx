import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import AuthProvider from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
