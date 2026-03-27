import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import EVFilterScreen from './pages/EVFilterScreen';
import EVStationList from './pages/EVStationList';
import EVStationDetails from './pages/EVStationDetails';
import Explore from './pages/Explore';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import DigitalReceipt from './pages/DigitalReceipt';
import ParkingPage from './pages/ParkingPage';
import Profile from './pages/Profile';
import TermsAndConditions from './pages/TermsAndConditions';
import FAQ from './pages/FAQ';
import ActivityPage from './pages/ActivityPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charge" element={<EVFilterScreen />} />
          <Route path="/station-list" element={<EVStationList />} />
          <Route path="/station-details/:id" element={<EVStationDetails />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/receipt" element={<DigitalReceipt />} />
          <Route path="/parking" element={<ParkingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/activity" element={<ActivityPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
