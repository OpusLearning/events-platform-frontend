// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CalendarSuccess from './pages/CalendarSuccess';
import MyEvents from './pages/MyEvents';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <header style={{ backgroundColor: "#020333", color: "white" }} className="p-3">
      <a href="https://eventsplatform.online" style={{ textDecoration: 'none', color: 'inherit' }}>
  <div className="container d-flex align-items-center">
    <h1 className="mb-0" style={{ fontSize: '1.75rem' }}>
      <span style={{ fontWeight: 'bold' }}>eventsplatform</span>
      <span style={{ fontWeight: '300' }}>.online</span>
    </h1>
  </div>
</a>
      </header>
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/calendar-success" element={<CalendarSuccess />} />
          <Route path="/my-events" element={<MyEvents />} />
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
