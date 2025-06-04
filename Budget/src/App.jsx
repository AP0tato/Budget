import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './pages/Styles/App.css';
import Navigator from './Navigator.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Budget from './pages/Budget.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Navigator />} >
            <Route index element={<Dashboard />} />
            <Route path="budget" element={<Budget />} />
          </Route>
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
