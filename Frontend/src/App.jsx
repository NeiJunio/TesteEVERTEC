
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/header/header';
import Home from './Pages/Home';
import RegisterPage from './Pages/RegisterPage';
import DetailsModal from './components/DetailsModal/detailsModal';

function App() {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="details/:id" element={<DetailsModal />} />
          </Route>
          
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/edit/:id" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;