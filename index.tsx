import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
export default function App() {
  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-2xl font-bold">Ứng dụng đã chạy</h1>
    </div>
  );
}
