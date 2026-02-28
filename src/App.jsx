import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import EVChargingScreen from './pages/EVChargingScreen';


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charging/:id" element={<EVChargingScreen />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
