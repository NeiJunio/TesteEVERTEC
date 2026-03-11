import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import DetailsModal from './components/DetailsModal/detailsModal';
import RegisterModal from './components/RegisterModal/registerModal';

function App() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      {/* 1. CAMADA DE FUNDO */}
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        
        {/* Quando não há background (acesso direto pela URL) */}
        {!background && (
          <Route path="/details/:id" element={<DetailsModal />} />
        )}
        {!background && (
          <Route path="/register" element={<RegisterModal />} />
        )}
        {!background && (
          <Route path="/edit/:id" element={<RegisterModal />} />
        )}
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* 2. CAMADA DO MODAL (Renderiza sobre a Home) */}
      {background && (
        <Routes>
          <Route path="/details/:id" element={<DetailsModal />} />
{/* <Route path="/register" element={<div style={{position: 'fixed', top: 0, zIndex: 9999, background: 'red', color: 'white', padding: '50px'}}>ROTA DE REGISTRO ATIVA</div>} /> */}
          <Route path="/register" element={<RegisterModal />} />
          <Route path="/edit/:id" element={<RegisterModal />} />
        </Routes>
      )}
    </>
  );
}

export default App;