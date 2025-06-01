import { Outlet, Link } from 'react-router-dom';
import './pages/styles/Navigator.css';

const Navigator = () => {
  return (
    <>
      <nav>
        <ul className="links">
          <li><Link to="/">Dashboard</Link></li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigator;