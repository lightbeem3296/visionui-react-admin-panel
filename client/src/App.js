import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { MainRoutes } from './pages/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          className: 'text-sm',
          style: {
            backgroundColor: '#444',
            color: '#fff',
            boxShadow: '0.4em -0.4em 1.6em #00000090',
          },
        }}
      />
      <Routes>
        <Route path='*' element={<MainRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
