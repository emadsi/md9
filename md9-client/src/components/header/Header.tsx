// // /src/components/Header.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../Header.css';

// const Header: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <header className="header">
//       <h1>Welcome to MD9</h1>
//       <button onClick={() => navigate('/login')} className="admin-btn">Admin Zone</button>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/login');
  };
  const handleHomePage = () => {
    navigate('/')
  }

  return (
    <header className="header">
      {/* <button className='welcome-button' onClick={handleHomePage}>Welcome to MD9</button> */}
      <h1><a  href='/' onClick={handleHomePage}> Welcome to MD9</a></h1>
      <button className='admin-button' onClick={handleAdminLogin}>Admin Zone</button>
    </header>
  );
};

export default Header;
