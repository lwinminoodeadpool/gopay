import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import EVChargingScreen from './pages/EVChargingScreen';
import Explore from './pages/Explore';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import DigitalReceipt from './pages/DigitalReceipt';
<<<<<<< HEAD
=======
import ParkingPage from './pages/ParkingPage';
>>>>>>> aa70e17 (feat: Implement EV charging payment flow with dedicated checkout, payment success, and digital receipt pages.)

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charging/:id" element={<EVChargingScreen />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/receipt" element={<DigitalReceipt />} />
<<<<<<< HEAD
=======
          <Route path="/parking" element={<ParkingPage />} />
>>>>>>> aa70e17 (feat: Implement EV charging payment flow with dedicated checkout, payment success, and digital receipt pages.)
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
