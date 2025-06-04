import { Outlet, Link } from 'react-router-dom';
import './pages/styles/Navigator.css';

const Navigator = () => {
  return (
    <div className="navigator">
      <nav>
        <ul className="links">
          <li><Link to="/">Dashboard</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navigator;