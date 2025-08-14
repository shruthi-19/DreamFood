import './App.css';
import Home from './screens/Home';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS for functionality
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'; // Import Bootstrap Icons
import CartProvider from './components/ContextReducer.js';
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/orders" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
