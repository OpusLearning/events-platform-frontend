// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CalendarSuccess from './pages/CalendarSuccess';
import NotFound from './pages/NotFound';
import UserStatus from './components/UserStatus'; // Import the UserStatus component

function App() {
  return (
    <div>
      <header className="bg-primary text-white p-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h1>Events Platform</h1>
          {/* Display the current login status */}
          {/* < UserStatus /> */}
        </div>
      </header>

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/calendar-success" element={<CalendarSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-light text-center py-3">
        <p>&copy; 2025 James Wallace | Northcoders | Purple Pixel</p>
      </footer>
    </div>
  );
}

export default App;
