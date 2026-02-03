import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';  // تأكد من الاستيراد

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>    {/* هنا فقط */}
      <App />
    </BrowserRouter>
  </StrictMode>
);